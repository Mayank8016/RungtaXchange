import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

export const generatePasswordResetToken = (userId) => {
  return jwt.sign({ id: userId, purpose: "passwordReset" }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN || "10m",
  });
};
