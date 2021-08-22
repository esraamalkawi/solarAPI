const stripe = require('stripe')('sk_test_51JQYTnDsGZQiZyXQfOuGcY0q6hQYRR3jmdI9e9j5SqGbRxB7YyodD4844u5JwrAeFGwa22RHJkBOOy0MIjp0c8HB00JohV6oR6');
const { UserItems, User, Item } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.userItemList = async (req, res, next) => {
  try {
    const userItem = await UserItems.findAll({
      attributes: { exclude: ["createdAt"] },
      where: {
        userId: {
          [Op.eq]: req.user.id,
        },
      },
    });
    res.json(userItem);
  } catch (error) {
    next(error);
  }
};
exports.myUser = async (req, res, next) => {
  try {
   
   
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.UserItemCreate = async (req, res, next) => {
  try {
    const newUserItem = await UserItems.create({
      name: req.body.name,
      itemId: req.params.itemId,
      userId: req.user.id,
    });
    console.log("here pls", User)
    const myItem= await Item.findByPk(req.params.itemId) 
     await req.user.update({
       score: req.user.score -myItem.price
     })
    res.status(201).json(newUserItem);
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    score: user.score,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.userUpdate = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    await req.user.update(req.body);
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.scoreUpdate = async (req, res, next) => {
  try {
    
    await User.update(req.body, { where: { id: req.user.id } });
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

exports.checkout = async (req, res,next) => { try {
  console.log(req.body)
  const YOUR_DOMAIN = 'http://localhost:3000/checkout';
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [
      'card',
    ],
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        amount: 2000,
  currency: 'usd',
  
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })

  res.redirect(303, session.url)

} catch (error) {
  next(error); 
}
}

  