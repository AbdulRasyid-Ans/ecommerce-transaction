const {
    transaction: transactionModel,
    product: productModel,
    Sequelize,
    sequelize,
} = require('../models/index');
const misc = require('../helper/misc');

class TransactionService {
    /**
     * List Transactions
     * @param {string} [orderBy='id'] order by column name
     * @param {'ASC'|'DESC'} [orderType='ASC'] order type
     * @param {string} [search] filter by name
     * @param {boolean} [isPagination=true] enable/disable pagination
     * @param {number} [page=1] page number if pagination is enabled
     * @param {number} [row=10] rows per page if pagination is enabled
     * @returns {Array} list of Transactions
     */
    static async getList(orderBy = 'id', orderType = 'ASC', search, isPagination = true, page = 1, row = 10) {
        const transactionAttributes = [
            'id',
            'user_id',
            'product_id',
            'quantity',
            'created_at',
        ];

        if (!misc.enumValidation(orderBy, transactionAttributes)) {
            // eslint-disable-next-line no-param-reassign
            orderBy = 'id';
        }
        if (!misc.enumValidation(orderType.toUpperCase(), ['ASC', 'DESC'])) {
            // eslint-disable-next-line no-param-reassign
            orderType = 'ASC';
        }

        const option = {
            attributes: transactionAttributes,
            order: [[orderBy, orderType]],
            where: {},
        };

        if (search) {
            Object.assign(option.where, {
                name: {
                    [Sequelize.Op.iLike]: `%${search}%`,
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

        return transactionModel.findAndCountAll(option);
    }

    static async createTransaction(userId, productId, quantity) {
        const trx = await sequelize.transaction(async (t) => {
            const product = await productModel.findByPk(productId, {
                transaction: t,
                lock: true,
            })

            if (!product) {
                throw new Error('Product not found')
            }
            if (product.stock < quantity) {
                throw new Error('Not enough stock')
            }

            product.stock -= quantity;

            await product.save({
                transaction: t,
            });

            await misc.removeFromRedis('product', productId);

            const transaction = await transactionModel.create({
                user_id: userId,
                product_id: productId,
                quantity,
            }, {
                transaction: t,
            });

            return transaction;
        })

        return trx;
    }
}

module.exports = TransactionService;
