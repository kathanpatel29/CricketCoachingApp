import User from '../models/User.js';
import { hashPassword } from '../utils/crypto.js';
import { generateToken } from '../utils/generateToken.js';

const handleError = (res, status, message) => res.status(status).json({ message });

// Register function
export const register = async (req, res) => {
  try {
    const { name, email, password, role, expertise } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const { salt, hashedPassword } = hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword, // store hashed password
      salt, // store the salt
      role,
      expertise: role === 'coach' ? expertise : undefined,
    });

    await user.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        expertise: user.expertise,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;
    if (adminKey) return handleAdminLogin(email, password, adminKey, res);
    return handleUserLogin(email, password, res);
  } catch (error) {
    console.error('Login error:', error);
    handleError(res, 500, 'Login failed');
  }
};

// Admin login function
export const adminLogin = async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;
    const { email: adminEmail, password: adminPassword, accessKey } = getAdminCredentials();
    if (email === adminEmail && password === adminPassword && adminKey === accessKey) {
      return res.json({
        message: 'Admin login successful',
        user: { id: 'admin', role: 'admin', email: adminEmail },
        token: generateToken('admin', 'admin'),
      });
    }
    return handleError(res, 401, 'Invalid admin credentials');
  } catch (error) {
    console.error('Admin login error:', error);
    handleError(res, 500, 'Admin login failed');
  }
};

// Get current user info
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return handleError(res, 404, 'User not found');
    res.json(user);
  } catch (error) {
    handleError(res, 500, 'Error fetching user');
  }
};

// User login handling
const handleUserLogin = async (email, password, res) => {
  const user = await User.findOne({ email });
  if (!user || !verifyPassword(password, user.salt, user.password)) {
    return handleError(res, 401, 'Invalid credentials');
  }

  res.json({
    message: 'Login successful',
    user: { id: user._id, name: user.name, email: user.email, role: user.role, expertise: user.expertise },
    token: generateToken(user._id, user.role),
  });
};

// Admin login handling
const handleAdminLogin = (email, password, adminKey, res) => {
  const { email: adminEmail, password: adminPassword, accessKey } = getAdminCredentials();
  if (email === adminEmail && password === adminPassword && adminKey === accessKey) {
    return res.json({
      message: 'Admin login successful',
      user: { id: 'admin', role: 'admin', email: adminEmail },
      token: generateToken('admin', 'admin'),
    });
  }
  return handleError(res, 401, 'Invalid admin credentials');
};
