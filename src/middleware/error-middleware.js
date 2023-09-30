import {ResponseError} from "../error/response-error.js";
const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        // jenis error yang tidak bisa handler ...
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}
