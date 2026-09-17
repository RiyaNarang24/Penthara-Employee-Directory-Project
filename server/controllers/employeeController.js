const Employee=require("../models/Employee");
//function to get employees

const getEmployees=async(req,res)=>{
    try{
        const employees=await Employee.find().sort({createdAt:-1});
        res.status(200).json(employees);
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch employees"});
    }
};

//function to create employees

const createEmployee = async (req, res) => {
  try {
    const { name, role, department } = req.body;

    const cleanName = name.trim();
    const cleanRole = role.trim();
    const cleanDepartment = department.trim();

    // Check for an existing employee with the same
    // name, role and department
    const existingEmployee = await Employee.findOne({
      name: { $regex: `^${cleanName}$`, $options: "i" },
      role: { $regex: `^${cleanRole}$`, $options: "i" },
      department: { $regex: `^${cleanDepartment}$`, $options: "i" },
    });

    if (existingEmployee) {
      return res.status(409).json({
        message:
          "An employee with the same name, role and department already exists.",
      });
    }

    const employee = await Employee.create({
      name: cleanName,
      role: cleanRole,
      department: cleanDepartment,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create employee",
    });
  }
};
//function to update employee
const updateEmployee=async(req,res)=>{
    try{
        const{name,role,department}=req.body;
        const employee=await Employee.findByIdAndUpdate(req.params.id,
            {name,role,department},
            {new: true,runValidators:true}
        );
        if(!employee){
            return res.status(404).json({message:"Employee not found"});
        }
        res.status(200).json(employee);
    }
    catch(error){
        res.status(400).json({message:"Failed to update employee"});
    }
};
/* Function to delete an employee */
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete employee",
    });
  }
};
module.exports={
getEmployees,
createEmployee,
updateEmployee,
deleteEmployee,};