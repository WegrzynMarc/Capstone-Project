const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const clockIn = async (ctx) => {
    try {
        let query = "UPDATE employee SET clockedIn = 1 WHERE employeeID = ?";
        const results = await dbConnection.query({
            sql: query,
            values: [ctx.params.employeeID]
        });

        if (results.affectedRows > 0) {
            ctx.status = 200;
            ctx.body = {
                status: "OK",
                employeeID: ctx.params.employeeID,
            };
        } else {
            ctx.status = 404; // User not found
            ctx.body = {
                status: "Failed",
                error: "No such user."
            };
        }
    } catch (err) {
        console.log('Clock in operation threw an exception. Reason...', err);
        ctx.status = 500; // Internal server error
        ctx.body = {
            status: "Failed",
            error: err.message,
        };
    }
};

module.exports = {
    clockIn
};

