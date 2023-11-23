const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const clockIn = async (ctx) => {
    //console.log(`In Clockin ${JSON.stringify(ctx.request.body)}`)
    try {
        let query = `UPDATE employee SET clockedIn = 1, timeClockedIn = NOW() WHERE employeeID = ?`;
        const results = await dbConnection.query({
            sql: query,
            values: [ctx.request.body.employeeID]
        });
        //console.log(`BO2O! ${results.values}`)

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
    //console.log(`In ClockOut ${JSON.stringify(ctx.request.body)}`)
    try {
        let query = `UPDATE employee SET clockedIn = 0, timeClockedOut = NOW(), 
                            unpaid_hours = unpaid_hours + cast(time_to_sec(TIMEDIFF(timeClockedOut, timeClockedIn)) / (60 * 60) AS decimal(10, 2)), timeClockedIn = null, timeClockedOut = null WHERE employeeID = ?`;
        const results = await dbConnection.query({
            sql: query,
            values: [ctx.request.body.employeeID]
        });


        //console.log(`BO2O! ${results.values}`)

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


const getStatus = async (ctx) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT clockedIn FROM employee WHERE employeeID = ?`;
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.employeeID]
            }, (error, results) => {
                if (error) {
                    console.error('Query error in getStatus:', error);
                    reject(`Query error. Error msg: ${error.message}`);
                } else if (results.length > 0) {
                    ctx.body = {
                        status: "OK",
                        clockedIn: results[0].clockedIn,
                    };
                    resolve();
                } else {
                    reject('Employee not found.');
                }
            }
        );
    }).catch(err => {
        console.error('getStatus in ClockInController threw an exception. Reason:', err);
        ctx.status = err === 'Employee not found.' ? 404 : 500;
        ctx.body = {
            status: "Failed",
            error: err
        };
    });
};






module.exports = {
    clockIn,
    clockOut,
    getStatus
};

