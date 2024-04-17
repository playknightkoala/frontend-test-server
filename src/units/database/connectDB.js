const mariadb = require("mariadb");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error("missing DB env");
}

const dbPool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 5,
});

exports.query = async (sqlStatement, parameter) => {
    let connect = null;

    try {
        connect = await dbPool.getConnection();
        const response = await connect.query(sqlStatement, parameter);
        return { status: true, response };
    } catch (error) {
        return { status: false, response: error };
    } finally {
        if (connect !== null) {
            connect.end();
        }
    }
};
