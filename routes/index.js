const express = require('express');
const miscValidator = require('../validator/misc.validator')
const transactionValidator = require('../validator/transaction.validator');
const middleware = require('../helper/middleware');

const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const transactionController = require('../controllers/transaction.controller');

const router = express.Router();

router.get('/user', [
    miscValidator.pagination(),
    middleware.checkValidation,
    userController.getList,
]);
router.get('/user/:userId', [
    userController.getDetail,
]);

router.get('/product', [
    miscValidator.pagination(),
    middleware.checkValidation,
    productController.getList,
]);
router.get('/product/:productId', [
    productController.getDetail,
]);

router.get('/transaction', [
    miscValidator.pagination(),
    middleware.checkValidation,
    transactionController.getList,
]);
router.post('/transaction', [
    transactionValidator.create(),
    middleware.checkValidation,
    transactionController.create,
])

router.param('userId', miscValidator.numericParams);
router.param('productId', miscValidator.numericParams);

module.exports = router;
