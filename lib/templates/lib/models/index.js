var Sequelize = require('sequelize');

var db_config_to_use = '';
switch (process.env.NODE_ENV) {
    case 'test_travis':
        db_config_to_use = '../../config/database.test_travis';
        break;
    case 'test':
        db_config_to_use = '../../config/database.test';
        break;
    case undefined:
    case 'production':
    case 'development':
        db_config_to_use = '../../config/database';
        break;
}
var dbconfig = require(db_config_to_use).config;

var dbname = dbconfig.db;
var dbhostname = dbconfig.hostname;
var dbport = dbconfig.port;
var dbuser = dbconfig.user;
var dbpassword = dbconfig.password;

var sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhostname,
    port: dbport
});

var models = [
    {{models}}
];

models.forEach(function(model) {
    module.exports[model.name] = sequelize.import(__dirname + '/' + model.file);
});

module.exports.init = function(done) {
    (function(model) {
        {{associations}}
        
        //testing config
        var syncConfig = {};
        switch (process.env.NODE_ENV) {
            case 'test_travis':
            case 'test':
                syncConfig = { force: true };
                break;
        }
        //create tables if they don't already exist
        sequelize.sync(syncConfig).success(function() {
            done();
        }).error(function(error) {
            done();
        });
    })(module.exports);
};

module.exports.sequelize = sequelize;
