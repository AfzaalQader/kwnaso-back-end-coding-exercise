// const { User } = require("../../../model");
const failure = require('../../../public/javascripts/failure');
const success = require('../../../public/javascripts/success');
const { createJWT } = require("../../../utils/create-token");
const userValidation = require('./validation');
const data = [];

exports.createUser = async (req, res) => {
    try {
        let email, password;
        const body = ({ email, password } = req.body)
        const { error } = userValidation.userCreateValidation.validate(body, {
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
        let id = data.length;
        body.id = id + 1;
        data.push(body);
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

exports.login = async (req, res) => {
    try {
        let email, password;
        const body = ({ email, password } = req.body)
        const { error } = userValidation.userCreateValidation.validate(body, {
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
        let user = {};
        user = data.find((item) => {
            if(item.email == email && item.password == password) {
                return item
            }
        })

        if (!user) {
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.message = "Email or password invalid!"
            return res.status(failure_400.code).send(failure_400);
        }

        const token = await createJWT(user.id);

        const success_201 = success.success_range_200.success_201;
        success_201.items = [token];
        return res.status(success_201.code).send(success_201)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.getUserById = async (req, res) => {
    try {
        let id
        const body = ({ id } = req.query);
        const { error } = userValidation.getUserByIdValidation.validate(body, {
            abortEarly: false
        });

        if (error) {
            let err = [];
            for (let i = 0; i < error.details.length; i++) {
                err.push(error.details[i].message);
            }
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.items = [error];
            return res.status(failure_400.code).send(failure_400);
        }

        let user = {};
        user = data.find((item) => {
            if(item.id == id) {
                return item
            }
        })

        if (!user) {
            const success_204 = success.success_range_200.success_204;
            success_204.items = [];
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = [user];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}