const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verifyRoles = require ('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');


router.route('/')
.get(employeesController.getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor) ,employeesController.createNewEmployees  )
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor) ,employeesController.updateEmployees)
.delete(verifyRoles(ROLES_LIST.Admin) ,employeesController.deleteEmployees)

router.route('/:id')
.get(employeesController.getEmployee);


module.exports = router;