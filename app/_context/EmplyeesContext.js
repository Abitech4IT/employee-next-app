"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EmployeesContext = createContext();
const baseURL = "https://employee-api-3jkj.onrender.com/api/v1/employees";

function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});

  useEffect(function () {
    async function fetchEmployees() {
      try {
        const res = await fetch(baseURL);
        const { data } = await res.json();
        setEmployee(data);
      } catch {
        console.log("There was an error fetching data");
      }
    }
    fetchEmployees();
  }, []);

  async function getEmployee(id) {
    try {
      const res = await fetch(`${baseURL}/${id}`);
      const { data } = await res.json();
      setCurrentEmployee(data)
    } catch (error) {
      console.log("There was an error fetching data");
    }
  }

  async function createEmployee(newEmployee) {
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: { "content-type": "application/json" },
      });
      const { data } = await res.json();
      console.log(data);
    } catch {
      console.log("There was an error fetching data");
    }
  }

  async function updateEmployee(id, updatedData) {
    try {
      const res = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const { data } = await res.json();
      console.log(data);
    } catch {
      console.log("There was an error fetching data");
    }
  }

  async function deleteEmployee(id) {
    try {
      await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      });
    } catch {
      console.log("There was an error fetching data");
    }
  }

  return (
    <EmployeesContext.Provider
      value={{
        employee,
        currentEmployee,
        createEmployee,
        getEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

function useEmployee() {
  const context = useContext(EmployeesContext);
  if (context === undefined)
    throw new Error("EmployeeContext was used outside the EmployeeProvider");
  return context;
}

export { EmployeeProvider, useEmployee };
