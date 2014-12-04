module.exports = function(sequelize, DataTypes) {
    var {{model.name}} = sequelize.define("{{model.name}}", {
        {{model.fields}}
    }, {
        freezeTableName: true
    });
    return {{model.name}};
};