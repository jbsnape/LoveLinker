const router = require('express').Router();
const Profile = require('../models/profile.model');

router.route('/').get((req, res) => {
  Profile.find()
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  try {
    const { age, gender, preferredPartner, contactInfo, hobbies, radius } = req.body;

    const newProfile = new Profile({ age, gender, preferredPartner, contactInfo, hobbies, radius });

    await newProfile.save();
    res.json('Profile added!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
