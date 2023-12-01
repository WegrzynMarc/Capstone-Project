const dbConnection = require('../../database/mySQLconnect');

const allMessages = async (ctx) => {
    console.log('messages all messages called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            messages
                        ORDER BY messageID
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MessageController::allMessages", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMessages.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const messageWithEmployeeID = (ctx) => {
        return new Promise((resolve, reject) => {
            /*
            const query = `
                       SELECT *
                        FROM 
                            messages
                        WHERE 
                            senderID = ?
                            OR
                            receiverID = ?
                        ORDER BY date
                        `;
            */
           const query = `
                        SELECT 
                            firstName, 
                            lastName, 
                            senderID, 
                            receiverID,
                            date,
                            message,
                            messageID,
                            hours 
                        FROM 
                            employee E, 
                            messages M 
                        WHERE 
                            (E.employeeID = M.senderID OR E.employeeID = ReceiverID) 
                        AND
                            (? = M.senderID OR ? = M.receiverID)
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.employeeID, ctx.params.employeeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MessageController::messageWithMessageID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in messageWithMessageID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const messagesUpdate = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                    UPDATE 
                       messages 
                    SET 
                       senderID = ?,
                       message = ?,
                       hours = 0
                    WHERE  
                        messageID = ?
                    `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.employeeID, ctx.params.message, ctx.params.messageID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MessageController::messagesUpdate", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                
            });
        }).catch(err => {
            console.log("Database connection error in messagesUpdate.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const messagesReceived = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            messages
                        WHERE 
                            receiverID = ?
                        ORDER BY messageID
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.receiverID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MessageController::messagesReceived", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in messagesReceived.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const addMessage = (ctx) => {
    console.log('message add message called.');
    return new Promise((resolve, reject) => {
        const query = `
                       INSERT 
                       INTO 
                       messages 
                       (messageID, senderID, receiverID, message) 
                       VALUES 
                       (?, ?, ?, ?)
                       `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.messageID, ctx.params.senderID, ctx.params.receiverID, ctx.params.message]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MessageController::addMessage", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addMessage.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
      allMessages,
      messageWithEmployeeID,
      messagesUpdate,
      messagesReceived
}