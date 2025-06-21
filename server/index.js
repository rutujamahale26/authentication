import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 5000;

// CORS config for local frontend (localhost:3000)
app.use(cors({
  origin: 'https://authentication-one-neon.vercel.app/',
  credentials: true
}));

app.use(express.json());

// DB connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
