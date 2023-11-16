const dbConnection = require('../../database/mySQLconnect');

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
                       (employeeID, firstName, lastName, employeeAddress, phoneNumber, startDate, endDate, isSalaried, salary, hourlyWage, hoursWTD, paid_hours, unpaid_hours, isManager, PTO) 
                       VALUES 
                       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                       `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.employeeID, ctx.params.firstName, ctx.params.lastName, ctx.params.employeeAddress, ctx.params.phoneNumber, ctx.params.startDate, ctx.params.endDate, ctx.params.isSalaried, ctx.params.salary, ctx.params.hourlyWage, ctx.params.hoursWTD, ctx.params.paid_hours, ctx.params.unpaid_hours, ctx.params.isManager, ctx.params.PTO]
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
                        SET hoursWTD =?
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
                        SET paid_hours =?
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
                        SET unpaid_hours =?
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
                        SET isManager =?
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
                        SET employeeAddress =?
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

module.exports = {
    allEmployees,
    employeeWithID,
    hireEmployee,
    updateTotalHours,
    updatePaidHours,
    updateUnpaidHours,
    updateManager,
    updateAddress
}
