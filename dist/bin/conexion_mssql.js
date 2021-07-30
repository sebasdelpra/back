"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql/msnodesqlv8");
//local anda
const config = {
    driver: 'msnodesqlv8',
    user: 'sa',
    password: 'Controlit0%$',
    server: 'localhost',
    database: 'Inventario',
    requestTimeout: 3600000,
    options: {
        trustedConnection: true
    },
    debug: true,
    parseJSON: true
};
const connection = new sql.ConnectionPool(config);
connection.connect();
exports.default = connection;
