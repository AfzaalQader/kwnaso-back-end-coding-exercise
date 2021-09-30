// const { User } = require("../../../model");
const failure = require('../../../public/javascripts/failure');
const success = require('../../../public/javascripts/success');
const { createJWT } = require("../../../utils/create-token");
const taskValidation = require('./validation');
const task = [];

exports.createTask = async (req, res) => {
    try {
        let name;
        const body = ({ name } = req.body)
        const { error } = taskValidation.taskCreateValidation.validate(body, {
            abortEarly: false,
        })

        if (error) {
            let err = [];
            for (let i = 0; i < error.details.length; i++) {
                err.push(error.details[i].message);
            }
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.items = err;
            return res.status(failure_400.code).send(failure_400);
        }
        let id = task.length;
        body.id = id + 1;
        task.push(body);
        const success_201 = success.success_range_200.success_201;
        success_201.items = [body];
        return res.status(success_201.code).send(success_201)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.listTask = async (req, res) => {
    try {
        console.log("Task::::::::::: ", task)
        const success_200 = success.success_range_200.success_200;
        success_200.items = [...task];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}
