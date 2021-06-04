const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


//static methods in js
userSchema.statics.uplodedAvatar=multer({storage:storage}).single("avatar");
userSchema.statics.AvatarPath=AVATAR_PATH;




const User = mongoose.model("User", userSchema);
module.exports = User;
