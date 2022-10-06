import mongoose from "mongoose";
import express from "express";
import Joi from "joi";
import { Patient, validatePatients } from "../schema/patientSchema.js";
const router = express.Router();

//Routes

router.get("/", async (req, res) => {
	const userId = req.query["user_id"];
	const patients = await Patient.find({
		isPublished: true,
		user_id: userId,
	}).select("-isPublished -__v");
	res.send(patients);
});

router.post("/", async (req, res) => {
	const result = validatePatients(req.body);
	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	let newPatient = new Patient(req.body);

	try {
		newPatient = await newPatient.save();
		return res.send(newPatient);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

router.put("/:id", async (req, res) => {
	const result = validatePatients(req.body);
	if (result.error) {
		const errors = result.error.details.map((i) => i.message);
		return res.status(404).send(errors);
	}

	try {
		const newPatient = await Patient.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		if (!newPatient) {
			return res
				.status(404)
				.send("The patient with the given ID does not exist");
		} else res.send(req.body);
	} catch (err) {
		return res.status(404).send(err.message);
	}
});

export default router;
