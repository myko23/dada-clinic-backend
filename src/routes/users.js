import express from "express";
import _ from "lodash";
import { validateUser, User, validateLogin } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
const router = express.Router();

router.get("/", async (req, res) => {
	const users = await User.find({ isPublished: true }).select(
		"-isPublished -__v"
	);
	res.send(users);
});
router.post("/", async (req, res) => {
	const result = validateUser(req.body);
	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	let newUser = await User.findOne({ email: req.body.email });
	if (newUser) return res.status(400).send("User already registered");

	newUser = new User(req.body);
	const salt = await bcrypt.genSalt(10);
	newUser.password = await bcrypt.hash(newUser.password, salt);

	try {
		newUser = await newUser.save();
		return res.send(_.pick(newUser, ["username", "email"]));
	} catch (err) {
		return res.status(404).send(err.message);
	}
});
router.post("/login", async (req, res) => {
	const result = validateLogin(req.body);
	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	try {
		const newUser = await User.findOne({ email: req.body.email });
		const login = await bcrypt.compare(req.body.password, newUser.password);

		const userToken = jwt.sign(
			_.pick(newUser, ["username", "title", "name", "email", "_id"]),
			"privatekey"
		);

		return res.send(userToken);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

export default router;
