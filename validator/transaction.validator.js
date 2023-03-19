const { body } = require('express-validator');

module.exports = {
    create: () => [
        body('product_id')
            .notEmpty()
            .withMessage('product_id cannot be empty')
            .isNumeric()
            .withMessage('product_id must be numeric'),
        body('qty')
            .notEmpty()
            .withMessage('qty cannot be empty')
            .isNumeric()
            .withMessage('qty must be numeric'),
    ],
};
