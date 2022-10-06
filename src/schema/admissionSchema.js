import mongoose from "mongoose";
import Joi from "joi";
import moment from "moment";

export const Admission = mongoose.model(
	"Admission",
	new mongoose.Schema({
		patient_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Patients",
			required: true,
		},
		diagnosis: { type: String, required: true, trim: true },
		disposition: { type: String, default: "", trim: true },
		datestart: { type: String, required: true, trim: true },
		dateend: { type: String, trim: true },
		datecreated: {
			type: String,
			default: moment().format(),
			trim: true,
		},
		isPublished: { type: Boolean, default: true },
	})
);

export const validateAdmission = (body) => {
	const schema = Joi.object({
		patient_id: Joi.string().required(),
		datestart: Joi.string().min(10).required(),
		dateend: Joi.string().allow(""),
		diagnosis: Joi.string().required(),
		disposition: Joi.string().allow(""),
	});

	return schema.validate(body, { abortEarly: false });
};
