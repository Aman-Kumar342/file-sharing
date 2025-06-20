const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/profile - Protected route
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
            user: req.user
        },
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
