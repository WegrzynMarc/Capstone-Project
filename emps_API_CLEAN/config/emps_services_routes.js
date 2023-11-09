const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_firstName/:user_lastName', LoginController.authorizeUser, (err) => console.log("emps_services_routes.js: login-route error:", err));

const EmployeeController = require('../app/Controllers/EmployeeController.js');
const employeeRouter = require('koa-router')({
    prefix: '/employee'
})


const MessageController = require ('../app/Controllers/MessageController.js');
const messageRouter = require('koa-router')({
    prefix: '/message'
})
messageRouter.get('/:employeeID', MessageController.messageWithEmployeeID, (err) => console.log("emps_services_routes.js: message-route error:", err))

// Routes router configuration.

/*
const RoutesController = require('../app/Controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);
*/

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    employeeRouter.routes(),
    messageRouter.routes()
    //routesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
