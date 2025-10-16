import { Router } from "express";


const router = Router();

// Temporär lista (placeholder)
router.get("/", (req, res) => {
  res.json([]);
});

export default router;
