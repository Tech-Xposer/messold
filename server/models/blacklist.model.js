import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const blackList = mongoose.model("Blacklist", BlacklistSchema);
export default blackList;
