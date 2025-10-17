import { Router } from "express";
import { body, param } from "express-validator";
import {
  listExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experiencesController.js";

const router = Router();

// Validering för MongoDB ObjectId
const idParam = [param("id", "Invalid id").isMongoId()];

// Validering för create/update av arbetserfarenheter
const createOrUpdateValidators = [
  body("company").isString().trim().notEmpty(),
  body("title").isString().trim().notEmpty(),
  body("startDate").isISO8601().toDate(),
  body("endDate").optional().isISO8601().toDate(),
  body("description").isString().trim().notEmpty().isLength({ max: 2000 }),
  body("location").optional().isString().trim(),
];

// CRUD routes
router.get("/", listExperiences);
router.get("/:id", idParam, getExperience);
router.post("/", createOrUpdateValidators, createExperience);
router.put("/:id", [...idParam, ...createOrUpdateValidators], updateExperience);
router.delete("/:id", idParam, deleteExperience);

export default router;
