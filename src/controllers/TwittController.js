const User = require('../models/User');
const Twiit = require('../models/Twiit');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const twiits = await Twiit.findAll({ id_user: user_id})

    return res.json(twiits);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const [ twiit ] = await twiit.findOrCreate({
      where: { name }
    });

    await user.addtwiit(twiit);

    return res.json(twiit);
  },

  async delete(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const twiit = await twiit.findOne({
      where: { id_user: user_id }
    });

    await user.twiit(twiit);

    return res.json();
  }
};