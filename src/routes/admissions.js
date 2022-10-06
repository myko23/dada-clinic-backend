import mongoose from "mongoose";
import moment from "moment";
import express from "express";
import _ from "lodash";

import { Admission, validateAdmission } from "../schema/admissionSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
	const admission = await Admission.find({ isPublished: true }).select(
		"-isPublished -__v"
	);
	res.send(admission);
});
router.post("/", async (req, res) => {
	const result = validateAdmission(req.body);

	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	let newAdmit = new Admission(req.body);

	try {
		newAdmit = await newAdmit.save();
		return res.send(newAdmit);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

router.put("/:id", async (req, res) => {
	const result = validateAdmission(req.body);
	console.log(req.body);

	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	try {
		const newAdmit = await Admission.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		if (!newAdmit) {
			return res
				.status(404)
				.send("The admissions with the given ID does not exist");
		} else res.send(newAdmit);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

export default router;
