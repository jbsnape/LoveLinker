const router = require('express').Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile.model');
const User = require('../models/user.model');
const matchmaking = require('../src/services/matchmaking');

router.route('/').get((req, res) => {
  Profile.find()
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  try {
    const { userId, age, gender, preferredPartner, contactInfo, hobbies, radius } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newProfile = new Profile({ userId, age, gender, preferredPartner, contactInfo, hobbies, radius });

    await newProfile.save();
    res.json('Profile added!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.get('/matches/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sortedProfiles = await getSortedProfilesByPreferences(userId);
    res.json(sortedProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches", error: error.message });
  }
});

module.exports = router;
