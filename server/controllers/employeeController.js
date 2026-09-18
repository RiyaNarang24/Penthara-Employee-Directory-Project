const Employee=require("../models/Employee");



// Function to get employees with pagination and search
const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
            { department: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const employees = await Employee.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalEmployees = await Employee.countDocuments(searchFilter);

    res.status(200).json({
      employees,
      totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
    });
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