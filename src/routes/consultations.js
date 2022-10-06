import mongoose from "mongoose";
import express from "express";
import _ from "lodash";
import moment from "moment";
import Joi from "joi";
import {
	Consultation,
	validateConsultation,
} from "../schema/consultationSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
	const consultations = await Consultation.find({ isPublished: true }).select(
		"-isPublished -__v"
	);
	res.send(consultations);
});

router.post("/", async (req, res) => {
	const result = validateConsultation(req.body);

	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	let newConsult = new Consultation(req.body);

	try {
		newConsult = await newConsult.save();
		return res.send(newConsult);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});
router.put("/:id", async (req, res) => {
	const result = validateConsultation(req.body);

	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	try {
		const newConsult = await Consultation.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		if (!newConsult) {
			return res
				.status(404)
				.send("The consultation with the given ID does not exist");
		} else res.send(newConsult);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

export default router;
