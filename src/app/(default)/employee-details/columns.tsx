"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ActivateEmployeeDialogBox from "../components/dialogbox/ActivateEmployeeDialogBox";
import DeactivateEmployeeDialogBox from "../components/dialogbox/DeactivateEmployeeDialodBox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EmployeeDetails = {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
};

export const createColumns = ({
  isActivateOpen,
  setIsActivateOpen,
  isDeactivateOpen,
  setIsDeactivateOpen,
  employeeId,
  setEmployeeId,
  employeeEmail,
  setEmployeeEmail,
}: {
  isActivateOpen: boolean;
  setIsActivateOpen: (open: boolean) => void;
  isDeactivateOpen: boolean;
  setIsDeactivateOpen: (open: boolean) => void;
  employeeId: string;
  setEmployeeId: (id: string) => void;
  employeeEmail: string;
  setEmployeeEmail: (email: string) => void;
}): ColumnDef<EmployeeDetails>[] => [
  {
    accessorKey: "email",
    header: "Employee Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsActivateOpen(true);
                  setEmployeeId(employee._id);
                  setEmployeeEmail(employee.email);
                }}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDeactivateOpen(true);
                  setEmployeeId(employee._id);
                  setEmployeeEmail(employee.email);
                }}
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ActivateEmployeeDialogBox
            isActivateOpen={isActivateOpen}
            setIsActivateOpen={setIsActivateOpen}
            employeeId={employeeId}
            employeeEmail={employeeEmail}
          />

          <DeactivateEmployeeDialogBox
            isDeactivateOpen={isDeactivateOpen}
            setIsDeactivateOpen={setIsDeactivateOpen}
            employeeId={employeeId}
            employeeEmail={employeeEmail}
          />
        </>
      );
    },
  },
];
