const bcrypt = require('bcryptjs'); // To hash passwords
const User = require('../models/user'); // Import User model
const Charity = require('../models/charity'); // Import Charity model
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Function to handle individual user signup
const signupUser = async (req, res) => {
    const { fullName, email, password, role } = req.body; // Destructure 'role' from the request body
     // Log the data for debugging
   
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user, including the 'role' field
        const newUser = await User.create({
            full_name: fullName,
            email: email,
            password: hashedPassword,
            role: role || 'user', // Default role is 'user' if not provided
        });

        res.status(200).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};
// Function to handle charity organization signup
const signupCharity = async (req, res) => {
  const { orgName, email, password, working } = req.body;

  try {
    // Check if the charity already exists
    const existingCharity = await Charity.findOne({ where: { email } });
    if (existingCharity) {
      return res.status(400).json({ message: 'Charity organization already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new charity organization
    const newCharity = await Charity.create({
      org_name: orgName,
      email: email,
      password: hashedPassword,
      working: working,
    });

    res.status(200).json({ message: 'Charity organization registered successfully', charity: newCharity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering charity organization' });
  }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token valid for 7 days
        });
        console.log('Generated token payload:', { id: user.id, email: user.email, role: user.role });

        // Redirect based on the user's role
        if (user.role === 'organization') {
            res.json({ token, redirectTo: '/organization-dashboard' });  // Redirect to organization campaign page
        } else {
            res.json({ token, redirectTo: '/user-dashboard' });  // Redirect to user campaign page
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
  
  // Function to login charity
  const loginCharity = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the charity exists
      const charity = await Charity.findOne({ where: { email } });
      if (!charity) {
        return res.status(404).json({ message: 'Charity not found' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, charity.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: charity.id, email: charity.email }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token valid for 1 hour
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };
module.exports = { signupUser, signupCharity,loginUser, loginCharity };
