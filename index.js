const express = require('express');
const app = express();
const router = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes : 
const authRoute = require('./routes/auth');
const profilRoute = require('./routes/memberProfil');

// Connect to DB : 
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true,  useUnifiedTopology: true }, () => console.log('Connected to DB'));

// Middlware :
app.use(express.json());
// Route Middlewares : 
app.use('/api/user', authRoute);
app.use('/api/profil', profilRoute);

app.listen(3000, () => console.log('Server is running'));