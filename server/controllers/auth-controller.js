const User = require("../models/user-model");
const bcrypt = require("bcrypt")


const home = async (req, res) => {
  try {
    res.status(200).send("welcome to authentication page");
  } catch (error) {
    console.log(error)
  };
}

// handle sigun request

const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }
    const userCreated = await User.create({ name, email, password });
    res.status(201).json({
      msg: "Registration succussfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    })
  } catch (error) {
    next(error);
  }
}


// handling login request
const login = async (req, res) => {
  try {

    const { email, password } = req.body
    const userExist = await User.findOne({ email: email })
    if (!userExist) {
      return res.status(400).json({ message: " User Not Found" })
    }

    const hashPass = await bcrypt.compare(password, userExist.password)
    if (hashPass) {
      res.status(200).json({
        msg: "BackEnd- Login succussfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin,
      })
    }else {
      res.status(401).json({ message: "Invalid Login Credentials" })}
  } catch (error) {

    res.status(500).json("internal server error")
  }
}


// to send user data -user logic 
const user = async (req, res) => {
  try {
    const userData = req.user;
    
    return res.status(200).json({userData});
    
  } catch (error) {
    console.log('error from the user route ${error}');
  }
}


module.exports = { home, signup, login, user };