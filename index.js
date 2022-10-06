import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import patients from "./src/routes/patients.js";
import consultations from "./src/routes/consultations.js";
import admissions from "./src/routes/admissions.js";
import users from "./src/routes/users.js";

mongoose
	.connect(
		"mongodb+srv://mykobacal23:mykobacal23@cluster0.e46oelg.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB..."));

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/patients", patients);
app.use("/consultations", consultations);
app.use("/admissions", admissions);
app.use("/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Connected to PORT ${port}`));
