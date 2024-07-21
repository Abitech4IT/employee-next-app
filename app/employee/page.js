"use client";

import { Button } from "@nextui-org/button";
import EmployeeTable from "../_components/EmployeeTable";
import LoadingSpinner from "../_components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEmployee } from "../_context/EmplyeesContext";
import { Suspense } from "react";

export default function Page() {
  const { employee } = useEmployee();
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between my-10">
        <h5>Employee</h5>
        <Button color="primary" onClick={() => router.push("/employee/create")}>
          Add Employee
        </Button>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <EmployeeTable employee={employee} />
      </Suspense>
    </>
  );
}
