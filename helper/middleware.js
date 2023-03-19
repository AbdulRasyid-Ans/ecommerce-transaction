const { validationResult } = require('express-validator');
const Response = require('../service/util/response')

module.exports = {
    checkValidation: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const response = new Response(res);
        return response.contentFail(response.statusBadRequest, errors.errors);
    },
};
