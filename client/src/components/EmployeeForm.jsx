import {useEffect,useState} from"react";
//form to add ,edit employee

function EmployeeForm({employee, onSubmit,onCancel}){
    const[formData,setFormData]=useState({
        name:"",
        role:"",
        department:"",
    });
    useEffect(()=>{
        if(employee){
            setFormData({
                name:employee.name,
                role:employee.role,
                department:employee.department,
            })
        }
        else{
            setFormData({
                name:"",
                role:"",
                department:"",
            });
        }
    },[employee]);
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((currentData)=>({
            ...currentData,
            [name]:value
        }))
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit(formData);
    };
    const isEditing=Boolean(employee);
    return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-dark)]">
          {isEditing ? "Edit Employee" : "Add Employee"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update the employee details below."
            : "Add a new employee to the directory."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[var(--color-dark)]"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-dark)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-[var(--color-dark)]"
          >
            Role
          </label>

          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-dark)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium text-[var(--color-dark)]"
          >
            Department
          </label>

          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Engineering"
            required
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-dark)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-violet)] hover:shadow-md"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );

}
export default EmployeeForm;