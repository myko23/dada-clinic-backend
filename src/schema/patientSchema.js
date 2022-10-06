import mongoose from "mongoose";
import Joi from "joi";

export const Patient = mongoose.model(
	"Patient",
	new mongoose.Schema({
		user_id: { type: String, required: true, trim: true },
		firstname: { type: String, required: true, trim: true },
		middlename: { type: String, trim: true, default: "" },
		lastname: { type: String, required: true, trim: true },
		birthday: { type: String, required: true, trim: true },
		contact: { type: String, default: "", trim: true },
		guardian: { type: String, default: "", trim: true },
		relationship: { type: String, default: "", trim: true },
		guardianno: { type: String, default: "", trim: true },
		isPublished: { type: Boolean, default: true },
	})
);

export const validatePatients = (body) => {
	const schema = Joi.object({
		user_id: Joi.string().required(),
		firstname: Joi.string().min(1).required(),
		middlename: Joi.string().min(1).allow(""),
		lastname: Joi.string().min(1).required(),
		birthday: Joi.string().min(10).required(),
		contact: Joi.string().allow(""),
		guardian: Joi.string().allow(""),
		relationship: Joi.string().allow(""),
		contact: Joi.string().allow(""),
		guardianno: Joi.string().allow(""),
	});

	return schema.validate(body, { abortEarly: false });
};
