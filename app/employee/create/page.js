"use client";

import { useEmployee } from "@/app/_context/EmplyeesContext";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import toast from "react-hot-toast";

const genders = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export default function Page() {
  const { createEmployee } = useEmployee();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !address || !gender || !mobile) {
      return;
    }

    try {
      const newEmployee = {
        firstName,
        lastName,
        email,
        address,
        gender,
        mobile,
      };
      const req = createEmployee(newEmployee).then((data) => {
        console.log(data);
        toast.success("Employee created successfully");

        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
        setGender("");
        setMobile("");
      });
      req.catch((err) => {
        const errors = err.data.errors;
        toast.error("Employee creation failed:", errors);
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
              placeholder="Enter your first Name"
              isRequired
              value={firstName}
              onChange={(e) => setFirstName(() => e.target.value)}
              className="my-3"
            />
          </div>

          <div>
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter your last Name"
              isRequired
              value={lastName}
              onChange={(e) => setLastName(() => e.target.value)}
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              isRequired
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Address"
              placeholder="Enter your Address"
              isRequired
              value={address}
              onChange={(e) => setAddress(() => e.target.value)}
              className="my-3"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Mobile"
              placeholder="Enter your Mobile"
              isRequired
              value={mobile}
              onChange={(e) => setMobile(() => e.target.value)}
              className="my-3"
            />
          </div>
          <div>
            <Select
              label="Gender"
              items={genders}
              placeholder="Select your gender"
              className="my-3"
              value={gender}
              onChange={(e) => setGender(() => e.target.value)}
              isRequired
            >
              {/* <SelectItem value="male">Male</SelectItem> */}
              {genders.map((gender) => (
                <SelectItem key={gender.key}>{gender.label}</SelectItem>
              ))}
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
