const sequelize = require('sequelize');
const { product: productModel, Sequelize } = require('../models/index');
const misc = require('../helper/misc');

class ProductService {
    /**
     * List Products
     * @param {string} [orderBy='id'] order by column name
     * @param {'ASC'|'DESC'} [orderType='ASC'] order type
     * @param {string} [search] filter by name
     * @param {boolean} [isPagination=true] enable/disable pagination
     * @param {number} [page=1] page number if pagination is enabled
     * @param {number} [row=10] rows per page if pagination is enabled
     * @returns {Array} list of Products
     */
    static async getList(orderBy = 'id', orderType = 'ASC', search, isPagination = true, page = 1, row = 10) {
        const productAttributes = [
            'id',
            'name',
            'price',
            'stock',
        ];

        if (!misc.enumValidation(orderBy, productAttributes)) {
            // eslint-disable-next-line no-param-reassign
            orderBy = 'id';
        }
        if (!misc.enumValidation(orderType.toUpperCase(), ['ASC', 'DESC'])) {
            // eslint-disable-next-line no-param-reassign
            orderType = 'ASC';
        }

        const option = {
            attributes: productAttributes,
            order: [[orderBy, orderType]],
            where: {},
        };

        if (search) {
            Object.assign(option.where, {
                name: {
                    [sequelize.Op.iLike]: `%${search}%`,
                },
            });
        }

        if (isPagination) {
            const pagination = misc.simplePagination(page, row);
            Object.assign(option, {
                limit: pagination.row,
                offset: pagination.page,
            });
        }

        return productModel.findAndCountAll(option);
    }

    static async getDetail(productId) {
        const redisData = await misc.getFromRedis('product', productId);
        if (redisData) {
            return redisData
        }

        const product = await productModel.findOne({
            where: {
                id: productId,
            }
        })
        if (!product) {
            return null
        }

        await misc.storeToRedis('product', productId, product);

        return product;
    }

    static async cronStockAlert() {
        try {
            const products = await productModel.findAll({
                where: {
                    stock: {
                        [sequelize.Op.lte]: Sequelize.col('stock_alert'),
                    }
                }
            });
            
            if (products.length > 0) {
                products.forEach(product => {
                    misc.printStcokAlert(product)
                });
            }
        } catch (error) {
            console.log(`[cronStockAlert] Error when get product data for cron. Error: ${error.message}`)
        }
    }
}

module.exports = ProductService;
