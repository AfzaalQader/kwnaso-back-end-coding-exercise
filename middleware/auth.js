const jwt = require("jsonwebtoken");
const failler = require('../public/javascripts/failure')

exports.auth = async (req, res, next) => {
    try {
        const header = await req.headers.authorization;
        if(!header) {
            const failer_401 = failler.failure_range_400.failure_401;
            failer_401.message = "Token required!"
            return res.status(failer_401.code).send(failer_401)
        }
        const token = header.split(' ')[1]
        const decodedToken = await jwt.verify(token, "secret");

        const id = decodedToken.data;
        if (!id) {
            const failer_401 = failler.failure_range_400.failure_401;
            return res.status(failer_401.code).send(failer_401)
        } else {
            req.query.id = id;
            next();
        }
    } catch(error) {
        console.log("Error:::::::::::::::: ", error)
        const failer_400 = failler.failure_range_400.failure_400;
        failer_400.message = "Invalid token!";
        return res.status(failer_400.code).send(failer_400)
    }
}