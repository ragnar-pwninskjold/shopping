exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/shopping-list' :
                            'mongodb://localhost/shopping-list-dev') ||
                       (process.env.NODE_ENV === 'test' ?
                       	'mongodb://localhost/shopping-list' :
                       	'mongodb://<ragnar_p>:<oreos272727>@ds017896.mlab.com:17896/mongo-test');
exports.PORT = process.env.PORT || 8080;