import { Employee } from "@prisma/client";
import { prisma } from "../config/db";
import { ApiError } from "../utils/ApiError";
import { formatEmployeeCode } from "../utils/formatEmployeeCode";
import { CreateEmployeeInput, EmployeeListQuery, UpdateEmployeeInput } from "../types/employee.types";

const withEmployeeCode = (employee: Employee) => ({
  ...employee,
  employeeCode: formatEmployeeCode(employee.id),
});

export async function getAllEmployees(query: EmployeeListQuery) {
  const { search, status } = query;

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { designation: { contains: search, mode: "insensitive" as const } },
            { skills: { hasSome: [search] } },
          ],
        }
      : {}),
  };

  const [employees, total, active] = await Promise.all([
    prisma.employee.findMany({ where, orderBy: { id: "asc" } }),
    prisma.employee.count(),
    prisma.employee.count({ where: { status: "ACTIVE" } }),
  ]);

  return {
    employees: employees.map(withEmployeeCode),
    meta: { total, active },
  };
}

export async function getEmployeeById(id: number) {
  const employee = await prisma.employee.findUnique({ where: { id } });

  if (!employee) {
    throw new ApiError(404, `No employee found with id ${id}`);
  }

  return withEmployeeCode(employee);
}

export async function createEmployee(input: CreateEmployeeInput) {
  const employee = await prisma.employee.create({
    data: {
      name: input.name,
      designation: input.designation,
      skills: input.skills,
      status: input.status ?? "ACTIVE",
    },
  });

  return withEmployeeCode(employee);
}

export async function updateEmployee(id: number, input: UpdateEmployeeInput) {
  await getEmployeeById(id); // throws 404 if it doesn't exist, before attempting the update

  const employee = await prisma.employee.update({
    where: { id },
    data: input,
  });

  return withEmployeeCode(employee);
}

export async function deleteEmployee(id: number) {
  await getEmployeeById(id); // throws 404 if it doesn't exist, before attempting the delete

  await prisma.employee.delete({ where: { id } });
}
