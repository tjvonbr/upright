import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tjvonbr@gmail.com",
    pass: "gtmxpryvxoyjmped",
  },
});

export const mailOptions = {};
