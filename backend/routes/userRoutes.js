const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken")

const router = express.Router();

// register user
router.post("/register", async(req, res) => {
    const {username, email, password} = req.body;
    const hashPassowrd = await bcrypt.hash(password, 10);

    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "user already exist"})
        }else {
            const newUser = await userModel.create({username, email, password: hashPassowrd})
            res.status(200).json(newUser)
        }

    } catch (error) {
        console.log("error register user", error)
        res.status(500).json({message: "error server error"})
    }
})

// login user
router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            res.status(400).json({message: "user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({message: "email and password is incorrect"});
        }else {
            const tokenData = {
                userID: user._id
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});
            return res.cookie("token", token, {expiresIn: "1d"}).status(200).json({message: "Login success", token});
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", (req, res) => {
    res.cookie("token", "", {expiresIn: new Date(0)})
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.redirect("/login")
})


module.exports = router;