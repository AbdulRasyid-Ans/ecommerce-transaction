const cron = require('node-cron');
const ProductService = require('../service/product');

cron.schedule('* * * * *', ProductService.cronStockAlert)

module.exports = cron;