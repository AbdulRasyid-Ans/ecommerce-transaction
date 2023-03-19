require('dotenv').config();

class Response {
    constructor(res) {
        this.res = res;
        this.statusOk = 200;
        this.statusCreated = 201;
        this.statusNoContent == 204;
        this.statusBadRequest = 400;
        this.statusUnauthorized = 401;
        this.statusForbidden = 403;
        this.statusNotFound = 404;
        this.statusInternalServerError = 500;
    }

    contentSuccess(code, response) {
        this.res.status(code).json({
            code,
            response,
        });
    }

    contentFail(code, error, errorCode) {
        let errorMessage = error.message;
        const errorResponse = {
            code,
        };
        if (!error.message) {
            if (typeof error === 'string') {
                errorMessage = error;
            }
        }
        const errObj = {
            message: errorMessage,
        };
        if (errorCode) {
            Object.assign(errObj, {
                error_code: errorCode,
            });
        }
        if (Array.isArray(error)) {
            Object.assign(errorResponse, {
                errors: error,
            });
        } else {
            Object.assign(errorResponse, {
                error: errObj,
            });
        }
        this.res.status(code).json(errorResponse);
    }
}

module.exports = Response;
