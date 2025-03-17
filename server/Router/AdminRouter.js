const express = require('express');
const router = express.Router();
const UserAndAuthor = require('../models/userAuthorModel');

//  Get all Users & Authors  
router.get('/all-users', async (req, res) => {
    try {
        const users = await UserAndAuthor.find({ role: { $in: ['user', 'author'] } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Enable or Disable User/Author
router.put('/block-user/:clerkId', async (req, res) => {
    try {
        const user = await UserAndAuthor.findOne({ clerkId: req.params.clerkId });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isBlocked = !user.isBlocked;  // Toggle block status
        await user.save();

        res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } catch (error) {
        res.status(500).json({ message: "Error updating user status", error });
    }
});

module.exports = router;
