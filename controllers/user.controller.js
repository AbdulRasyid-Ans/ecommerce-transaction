const UserService = require('../service/user');
const Response = require('../service/util/response');

module.exports = {
    getList: async (req, res) => {
        const response = new Response(res);
        try {
            const {
                page, row, order_by: orderBy, order_type: orderType, pagination = 'true', search,
            } = req.query;
    
            const userData = pagination.toLowerCase() === 'false'
                ? await UserService.getList(orderBy, orderType, search, false)
                : await UserService.getList(orderBy, orderType, search, true, page, row);
    
            return response.contentSuccess(response.statusOk, userData);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    },

    getDetail: async (req, res) => {
        const response = new Response(res);
        try {
            const { userId } = req.params;

            const user = await UserService.getDetail(userId);
            if (!user) {
                return response.contentFail(response.statusNotFound, 'User not found');
            }

            return response.contentSuccess(response.statusOk, user);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    },
};