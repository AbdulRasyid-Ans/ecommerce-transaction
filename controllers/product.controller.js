const ProductService = require('../service/product');
const Response = require('../service/util/response');

module.exports = {
    getList: async (req, res) => {
        const response = new Response(res);
        try {
            const {
                page, row, order_by: orderBy, order_type: orderType, pagination = 'true', search,
            } = req.query;
    
            const productData = pagination.toLowerCase() === 'false'
                ? await ProductService.getList(orderBy, orderType, search, false)
                : await ProductService.getList(orderBy, orderType, search, true, page, row);
    
            return response.contentSuccess(response.statusOk, productData);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    },

    getDetail: async (req, res) => {
        const response = new Response(res);
        try {
            const { productId } = req.params;

            const product = await ProductService.getDetail(productId);
            if (!product) {
                return response.contentFail(response.statusNotFound, 'User not found');
            }

            return response.contentSuccess(response.statusOk, product);
        } catch (error) {
            return response.contentFail(response.statusInternalServerError, error)
        }
    },
};