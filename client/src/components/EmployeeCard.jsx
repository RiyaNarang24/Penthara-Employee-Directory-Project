function EmployeeCard({employee,onEdit,onDelete}){
    const initials=employee.name.split(" ").map((name)=>name[0]).join("").slice(0,2).toUpperCase();
    /*employee card to show name,role,department and edit button*/
    return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)]/20 hover:shadow-lg">
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[var(--color-primary-soft)]/70" />
       <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-sm font-semibold text-[var(--color-primary)]">
            {initials}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[var(--color-heading)]">
              {employee.name}
            </h3>

            <p className="mt-1 truncate text-sm text-[var(--color-text-muted)]">
              {employee.role}
            </p>
          </div>
        </div>
         <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit(employee)}
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-secondary)] transition hover:bg-blue-50 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(employee)}
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-danger)] transition hover:bg-red-50"
          >
           Delete
        </button>
        </div>
      </div>

      <div className="relative z-10 mt-5 border-t border-[var(--color-border)] pt-4">
        <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
         {employee.department}
        </span>
      </div>
    </div>
  );
}
export default EmployeeCard;