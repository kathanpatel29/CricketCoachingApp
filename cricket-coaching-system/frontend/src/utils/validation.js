export const validateEmail = (email) => {
  const normalizedEmail = email.toLowerCase();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(normalizedEmail)) {
    return 'Please Enter a valid email address.';
  }
  return null;
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateBooking = (date, time) => {
  const selectedDateTime = new Date(`${date}T${time}`);
  return selectedDateTime > new Date();
};