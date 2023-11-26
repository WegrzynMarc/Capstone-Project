const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

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

const addSchedule = (ctx) {
    console.log('message add message called.');
    return new Promise((resolve, reject) => {
        const query = `
                       INSERT 
                       INTO 
                       schedule 
                       (employeeID, startTime, endTime) 
                       VALUES 
                       (?, ?, ?)
                       `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.employeeID, ctx.params.startTime, ctx.params.endTime]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in SchedulesController::addSchedule", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addSchedule.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    employeeSchedule,
    addSchedule
}
