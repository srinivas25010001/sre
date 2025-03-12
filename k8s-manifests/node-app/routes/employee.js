const employees = require("../controllers/employee");
const routes = require("express").Router();

routes.post("/addEmployee", employees.addEmployee);
routes.post("/findEmployees", employees.getEmployee);
routes.post("/findEmployeeById", employees.getEmployeeById);
routes.put("/updateEmployee", employees.updateEmployee);
routes.delete("/deleteEmployee", employees.deleteEmployee);


module.exports = routes;
