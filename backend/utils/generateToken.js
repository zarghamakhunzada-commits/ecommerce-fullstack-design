import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // 🔥 User ID ko token mein pack karke 30 days ke liye sign karega
  return jwt.sign({ id }, process.env.JWT_SECRET || 'maza_cart_secret_key_123', {
    expiresIn: '30d',
  });
};

export default generateToken;