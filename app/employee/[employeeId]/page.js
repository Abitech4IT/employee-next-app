"use client";

import { useEmployee } from "@/app/_context/EmplyeesContext";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Page({ params }) {
  const { getEmployee, currentEmployee, updateEmployee } = useEmployee();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    mobile: "",
  });

  useEffect(
    function () {
      if (currentEmployee) {
        setFormData({
          firstName: currentEmployee.firstName || "",
          lastName: currentEmployee.lastName || "",
          email: currentEmployee.email || "",
          address: currentEmployee.address || "",
          gender: currentEmployee.gender || "",
          mobile: currentEmployee.mobile || "",
        });
      }
    },
    [currentEmployee]
  );

  useEffect(() => {
    if (params.employeeId) {
      getEmployee(params.employeeId);
    }
  }, [params.employeeId, getEmployee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventdefault();

    try {
      const newUpdatedEmployee = {
        firstName,
        lastName,
        email,
        address,
        gender,
        mobile,
      };
      const result = updateEmployee(params.employeeId, newUpdatedEmployee).then(
        (data) => {
          toast.success("Update Employee successfully");
          console.log(data);
        }
      );
      result.catch((err) => {
        const errors = err.data.errors;
        toast.error("Update failed:", errors);
        console.log(errors);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="my-[90px]">
      <CardBody className="my-5 py-7">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              type="text"
              label="First Name"
              name="firstName"
              placeholder="Enter your first Name"
              value={formData.firstName}
              onChange={handleInputChange}
              isRequired
              className="my-3"
            />
          </div>

          <div>
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              placeholder="Enter your last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              isRequired
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              isRequired
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Address"
              placeholder="Enter your Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              isRequired
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Mobile"
              placeholder="Enter your Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              isRequired
              className="my-3"
            />
          </div>
          <div>
            <Select
              label="Gender"
              placeholder="Select your gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="my-3"
              isRequired
            >
              <SelectItem>Male</SelectItem>
              <SelectItem>Female</SelectItem>
            </Select>
          </div>
          <div>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
