const { User } = require("../db/models");

const bcrypt = require("bcrypt");

exports.userUpdate = async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.params.userId);

    const conflictUserName = await User.findOne({
      where: { username: req.body.username },
    });
    if (conflictUserName) {
      if (conflictUserName.username !== foundUser.username) {
        res
          .status(401)
          .send({ status: 401, message: "Username already exist" })
          .end();
      }
    }
    const saltRounds = 10;
    const match = await bcrypt.compare(
      req.body.currentpassword,
      foundUser.password,
      function (err, res) {
        if (err) {
          console.log("Comparison error: ", err);
        }
      }
    );

    if (match) {
      const newHashedPassword = await bcrypt.hash(
        req.body.password,
        saltRounds
      );
      req.body.password = newHashedPassword;
      await foundUser.update(req.body);
    } else {
      res.status(402).send({ status: 402, message: "invalid password" }).end();
    }

    const token = generateToken(foundUser);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
