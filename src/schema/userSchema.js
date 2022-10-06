import mongoose from "mongoose";
import Joi from "joi";

export const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 5,
			maxlength: 50,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 5,
			maxlength: 255,
		},
		name: {
			type: String,
			trim: true,
			minlength: 5,
			maxlength: 255,
			default: "",
		},
		title: {
			type: String,
			trim: true,
			minlength: 5,
			maxlength: 50,
			default: "",
		},
		isPublished: { type: Boolean, default: true },
	})
);

export const validateUser = (body) => {
	const schema = Joi.object({
		username: Joi.string().min(5).max(50).required(),
		password: Joi.string().min(5).max(255).required(),
		email: Joi.string().email().min(5).max(255).required(),
		name: Joi.string().min(5).max(255).allow(""),
		title: Joi.string().min(5).max(50).allow(""),
	});

	return schema.validate(body, { abortEarly: false });
};

export const validateLogin = (body) => {
	const schema = Joi.object({
		password: Joi.string().min(5).max(255).required(),
		email: Joi.string().email().min(5).max(255).required(),
	});

	return schema.validate(body, { abortEarly: false });
};
