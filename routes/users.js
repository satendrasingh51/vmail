const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto')
const User = require('../models/users');
const fileUpload = require('express-fileupload');


router.use(fileUpload());

// @route    POST api/users
// @desc     Register user  
// @access   Public
router.post(
  '/create',
  [
    check('username', 'UserName is required')
      .not()
      .isEmpty(),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('mobile', 'Mobile is required and 10 digit')
      .isLength({ min: 10 }),
    check('dob', 'Date of Birth is required')
      .not()
      .isEmpty(),
    check('gender', 'Gender is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { username, name, password, mobile, dob, gender } = req.body;
    let image = req.files.image;

    try {
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ msg: [{msg: 'username already exists'}] });
      }
      user = new User({
        username,
        name,
        password,
        mobile,
        dob,
        gender,
        image: image.name,
      });
      image.mv(`./client/public/images/${image.name}`, function (err) {
        if (err) {
          return res.status(500).json({ msg: [{ msg: 'something Error'}] });
        }
      })

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('JWT_SECRET'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            res.json(err)
          } if (token) {
            res.json({ token, user, msg: [{msg: 'Registration Successfull'}] })
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


/**
 * Reset password
 */
router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      console.log(error.msg)
      res.json({ msg: 'Server Error' })
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(400).json({ msg: 'Please Enter Valid Email' });
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transport.sendMail({
            to: user.email,
            from: 'no-replay@gmail.com',
            subject: 'Reset Password',
            html: `
          <p>A password reset event has been triggered. The password reset window is limited to two hours.

If you do not reset your password within two hours, you will need to submit a new request.

To complete the password reset process, visit the following link:
</p>
          <h4>Click in this <a href="http://localhost:3000/reset/${token}"> Link </a>To reset Password  </h4>
          `
          })
          res.json({ msg: 'Check your Email' })
        })
      })
  })
})

/** Forget Password **/
router.post('/new-password', (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: 'Try again session expired' })
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveUser) => {
          res.json({ msg: 'Password Updated Success' })
        })
      })
    }).catch(error => {
      res.json({ msg: error })
      console.log(error.message);
    })
})


// // Update User
// router.put('/wallet', adminAuth, (req, res) => {
//   User.findOneAndUpdate({ $set: req.body }, (error, data) => {
//     if (error) {
//       console.log(error)
//       res.status(400).json({ msg: 'Bad Request' })
//     } else {
//       console.log(error)
//       res.status(200).json({ data, msg: 'Updated Data' })
//     }
//   })
// })

module.exports = router;
