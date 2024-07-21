"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import Menu from "./Menu";

const columns = [
  {
    key: "firstName",
    label: "FIRST NAME",
  },
  {
    key: "lastName",
    label: "LAST NAME",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "address",
    label: "ADDRESS",
  },
  {
    key: "gender",
    label: "GENDER",
  },
  {
    key: "mobile",
    label: "MOBILE",
  },
  {
    key: "action",
    label: "ACTION",
    renderCell: (item) => <Menu item={item} />,
  },
];

export default function EmployeeTable({ employee }) {
  const rows = employee;

  return (
    <Table aria-label="Employees table content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              // <TableCell>{getKeyValue(item, columnKey)}</TableCell>

              <TableCell>
                {columns.find((col) => col.key === columnKey)?.renderCell
                  ? columns
                      .find((col) => col.key === columnKey)
                      ?.renderCell(item)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
