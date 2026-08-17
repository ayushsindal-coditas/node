import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import * as employeeService from "../services/employee.service";
import { CreateEmployeeInput, EmployeeListQuery, UpdateEmployeeInput } from "../types/employee.types";

export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as EmployeeListQuery;
  const { employees, meta } = await employeeService.getAllEmployees(query);
  res.json(ApiResponse.success(employees, "Employees fetched successfully", meta));
});

export const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
  const employee = await employeeService.getEmployeeById(Number(req.params.id));
  res.json(ApiResponse.success(employee, "Employee fetched successfully"));
});

export const createEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employee = await employeeService.createEmployee(req.body as CreateEmployeeInput);
  res.status(201).json(ApiResponse.success(employee, "Employee created successfully"));
});

export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employee = await employeeService.updateEmployee(Number(req.params.id), req.body as UpdateEmployeeInput);
  res.json(ApiResponse.success(employee, "Employee updated successfully"));
});

export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
  await employeeService.deleteEmployee(Number(req.params.id));
  res.json(ApiResponse.success(null, "Employee deleted successfully"));
});
