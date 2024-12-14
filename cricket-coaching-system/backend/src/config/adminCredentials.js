export const getAdminCredentials = () => ({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  accessKey: process.env.ADMIN_ACCESS_KEY
});