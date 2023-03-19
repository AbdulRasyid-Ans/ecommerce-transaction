const { query, param } = require('express-validator');
const middleware = require('../helper/middleware');

module.exports = {
    pagination: () => [
        query('page').optional().isNumeric().withMessage('Page harus berupa angka'),
        query('row').optional().isNumeric().withMessage('Row harus berupa angka'),
        query('pagination').optional().customSanitizer((value) => value.toLowerCase()).isIn(['true', 'false'])
            .withMessage('Pagination harus berupa true atau false'),
    ],
    numericParams: async (req, res, next, _, name) => {
        await param(name)
            .notEmpty()
            .withMessage(`Param ${name} tidak boleh kosong`)
            .isNumeric()
            .withMessage(`Param ${name} harus berupa angka`)
            .run(req);
        return middleware.checkValidation(req, res, next);
    },
};