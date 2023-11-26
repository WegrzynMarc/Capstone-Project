const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const allEmployees = async (ctx) => {
    console.log('employee all employees called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            employee
                        ORDER BY employeeID
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::allEmployees", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allEmployees.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const employeeWithID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            employee e
                        WHERE
                            e.employeeID = ?
                        ORDER BY employeeID
                        `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::employeeWithID", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in employeeWithID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const hireEmployee = async (ctx) => {
    console.log('employee hire employee called.');
    return new Promise((resolve, reject) => {
        const query = `
                       INSERT 
                       INTO 
                       employee 
                       (employeeID, firstName, lastName, employeeAddress, phoneNumber, startDate, endDate, isSalaried, salary, hourlyWage, hoursWTD, paid_hours, unpaid_hours, isManager, PTO, clockedIn, timeClockedIn, timeClockedOut) 
                       VALUES 
                       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                       `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.employeeID, ctx.params.firstName, ctx.params.lastName, ctx.params.employeeAddress, ctx.params.phoneNumber, ctx.params.startDate, ctx.params.endDate, ctx.params.isSalaried, ctx.params.salary, ctx.params.hourlyWage, ctx.params.hoursWTD, ctx.params.paid_hours, ctx.params.unpaid_hours, ctx.params.isManager, ctx.params.PTO, ctx.params.clockedIn, ctx.params.timeClockedIn, ctx.params.timeClockedOut]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::hireEmployee", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in hireEmployee.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const updateTotalHours = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE employee
                        SET hoursWTD = ?
                        WHERE employeeID = ?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.hoursWTD, ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::updateTotalHours", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in updateTotalHours.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const updatePaidHours = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE employee
                        SET paid_hours = ?
                        WHERE employeeID = ?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.paid_hours, ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::updatePaidHours", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in updatePaidHours.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const updateUnpaidHours = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE employee
                        SET unpaid_hours = ?
                        WHERE employeeID = ?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.unpaid_hours, ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::updateUnpaidHours", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in updateUnpaidHours.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const updateManager = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE employee
                        SET isManager = ?
                        WHERE employeeID = ?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.isManager, ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::updateManager", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in updateManager.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const updateAddress = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                        UPDATE employee
                        SET employeeAddress = ?
                        WHERE employeeID = ?`;
        dbConnection.query({
            sql: query,
            values: [ctx.params.employeeAddress, ctx.params.employeeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeeController::updateAddress", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in updateAddress.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

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
    allEmployees,
    employeeWithID,
    hireEmployee,
    updateTotalHours,
    updatePaidHours,
    updateUnpaidHours,
    updateManager,
    updateAddress,
    clockIn,
    clockOut,
    getStatus
}
