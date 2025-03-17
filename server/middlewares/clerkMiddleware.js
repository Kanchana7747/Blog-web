const UserAndAuthor = require('../models/userAuthorModel');

async function verifyClerkUser(req, res, next) {
    const clerkUserId = req.headers['clerk-user-id'];  // Clerk user ID from frontend

    if (!clerkUserId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const user = await UserAndAuthor.findOne({ clerkId: clerkUserId });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isBlocked) return res.status(403).json({ message: "Your account is blocked. Please contact admin" });

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error });
    }
}

module.exports = verifyClerkUser;
