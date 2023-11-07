const dbConnection = require('../../database/mySQLconnect');

// Check a specific employee's schedule

const employeeSchedule = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            schedule
                        WHERE 
                            employeeID = ?
                        ORDER BY employeeID
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.employeeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SchedulesController::employeeSchedule", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in employeeSchedule.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}


module.exports = {
    employeeSchedule
}
