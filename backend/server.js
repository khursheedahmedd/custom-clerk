require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const { clerkMiddleware, requireAuth, getAuth, clerkClient } = require('@clerk/express');
const User = require('./models/User');
const webhookRoutes = require('./routes/webhooks');

const app = express();
console.log(`[${new Date().toISOString()}] Server starting...`);

// Clerk middleware setup
app.use(clerkMiddleware());
app.use('/api/webhooks', webhookRoutes);


// Middleware
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.get('/api/users/me', requireAuth(), async (req, res) => {
  try {
    console.log(`[${req.auth.userId}] Fetching user role`);
    const { userId } = getAuth(req);
    console.log(`[${userId}] Fetching user from database`);
    let dbUser = await User.findOne({ clerkUserId: userId });
    console.log(`[${userId}] User found in database:`, dbUser);

    // Create user if not found
    if (!dbUser) {
      console.log(`[${userId}] User not found in database. Creating a new user.`);
      const clerkUser = await clerkClient.users.getUser(userId);
      const clerkRole = clerkUser.unsafeMetadata.role ;
      // console.log(`[${userId}] Clerk user found:`, clerkUser);
      // console.log(`[${userId}] Clerk user found:`, clerkUser.role);
      console.log(`[${userId}] Clerk user role:`, clerkRole);
      dbUser = await User.create({
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        role: clerkRole 
      });
    }

    res.json({ role: dbUser.role });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Error Handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend Running!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});