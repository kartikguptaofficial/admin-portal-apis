/**
 * User model schema definition.
 *
 * Defines the schema for User documents in MongoDB.
 * Includes fields like name, email, password, role, etc.
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar_url: {
      type: String,
      required: false,
      default:
        "https://www.gravatar.com/avatar/0000000000000000000000000000000?d=mp&f=y",
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin", "moderator"],
      required: true,
      default: "user",
    },
    is_active: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_social_auth: {
      type: Boolean,
      required: true,
      default: false,
    },
    auth_credentials: {
      type: mongoose.Schema.Types.Mixed,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Number,
      default: () => Math.ceil(+new Date() / 1000),
    },
    updated_at: {
      type: Number,
      default: () => Math.ceil(+new Date() / 1000),
    },
    deleted_at: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
