import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For hashing passwords
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    token: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createEmailVerificationToken = function () {
  const payload = { id: this._id };
  const verificationToken = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "30m",
  });
  return verificationToken;
};
userSchema.methods.generateLoginToken = function () {
  const payload = { id: this._id };
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "2d",
  });
  return token;
};

//toDo create password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const payload = { id: this._id };
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "30m",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
