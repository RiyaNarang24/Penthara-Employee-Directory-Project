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
export const createEmployee = async (employeeData, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
  const errorData = await response.json();
  const error = new Error(
    errorData.message || "Failed to create employee"
  );

  error.status = response.status;
  throw error;
}

  return response.json();
};

/* Function to update an employee */
export const updateEmployee = async (id, employeeData, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
  const errorData = await response.json();
  const error = new Error(
    errorData.message || "Failed to update employee"
  );

  error.status = response.status;
  throw error;
}

  return response.json();
};
/* Function to delete an employee */
export const deleteEmployee = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
  const errorData = await response.json();
  const error = new Error(
    errorData.message || "Failed to delete employee"
  );

  error.status = response.status;
  throw error;
}

  return response.json();
};
/* Function to verify the admin secret key */
export const verifyAdminKey = async (secretKey) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL.replace("/employees", "/auth/verify-key")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretKey }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
};