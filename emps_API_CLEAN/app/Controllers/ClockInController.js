const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const clockIn = async (ctx) => {
    console.log(`In Clockin ${JSON.stringify(ctx.request.body)}`)
    try {
        let query = `UPDATE employee SET clockedIn = 1 WHERE employeeID = ?`;
        const results = await dbConnection.query({
            sql: query,
            values: [ctx.request.body.employeeID]
        });
        console.log(`BO2O! ${results.values}`)

        if (results.values != null) {
            ctx.status = 200;
            ctx.body = {
                status: "OK",
                employeeID: results.values,
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
            status: "Failed in Controller",
            error: err.message,
        };
    }
};


const clockOut = async (ctx) => {
    console.log(`In ClockOut ${JSON.stringify(ctx.request.body)}`)
    try {
        let query = `UPDATE employee SET clockedIn = 0 WHERE employeeID = ?`;
        const results = await dbConnection.query({
            sql: query,
            values: [ctx.request.body.employeeID]
        });
        console.log(`BO2O! ${results.values}`)

        if (results.values != null) {
            ctx.status = 200;
            ctx.body = {
                status: "OK",
                employeeID: results.values,
            };
        } else {
            ctx.status = 404; // User not found

            ctx.body = {
                status: "Failed",
                error: "No such user."
            };
        }
    } catch (err) {
        console.log('Clock out operation threw an exception. Reason...', err);
        ctx.status = 500; // Internal server error
        ctx.body = {
            status: "Failed in Controller",
            error: err.message,
        };
    }
};




module.exports = {
    clockIn,
    clockOut
};

