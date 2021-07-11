import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserAdminModal from "../models/userAdmin.js";

const secret = "test";
//trzeba zapisać do env

export const signin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const oldUser = await UserAdminModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    console.log("OldUser:", oldUser);
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log("Wrong!");
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const signup = async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   try {
//     const oldUser = await UserAdminModal.findOne({ email });
//     if (oldUser)
//       return res.status(400).json({ message: "User already exists" });
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const result = await UserAdminModal.create({
//       email,
//       password: hashedPassword,
//       name: `${firstName} ${lastName}`,
//     });
//     const token = jwt.sign({ email: result.email, id: result._id }, secret, {
//       expiresIn: "1h",
//     });
//     res.status(201).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log(error);
//   }
// };
