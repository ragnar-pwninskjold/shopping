exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://default:default@ds017896.mlab.com:17896/mongo-test' :
                            'mongodb://localhost/shopping-list-dev');                   
exports.PORT = process.env.PORT || 8080;