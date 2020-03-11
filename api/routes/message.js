var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
      type: "login",
      user: process.env.USER,
      pass: process.PASS
    }
  });
router.post('/', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('name').isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
    check('email', 'Email must not be empty.').isLength({min: 1}),

    check('email', 'Email is not valid.').isEmail().normalizeEmail(),

    check('message', 'Message must not be empty.').not().isEmpty(),
    check('message').isLength({min: 5}).trim().escape().withMessage('Message must have more than 5 characters'),

  ],
  function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
        
        var mailOptions = {
            from: process.env.USER,
            to: process.env.USER,
            subject: 'message from INSZN, NAME:'+ req.name + ' EMAIL:' + req.email ,
            text: req.message
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(440)
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200)
            }
          });    }
  });

module.exports = router;