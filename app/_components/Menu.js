import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import Link from "next/link";
import { useEmployee } from "../_context/EmplyeesContext";
import toast from "react-hot-toast";

function Menu({ item }) {
  const { deleteEmployee } = useEmployee();

  function handleDelete(id) {
    deleteEmployee(id)
      .then(() => {
        toast.error("employee delete successfully");
        console.log("employee delete successfully");
      })
      .catch((err) => {
        const errors = err.data.errors;
        console.log(errors);
      });
  }

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>
            <Link href={`/employee/${item._id}`}>Edit</Link>
          </DropdownItem>
          <DropdownItem onClick={() => handleDelete(item._id)}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Menu;
