module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        stock: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        stock_alert: {
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

    product.associate = (models) => {
        // association can be define here
        product.hasMany(models.transaction, {
            foreignKey: 'product_id',
            as: 'products'
        })
    }

    return product;
}