import allEmployees from './Controllers/EmployeeController';
import employeeWithID from './Controllers/EmployeeController';
const scheduleRouter = require('./schedule');

const employeeRouter = require('koa-router')({
    
});

employeeRouter.get('/employee', allEmployees);
employeeRouter.get('/employee/:employeeID', allEmployees);

employeeRouter.use(
  scheduleRouter.routes()
);

module.exports = employeeRouter;
