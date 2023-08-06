const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
/*
   get = response
   post = request
   put = update
   delete = delete
   patch = update
   options = request
   head = request
   connect = request
   trace = request
   all = request 
*/

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        //password: req.body.password
    });
    try{
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    //res.send(newUser);
})

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Credentials");
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            }
            , process.env.JWT_SECRET,
            {expiresIn: "3d"}
            );
        OriginalPassword !== req.body.password && res.status(401).json("Wrong Credentials");
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    } 
});
module.exports = router;
