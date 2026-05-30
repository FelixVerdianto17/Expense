import pool from "../config/db.js";

// =======================================================
// 1. GET /expenses -> Mengambil semua data dari database
// =======================================================
export const getExpenses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses in controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================================================
// 2. POST /expenses -> Membuat data pengeluaran baru
// =======================================================
export const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  // Validasi input wajib
  if (!title || amount === undefined || !category || !date) {
    return res.status(400).json({
      message: "Title, amount, category, and date are required",
    });
  }

  // Validasi tipe data amount
  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount)) {
    return res.status(400).json({
      message: "Amount must be a number",
    });
  }

  // Validasi nilai amount > 0
  if (parsedAmount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  try {
    const queryText = `
      INSERT INTO expenses (title, amount, category, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [title, parsedAmount, category, date];
    const result = await pool.query(queryText, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating expense in controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================================================
// 3. PATCH /expenses/:id -> Mengupdate data expense
// =======================================================
export const updateExpense = async (req, res) => {
  const { id } = req.params; // ID bertipe UUID
  const { title, amount, category, date } = req.body;

  try {
    // Cek apakah data expense ada di database
    const checkQuery = "SELECT * FROM expenses WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    const currentExpense = checkResult.rows[0];

    // Validasi amount jika ada pengiriman modifikasi
    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount)) {
        return res.status(400).json({
          message: "Amount must be a number",
        });
      }
      if (parsedAmount <= 0) {
        return res.status(400).json({
          message: "Amount must be greater than 0",
        });
      }
    }

    // Tentukan data update atau gunakan data yang lama (fallback)
    const updatedTitle = title !== undefined ? title : currentExpense.title;
    const updatedAmount = amount !== undefined ? Number(amount) : currentExpense.amount;
    const updatedCategory = category !== undefined ? category : currentExpense.category;
    const updatedDate = date !== undefined ? date : currentExpense.date;

    const updateQuery = `
      UPDATE expenses 
      SET title = $1, amount = $2, category = $3, date = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    const values = [updatedTitle, updatedAmount, updatedCategory, updatedDate, id];
    const updateResult = await pool.query(updateQuery, values);

    res.status(200).json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error updating expense in controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =======================================================
// 4. DELETE /expenses/:id -> Menghapus data expense
// =======================================================
export const deleteExpense = async (req, res) => {
  const { id } = req.params; // ID bertipe UUID

  try {
    const deleteQuery = "DELETE FROM expenses WHERE id = $1 RETURNING *";
    const result = await pool.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense in controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
