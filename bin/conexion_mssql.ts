const sql = require("mssql/msnodesqlv8");
//local anda
const config = {
    driver: 'msnodesqlv8',
    user: 'sa',
    password: 'Controlit0%$',
    server: 'localhost',
    database: 'Inventario',    
    requestTimeout: 3600000, //en horas
    options: {
        trustedConnection: true
    },
    debug: true,
    parseJSON: true
};

     
const connection = new sql.ConnectionPool(config);
connection.connect();

export default connection;
