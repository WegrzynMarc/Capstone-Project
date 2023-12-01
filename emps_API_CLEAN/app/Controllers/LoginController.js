const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

const authorizeUser = async (ctx) => {
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided uers_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses. 
            console.log(ctx.params.username);
            console.log(ctx.params.password);
	    
            let query = "SELECT employeeID, firstName, lastName, isManager FROM employee WHERE username = ? AND password = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username, ctx.params.password]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples[0]);
                        //console.log('from studentRecord. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            employeeID: tuples[0].employeeID,
                            permLevel: tuples[0].isManager,
                            firstname: tuples[0].firstName,
                            lastname: tuples[0].lastName
                        };
                    } else {
                        console.log('Not able to identify the user.');
			            return reject('No such user.');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('authorize in LoginController threw an exception. Reason...', err);
	    ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
}

module.exports = {
    authorizeUser,
};
