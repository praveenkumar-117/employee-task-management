const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, // Added unique constraint },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  failedTasks: {
    type: Number,
    default: 0,
  },
  acceptedTasks: {
    type: Number,
    default: 0,
  },
  newTasks: {
    type: Number,
    default: 0,
  },
});


//compare the passowrd
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

//secrure password with bcrypt
// befor save data pre() will run 
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error)
  }
})

//genret token with jwt
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      }
    )
  } catch (error) {
    console.error(error);
  }
};

//defining the collection or model
const User = new mongoose.model("User", userSchema)

module.exports = User;