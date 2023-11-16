const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');
const employeeRouter = require('./employee');
const messageRouter = require('./message');

const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});

defaultRouter.get('/', (ctx) => {
    ctx.body = 'Welcome to the EMPS Database'
});

defaultRouter.use(
    employeeRouter.routes()
);

defaultRouter.use(
    messageRouter.routes()
);


// Login router configuration.

const LoginController = require('../Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("draught_services_routes.js: login-route error:", err));

router.use(
    loginRouter.routes()
);


module.exports = function (app) {
    app.use(defaultRouter.routes());
    app.use(defaultRouter.allowedMethods());
};
