const TransactionService = require('../service/transaction');
const UserService = require('../service/user');
const Response = require('../service/util/response');

module.exports = {
    getList: async (req, res) => {
        const response = new Response(res);
        try {
            const {
                page, row, order_by: orderBy, order_type: orderType, pagination = 'true', search,
            } = req.query;
    
            const transactionData = pagination.toLowerCase() === 'false'
                ? await TransactionService.getList(orderBy, orderType, search, false)
                : await TransactionService.getList(orderBy, orderType, search, true, page, row);
    
            return response.contentSuccess(response.statusOk, transactionData);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    },

    create: async (req, res) => {
        const response = new Response(res);
        try {
            const { qty, product_id: productId} = req.body;

            if (qty <= 0) {
                return response.contentFail(response.statusBadRequest, 'qty must greater than 0')
            }

            const userId = req.headers['x-user-id'];
            if (!userId) {
                return response.contentFail(response.statusBadRequest, 'Headers "x-user-id" must be filled')
            }

            const user = await UserService.getDetail(userId);
            if (!user) {
                return response.contentFail(response.statusBadRequest, 'Invalid user id')
            }

            const transaction = await TransactionService.createTransaction(userId, productId, qty);

            return response.contentSuccess(response.statusCreated, transaction);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    }
};