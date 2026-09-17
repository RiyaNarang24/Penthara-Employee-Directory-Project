import EmployeeCard from "./EmployeeCard";

/* Render the employee cards or show a message when there are no results */
function EmployeeList({ employees, onEdit,onDelete }) {
  // This also handles the case where a search has no matching employees
  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
          <span className="text-lg font-semibold">?</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[var(--color-dark)]">
          No employees found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Try a different search or add a new employee to the directory.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee._id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default EmployeeList;