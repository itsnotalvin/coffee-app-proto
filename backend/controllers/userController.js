const db = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }, // Exclude password from the response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error });
  }
};