var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');

router.post('/', [
    check('name').exists().isLength({min: 5}).trim().escape().withMessage('Name must have more than 5 characters'),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('message', 'Your password must be at least 5 characters').not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
        
      res.send({});
    }
  });

module.exports = router;