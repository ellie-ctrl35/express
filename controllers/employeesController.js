const { json } = require('express');

const data = {
    employees : require('../data/employees.json'),
    setEmployee: function (data) {
      this.employees = data   
    }
}

const getAllEmployees = (req,res) =>{
    res.json(data.employees);
}

const createNewEmployees = (req,res) =>{
   const newEmployee = {
    id: data.employees[data.employees.length-1].id + 1 || 1,
    firstname:req.body.firstname,
    lastname: req.body.lastname
   }
   if (!newEmployee.firstname|| !newEmployee.lastname) {
    return res.status(400,json({'message':'First and last messages are required'}));
   }
   data.setEmployee([...data.employees, newEmployee]);
   res.status(201).json(data.employees);
}

const updateEmployees = (req,res) =>{
    res.json({
        "firstname":req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteEmployees = (req,res) =>{
    res.json({"id":req.body.id});
}

const getEmployee =(req,res)=>{
    res.json({ "id": req.params.id});
}

module.exports = {getAllEmployees,
createNewEmployees,
updateEmployees,
deleteEmployees,
getEmployee,
}