module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {},
    });

    user.associate = (models) => {
        // association can be define here
        user.hasMany(models.transaction, {
            foreignKey: 'user_id',
            as: 'users'
        })
    }

    return user;
}