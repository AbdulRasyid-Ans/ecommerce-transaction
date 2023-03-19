const moment = require('moment');
const redisClient = require('../config/redis');

// Convert row and page to limit and offset
module.exports.simplePagination = (page, row) => {
    const pagination = { page, row };

    pagination.row = row;
    pagination.page = (page - 1) * pagination.row;

    return pagination;
};

// Create enum validation return true if enum is valid
module.exports.enumValidation = (enumValue, enumList) => {
    if (enumList.includes(enumValue)) {
        return true;
    }
    return false;
};

// Print alert to console
module.exports.printStcokAlert = (product) => {
    const now = moment().toISOString();
    console.log("===[ALERT] Stock is Running Out===")
    console.log(`Product ID: ${product.id}`)
    console.log(`Product Name: ${product.name}`)
    console.log(`Current Stock: ${product.stock}`)
    console.log(`=[Alert created on: ${now}]=`)
}

module.exports.storeToRedis = async (modelName, id, data) => {
    const redisKey = `CACHE_${modelName}_${id}`;
    const redisValue = JSON.stringify(data);
    await redisClient.setEx(redisKey, 3600, redisValue);
}

module.exports.getFromRedis = async (modelName, id) => {
    const redisKey = `CACHE_${modelName}_${id}`;
    const redisData = await redisClient.get(redisKey);

    if (redisData !== null) {
        return JSON.parse(redisData);
    }

    return null;
}

module.exports.removeFromRedis = async (modelName, id) => {
    const redisKey = `CACHE_${modelName}_${id}`;
    await redisClient.del(redisKey);
}
