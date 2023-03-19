const sequelize = require('sequelize');
const { user: userModel } = require('../models/index');
const misc = require('../helper/misc');

class UserService {
    /**
     * List Users
     * @param {string} [orderBy='id'] order by column name
     * @param {'ASC'|'DESC'} [orderType='ASC'] order type
     * @param {string} [search] filter by name
     * @param {boolean} [isPagination=true] enable/disable pagination
     * @param {number} [page=1] page number if pagination is enabled
     * @param {number} [row=10] rows per page if pagination is enabled
     * @returns {Array} list of Users
     */
    static async getList(orderBy = 'id', orderType = 'ASC', search, isPagination = true, page = 1, row = 10) {
        const userAttributes = [
            'id',
            'name',
            'created_at',
        ];

        if (!misc.enumValidation(orderBy, userAttributes)) {
            // eslint-disable-next-line no-param-reassign
            orderBy = 'id';
        }
        if (!misc.enumValidation(orderType.toUpperCase(), ['ASC', 'DESC'])) {
            // eslint-disable-next-line no-param-reassign
            orderType = 'ASC';
        }

        const option = {
            attributes: userAttributes,
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

        return userModel.findAndCountAll(option);
    }

    static async getDetail(userId) {
        const redisData = await misc.getFromRedis('user', userId);
        if (redisData) {
            return redisData
        }

        const user = await userModel.findOne({
            where: {
                id: userId,
            }
        })
        if (!user) {
            return null
        }

        await misc.storeToRedis('user', userId, user);

        return user;
    }
}

module.exports = UserService;
