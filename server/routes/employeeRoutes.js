const express=require("express");
const protect = require("../middleware/authMiddleware");
const{
    getEmployees,createEmployee,updateEmployee,deleteEmployee,
}=require("../controllers/employeeController");
const router=express.Router();
router.get("/",getEmployees);
router.post("/", protect, createEmployee);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);
module.exports=router;