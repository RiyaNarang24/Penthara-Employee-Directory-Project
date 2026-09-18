import { useEffect, useState } from "react";
import { X } from "lucide-react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";
import SecretKeyModal from "../components/SecretKeyModal";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  verifyAdminKey,
} from "../services/employeeService";

// Main component to create state and handle the employee directory
function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretLoading, setSecretLoading] = useState(false);
  const [secretError, setSecretError] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  // Load employees when the page opens
  useEffect(() => {
  let cancelled = false;

  const loadEmployees = async () => {
    try {
      setError("");

      const data = await getEmployees(currentPage, 6, searchTerm);

      // Ignore the response if a newer request has already started.
      if (cancelled) {
        return;
      }

      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (error) {
      if (cancelled) {
        return;
      }

      setError("Unable to load employees. Please try again.");
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadEmployees();

  return () => {
    cancelled = true;
  };
}, [currentPage, searchTerm]);

/**
 * Verifies the admin secret key before allowing
 * employee management actions.
 */
const handleSecretVerification = async (secretKey) => {
  try {
    setSecretLoading(true);
    setSecretError("");

    const data = await verifyAdminKey(secretKey);

    setAdminToken(data.token);
    setShowSecretModal(false);

    if (pendingAction?.type === "add") {
      setShowForm(true);
    }

    if (pendingAction?.type === "edit") {
      setEditingEmployee(pendingAction.employee);
      setShowForm(true);
    }

    if (pendingAction?.type === "delete") {
      await handleDelete(pendingAction.employee, data.token);
    }

    setPendingAction(null);
  } catch (error) {
    setSecretError(error.message);
  } finally {
    setSecretLoading(false);
  }
};

/**
 * Reopens secret verification when the admin token
 * is missing, invalid, or expired.
 */
const handleAuthenticationExpired = (action) => {
  setAdminToken("");
  setPendingAction(action);
  setSecretError("Your session has expired. Please enter the secret key again.");
  setShowSecretModal(true);
};
  /* Handle form data when adding an employee */
  const handleFormSubmit = async (formData) => {
  try {
    setError("");

    await createEmployee(formData, adminToken);

    const data = await getEmployees(1, 6, searchTerm);

    setEmployees(data.employees);
    setTotalPages(data.totalPages);
    setCurrentPage(1);

    setShowForm(false);
    setEditingEmployee(null);
    } catch (error) {
    if (error.status === 401) {
      handleAuthenticationExpired({ type: "add" });
      return;
    }

    setError(error.message);
  }
};

  /* Select an employee for editing */
  const handleEdit = (employee) => {
  setPendingAction({
    type: "edit",
    employee,
  });

  setSecretError("");
  setShowSecretModal(true);
  setError("");
};

  /* Handle changes when editing an employee */
  const handleUpdate = async (formData) => {
    try {
      setError("");

      const updatedEmployee = await updateEmployee(
       editingEmployee._id,
       formData,
       adminToken
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
    }catch (error) {
  if (error.status === 401) {
    handleAuthenticationExpired({
      type: "edit",
      employee: editingEmployee,
    });
    return;
  }

  setError("Unable to update employee. Please try again.");
}
  };

  /**
 * Opens the secret key verification before deleting an employee.
 */
const handleDeleteRequest = (employee) => {
  setPendingAction({
    type: "delete",
    employee,
  });

  setSecretError("");
  setShowSecretModal(true);
  setError("");
};
/* Delete an employee */
const handleDelete = async (employee, token = adminToken) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${employee.name}?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await deleteEmployee(employee._id, token);

    const data = await getEmployees(currentPage, 6, searchTerm);

    if (data.employees.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
  if (error.status === 401) {
    handleAuthenticationExpired({
      type: "delete",
      employee,
    });
    return;
  }

  setError("Unable to delete employee. Please try again.");
}
};


  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(91,33,182,0.08),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.07),_transparent_30%),var(--color-background)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading and primary action */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl">
              Employee Directory
               </h1>

            <p className="mt-2 text-sm text-[var(--color-text)] sm:text-base">
              Manage and keep track of your organization's employees.
            </p>
            
          </div>

          <button
            type="button"
           onClick={() => {
          setEditingEmployee(null);
          setPendingAction({ type: "add" });
          setSecretError("");
          setShowSecretModal(true);
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
           onClick={() => setError("")}
           className="shrink-0 rounded-lg p-2 text-red-400 transition hover:bg-red-100 hover:text-red-600"
           aria-label="Dismiss error"
           >
          <X className="h-4 w-4" />
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
             onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
             }}
            /> 

            <EmployeeList
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}

            />
            {/* Pagination */}
          {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
           disabled={currentPage === 1}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] transition hover:bg-[var(--color-primary-soft)] disabled:cursor-not-allowed disabled:opacity-50"
           >
           Previous
           </button>

    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
            currentPage === page
              ? "bg-[var(--color-primary)] text-white"
              : "border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]"
          }`}
        >
          {page}
        </button>
      );
    })}

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] transition hover:bg-[var(--color-primary-soft)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
          </div>
        )}
      </div>
      {showSecretModal && (
  <SecretKeyModal
    onVerify={handleSecretVerification}
    onCancel={() => {
  setShowSecretModal(false);
  setSecretError("");
  setPendingAction(null);
}}
    loading={secretLoading}
    error={secretError}
  />
)}
    </main>
  );
}

export default EmployeeDirectory;