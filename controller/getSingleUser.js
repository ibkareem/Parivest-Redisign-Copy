const userModel = require("../models/user");
const _ = require("lodash");

async function getProfile(req, res) {
    try {
      let user_id;
      let omit_list = ["password", "resetPassword"];
      if (req.query.id) {
        user_id = req.query.id;
        omit_list.push("bank");
      } else {
        return res.status(400).send({
            status_code: 500,
            detail: 'payload error',
            message: "Internal server error!"
          }); 
      }
      let user = await userModel.findOne({ _id: user_id });
      let newUser = _.omit({ ...user._doc }, omit_list);
      newUser.name = `${user.first_name} ${user.last_name}`;
      return res.status(200).send({
        status_code: 200,
        data: newUser
      });
    } catch (error) {
      return res.status(500).send({
        status_code: 500,
        detail: error.message,
        message: "Internal server error!"
      });
    }
  }

  module.exports = getProfile