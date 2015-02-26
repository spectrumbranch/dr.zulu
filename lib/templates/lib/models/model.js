module.exports = function(sequelize, DataTypes) {
    var {{name}} = sequelize.define("{{name}}", {
        {{#each fields}}
        {{#if @index}},{{/if}}
            {{name}}: {
                type: DataTypes.{{type.name}}{{#if length}}({{length}}){{/if}}{{#if unsigned}}.UNSIGNED{{/if}}
            }
        {{/each}}
    }, {
        freezeTableName: true
    });
    return {{name}};
};