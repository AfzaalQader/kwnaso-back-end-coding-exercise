const Joi = require("joi");

exports.userCreateValidation = Joi.object({
    email: Joi.string().email().required("Email must be required!"),
    password: Joi.string().min(3).max(8).required("Passwordis required!"),
});

exports.getUserByIdValidation = Joi.object({
    id: Joi.number().integer().required("User Id required!")
});