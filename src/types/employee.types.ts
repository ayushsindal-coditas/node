import { EmployeeStatus } from "@prisma/client";

export interface CreateEmployeeInput {
  name: string;
  designation: string;
  skills: string[];
  status?: EmployeeStatus;
}

export interface UpdateEmployeeInput {
  name?: string;
  designation?: string;
  skills?: string[];
  status?: EmployeeStatus;
}

export interface EmployeeListQuery {
  search?: string;
  status?: EmployeeStatus;
}
