import { useEffect, useState } from "react";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";

import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

// Main component to create state and handle the employee directory
function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Load employees when the page opens
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        setError("Unable to load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  /* Handle form data when adding an employee */
  const handleFormSubmit = async (formData) => {
    try {
      setError("");

      const newEmployee = await createEmployee(formData);

      setEmployees((currentEmployees) => [
        newEmployee,
        ...currentEmployees,
      ]);

      setShowForm(false);
      setEditingEmployee(null);
    } catch (error) {
      setError(error.message);
    }
  };

  /* Select an employee for editing */
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
    setError("");
  };

  /* Handle changes when editing an employee */
  const handleUpdate = async (formData) => {
    try {
      setError("");

      const updatedEmployee = await updateEmployee(
        editingEmployee._id,
        formData
      );

      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee._id === updatedEmployee._id
            ? updatedEmployee
            : employee
        )
      );

      setShowForm(false);
      setEditingEmployee(null);
    } catch (error) {
      setError("Unable to update employee. Please try again.");
    }
  };
  /* Delete an employee */
const handleDelete = async (employee) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${employee.name}?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await deleteEmployee(employee._id);

    setEmployees((currentEmployees) =>
      currentEmployees.filter(
        (currentEmployee) => currentEmployee._id !== employee._id
      )
    );
  } catch (error) {
    setError("Unable to delete employee. Please try again.");
  }
};

  /* Search employees by name, role or department */
  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    return (
      employee.name.toLowerCase().includes(search) ||
      employee.role.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading and primary action */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-dark)] sm:text-4xl">
              Employee Directory
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage and keep track of your organization's employees.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingEmployee(null);
              setShowForm(true);
              setError("");
            }}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-violet)] hover:shadow-md"
          >
            + Add Employee
          </button>
        </div>

        {loading && (
          <p className="mt-8 text-sm text-slate-500">
            Loading employees...
          </p>
        )}

        {error && (
          <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          <p>
            {error}
          </p>
          <button
          type="button"
          onClick={()=>setError("")}
          className="shrink-0 rounded-lg px-2 py-1 text-lg font-medium text-red-400 transition hover:bg-red-100 hover:text-red-600"
          aria-label="Dismiss error">
            x
          </button>
          </div>
        )}

        {!loading  && (
          <div className="mt-8 space-y-6">
            {showForm && (
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={
                  editingEmployee ? handleUpdate : handleFormSubmit
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingEmployee(null);
                }}
              />
            )}

            <SearchBar
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />

            <EmployeeList
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}

            />
          </div>
        )}
      </div>
    </main>
  );
}

export default EmployeeDirectory;