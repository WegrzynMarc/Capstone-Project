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
loginRouter.get('/:username/:password', LoginController.authorizeUser, (err) => console.log("emps_services_routes.js: login-route error:", err));

const EmployeeController = require('../app/Controllers/EmployeeController.js');
const employeeRouter = require('koa-router')({
    prefix: '/employee'
})

employeeRouter.get('/:employeeID', EmployeeController.employeeUnpaidWithID, (err) => console.log("emps_services_routes.ks: employee-route error:", err))
employeeRouter.put('/set-hours/:employeeID/:newHours', EmployeeController.setTotalHours, (err) => console.log("emps_services_routes.js: employee-route error:", err))


const MessageController = require ('../app/Controllers/MessageController.js');
const messageRouter = require('koa-router')({
    prefix: '/message'
})
messageRouter.get('/:employeeID', MessageController.messageWithEmployeeID, (err) => console.log("emps_services_routes.js: message-route error:", err))
messageRouter.get('/:employeeID/:messageID/:message', MessageController.messagesUpdate, (err) => console.log("emps_services_routes.js: message-route error:", err))
employeeRouter.put('/update-hours/:employeeID/:newHours', EmployeeController.updateTotalHours, (err) => console.log("emps_services_routes.js: employee-route error:", err))

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

const clockInStatusRouter = require('koa-router')({
    prefix: '/status'
});

clockInStatusRouter.get('/:employeeID', ClockInController.getStatus, (err) => {
    console.log("getStatus-route error:", err);
});


const ScheduleController = require('../app/Controllers/ScheduleController.js');
const scheduleRouter = require('koa-router')({
    prefix: '/schedule'
})

scheduleRouter.get('/:employeeID', ScheduleController.employeeSchedule, (err) => {
    console.log("schedule-route error:", err);
})

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
    messageRouter.routes(),
    clockInRouter.routes(),
    clockInStatusRouter.routes(),
    clockOutRouter.routes(),
    scheduleRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
