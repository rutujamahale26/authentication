import {User} from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Replace with your actual secret key
const JWT_SECRET = 'accd_ef';

export const register = async (req, res) => {
  try {
    const { fname, lname, mobile, gender, email, password, role } = req.body;

    console.log("Incoming registration data:", req.body);

    if (!fname || !lname || !mobile || !gender || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Add debug logs around database and logic
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname, lname, mobile, gender, email, password: hashedPassword, role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Register Error:", error); // this will show exact backend failure
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email,role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({  message : 'Somthing went wrong', err });
  }
};
