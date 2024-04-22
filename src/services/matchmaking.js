const Profile = require('../models/profile.model');

const getSortedProfilesByPreferences = async (currentUserId) => {
    try {
      // Retrieve the current user's profile
      const currentUserProfile = await Profile.findOne({ userId: currentUserId });
      if (!currentUserProfile) {
        throw new Error('Current user profile not found');
      }
  
      // Retrieve the profiles of all other users with matching preferred gender and compatible gender preferences
      const potentialMatches = await Profile.find({
        gender: currentUserProfile.preferredPartner,
        preferredPartner: currentUserProfile.gender,
        userId: { $ne: currentUserId }
      });
  
      // Calculate similarity scores based on matching hobbies
      const profilesWithScores = potentialMatches.map(profile => {
        const matchingHobbies = profile.hobbies.filter(hobby =>
          currentUserProfile.hobbies.includes(hobby)
        ).length;
        return {
          profile: profile.toObject(),
          similarityScore: matchingHobbies
        };
      });
  
      profilesWithScores.sort((a, b) => b.similarityScore - a.similarityScore);
  
      // Return the sorted profiles
      return profilesWithScores.map(({ profile }) => profile);
  
    } catch (error) {
      console.error('Error in matchmaking algorithm:', error);
      throw error;
    }
  };

  module.exports = getSortedProfilesByPreferences;
