const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes'); // Import auth routes
const path=require('path');
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// Use the auth routes
app.use( authRoutes);
app.use( campaignRoutes);
app.use( donationRoutes);
// Serve static files from the 'public' directory


// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
  });
  app.get('/charity-signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'charity-signup.html'));
  });
  app.get('/user-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user-login.html'));
  });
  app.get('/charity-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'charity-login.html'));
  });
  app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
  });
  app.get('/organization-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'organization-dashboard.html'));
  });
  app.get('/user-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
  });

// Basic error handling


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
