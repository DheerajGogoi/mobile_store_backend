const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const mobileRoutes = require('./routes/mobile.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

// Mongoose Connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,  // no longer needed, but can be left for backward compatibility
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/mobile', mobileRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close Mongoose connection on application termination
// process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//         console.log('Mongoose default connection disconnected through app termination');
//         process.exit(0);
//     });
// });
