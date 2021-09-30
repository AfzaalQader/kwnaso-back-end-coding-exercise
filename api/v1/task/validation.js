const Joi = require("joi");

exports.taskCreateValidation = Joi.object({
    name: Joi.string().required("Email must be required!"),
});
