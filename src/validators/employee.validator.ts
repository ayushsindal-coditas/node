import { body, param } from "express-validator";

const STATUS_VALUES = ["ACTIVE", "ON_LEAVE", "INACTIVE"];

export const createEmployeeRules = [
  body("name").trim().notEmpty().withMessage("name is required").isLength({ max: 120 }),
  body("designation").trim().notEmpty().withMessage("designation is required").isLength({ max: 120 }),
  body("skills")
    .isArray({ min: 1 })
    .withMessage("skills must be a non-empty array of strings")
    .custom((skills: unknown[]) => skills.every((skill) => typeof skill === "string" && skill.trim().length > 0))
    .withMessage("every skill must be a non-empty string"),
  body("status").optional().isIn(STATUS_VALUES).withMessage(`status must be one of: ${STATUS_VALUES.join(", ")}`),
];

export const updateEmployeeRules = [
  body("name").optional().trim().notEmpty().withMessage("name cannot be empty").isLength({ max: 120 }),
  body("designation").optional().trim().notEmpty().withMessage("designation cannot be empty").isLength({ max: 120 }),
  body("skills")
    .optional()
    .isArray({ min: 1 })
    .withMessage("skills must be a non-empty array of strings")
    .custom((skills: unknown[]) => skills.every((skill) => typeof skill === "string" && skill.trim().length > 0))
    .withMessage("every skill must be a non-empty string"),
  body("status").optional().isIn(STATUS_VALUES).withMessage(`status must be one of: ${STATUS_VALUES.join(", ")}`),
];

export const idParamRule = [param("id").isInt({ min: 1 }).withMessage("id must be a positive integer")];
