// Import necessary modules and set up Express app
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Route for processing loan payments
app.post('/process-payment', async (req, res) => {
    const { amount, currency, token } = req.body;

    try {
        // Create a charge using Stripe API
        const charge = await stripe.charges.create({
            amount: amount,
            currency: currency,
            source: token, // Token obtained from frontend
            description: 'Loan Payment'
        });

        // Process successful payment
        // Update loan status in database, send confirmation email, etc.

        res.status(200).send('Payment processed successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing payment.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
