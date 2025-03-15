const express = require('express');
const router = express.Router();
const { authenticate, checkRole } = require('../middleware/auth');
const User = require('../models/User');
const { createClerkUser } = require('../services/clerkService');


// Teacher creates student
router.post('/students', authenticate, checkRole(['teacher']), async (req, res) => {
  console.log(`[${new Date().toISOString()}] Teacher ${req.user._id} creating student`);
  try {
    const { email, password } = req.body;
    
    const clerkUser = await createClerkUser(email, password, 'student');
    
    const student = await User.create({
      clerkUserId: clerkUser.id,
      email,
      role: 'student',
      createdBy: req.user._id
    });
    console.log(`[${new Date().toISOString()}] Student created: ${student._id}`);

    res.status(201).json(student);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Student creation error:`, error.message);
    res.status(400).json({ error: 'Failed to create student' });
  }
});

// Get current user
// Protected route with Clerk middleware
// router.get('/me', ClerkExpressRequireAuth(), async (req, res) => {
//   try {
//     // Get Clerk user ID from auth middleware
//     const clerkUserId = req.auth.userId;
    
//     const user = await User.findOne({ clerkUserId });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ 
//       role: user.role || 'student',
//       email: user.email 
//     });
    
//   } catch (error) {
//     console.error('Role fetch error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;