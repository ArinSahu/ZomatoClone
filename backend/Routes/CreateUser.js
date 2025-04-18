const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post("/createuser",
    [body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
    ]
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post("/loginuser",
    [body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    ]
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ result: "log with correct credentials" });
            }
            if (req.body.password !== userdata.password) {
                return res.status(400).json({ result: "log with correct credentials" });
            }
            return res.json({ success: "true" });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;