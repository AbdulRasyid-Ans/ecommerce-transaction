module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', {
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        product_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {},
    });

    transaction.associate = (models) => {
        // association can be define here
        transaction.belongsTo(models.user, {
            foreignKey: 'user_id',
            as: 'users',
        });
        transaction.belongsTo(models.product, {
            foreignKey: 'product_id',
            as: 'products',
        });
    }

    return transaction;
}