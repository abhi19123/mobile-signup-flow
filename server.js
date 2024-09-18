const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');

// Initialize dotenv to read from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Google OAuth client setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to parse JSON body data
app.use(express.json());

// Route for verifying Google ID token
app.post('/verifyGoogleToken', async (req, res) => {
    const token = req.body.token;
    
    try {
        // Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        // You can send back user info or store it in a database
        res.status(200).json({
            message: 'Token successfully verified',
            userId,
            email,
            name
        });

    } catch (error) {
        res.status(400).json({
            message: 'Invalid token',
            error
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
