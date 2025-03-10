const db = require("../models");
const { resServerError, resDocCreated, resFound, resDocUpdated, resDocDeleted } = require("../utils/response");

const addEmployee = async (req, res) => {
  try {
    let { body } = req;
    let emp = await db.employees.create(body)
    return resDocCreated(res, emp);
    }
    catch (error) {
        return resServerError(res,error)
  }
};

const getEmployee = async(req,res)=>{
    try {
        debugger;
        let emp = await db.employees.findAll({})
        return resFound(res,emp)
    } catch (error) {
        return resServerError(res,error)
    }
}


const getEmployeeById = async(req,res)=>{
    try {
        let emp = await db.employees.findOne({
            where:{
                Id: req.query.Id
            }
        })
        return resFound(res,emp)
    } catch (error) {
        return resServerError(res,error)
    }
}

const updateEmployee = async(req,res)=>{
    try {
        let {body}=req
        let updateEmp = await db.employees.update(body,{
            where:{
                Id:req.query.Id
            }
        })
        return resDocUpdated(res,updateEmp)
    } catch (error) {
        return resServerError(res, error)
    }
}

const deleteEmployee = async(req,res)=>{
    try {
        let deleteEmp = await db.employees.destroy({
            where:{
                Id:req.query.Id
            }
        })
        return resDocDeleted(res,deleteEmp)
    } catch (error) {
        return resServerError(res,error)
    }
}

module.exports={
    addEmployee,
    getEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}