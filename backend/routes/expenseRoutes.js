import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// GET /expenses -> Mengambil semua data
router.get("/", getExpenses);

// POST /expenses -> Menambahkan data baru
router.post("/", createExpense);

// PATCH /expenses/:id -> Mengupdate data
router.patch("/:id", updateExpense);

// DELETE /expenses/:id -> Menghapus data
router.delete("/:id", deleteExpense);

export default router;