import jwt from 'jsonwebtoken';

const JWT_SECRET = 'accd_ef';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token found, Access denied' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      console.log('The user is:', req.user);
      next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(400).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'No token found, Access denied' });
  }
};

export default verifyToken;
