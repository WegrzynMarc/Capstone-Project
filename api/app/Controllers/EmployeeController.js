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
                            employee
                        WHERE
                            employeeID = ?
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

module.exports = {
    allEmployees,
    employeeWithID
}
