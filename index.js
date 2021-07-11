import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import courseRoutes from "./routes/course.js";
import userRoutes from "./routes/user.js";
import userAdminRoutes from "./routes/userAdmin.js";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/userAdmin", userAdminRoutes);
app.use("/courses", courseRoutes);

dotenv.config();
const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
