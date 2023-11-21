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

//ClockIn router configuration.

const ClockInController = require('../app/Controllers/ClockInController.js');
const clockInRouter = require('koa-router')({
    prefix: '/clock-in'
});

clockInRouter.post('/', ClockInController.clockIn, (err) => {
    console.log("clockIn-route error:", err);
});

const clockOutRouter = require('koa-router')({
    prefix: '/clock-out'
});

clockOutRouter.post('/', ClockInController.clockOut, (err) => {
    console.log("clockOut-route error:", err);

});


//routesRouter.post('/update-route-accounts', Authorize('admin'), RoutesController.updateRouteAccounts);


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
    clockInRouter.routes(),
    clockOutRouter.routes()
    //routesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());

};
