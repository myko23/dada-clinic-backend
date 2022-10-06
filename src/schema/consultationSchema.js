import Joi from "joi";
import mongoose from "mongoose";
import moment from "moment";

export const Consultation = mongoose.model(
	"Consultation",
	new mongoose.Schema({
		patient_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Patients",
			required: true,
		},
		chiefcomplaint: { type: String, required: true, trim: true },
		subjective: { type: String, default: "", trim: true },
		objective: { type: String, default: "", trim: true },
		assessment: { type: String, required: true, trim: true },
		plan: { type: String, default: "", trim: true },
		datecreated: {
			type: String,
			required: true,
			default: moment().format("MM-DD-YYYY"),
			trim: true,
		},
		isPublished: { type: Boolean, default: true },
	})
);

export const validateConsultation = (body) => {
	const schema = Joi.object({
		patient_id: Joi.string().required(),
		chiefcomplaint: Joi.string().min(1).required(),
		subjective: Joi.string().allow(""),
		objective: Joi.string().allow(""),
		assessment: Joi.string().min(1).required(),
		plan: Joi.string().allow(""),
		datecreated: Joi.string().min(10),
	});

	return schema.validate(body, { abortEarly: false });
};
