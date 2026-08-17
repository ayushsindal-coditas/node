import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import { createEmployeeRules, idParamRule, updateEmployeeRules } from "../validators/employee.validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", idParamRule, validateRequest, employeeController.getEmployeeById);
router.post("/", createEmployeeRules, validateRequest, employeeController.createEmployee);
router.put("/:id", idParamRule, updateEmployeeRules, validateRequest, employeeController.updateEmployee);
router.delete("/:id", idParamRule, validateRequest, employeeController.deleteEmployee);

export default router;
