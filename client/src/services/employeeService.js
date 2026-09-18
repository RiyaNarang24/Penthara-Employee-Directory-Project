const API_URL = import.meta.env.VITE_API_URL;
/* Function to read employees with pagination and search */
export const getEmployees = async (
  page = 1,
  limit = 6,
  search = ""
) => {
  const response = await fetch(
    `${API_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
};

/* Function to create an employee */
export const createEmployee = async (employeeData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Failed to create employee");
}

  return response.json();
};

/* Function to update an employee */
export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
};
/* Function to delete an employee */
export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return response.json();
};