import { validationResult } from "express-validator";
import WorkExperience from "../models/WorkExperience.js";

//Hantera valideringsfel från express-validator
function handleValidation(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.details = errors.array();
    throw error;
  }
}

// Hämta alla arbetserfarenheter (sorterade efter startdatum, nyaste först)
export async function listExperiences(req, res, next) {
  try {
    const items = await WorkExperience.find().sort({ startDate: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Hämta en specifik arbetserfarenhet via ID
export async function getExperience(req, res, next) {
  try {
    const item = await WorkExperience.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Experience not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

//Skapa ny arbetserfarenhet
export async function createExperience(req, res, next) {
  try {
    handleValidation(req);
    const item = await WorkExperience.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// uppdatera befintlig arbetserfarenhet
export async function updateExperience(req, res, next) {
  try {
    handleValidation(req);
    const item = await WorkExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!item) return res.status(404).json({ error: "Experience not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// Ta bort arbetserfarenhet
export async function deleteExperience(req, res, next) {
  try {
    const item = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Experience not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
