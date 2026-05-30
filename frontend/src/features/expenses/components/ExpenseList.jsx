import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { Filter, Calendar, AlertCircle } from "lucide-react";

export default function ExpenseList({ expenses = [], isLoading, onEdit, onDelete, isMutating = false }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Food", "Transport", "Entertainment", "Bills", "Shopping", "Others"];

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  // Sort by date descending
  const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-36 bg-[var(--border-color)] rounded animate-pulse"></div>
          <div className="h-9 w-32 bg-[var(--border-color)] rounded animate-pulse"></div>
        </div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-between rounded-[18px] p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[var(--input-bg)] w-11 h-11"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-[var(--border-color)] rounded"></div>
                <div className="h-3.5 w-24 bg-[var(--border-color)]/70 rounded"></div>
              </div>
            </div>
            <div className="h-5 w-20 bg-[var(--border-color)] rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Calendar className="text-[var(--accent-color)]" size={20} strokeWidth={2.5} />
          Riwayat Transaksi
        </h3>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter size={14} className="text-[var(--text-secondary)]" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] px-3.5 py-2 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent-color)] focus:ring-4 focus:ring-[var(--accent-color)]/5 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-[var(--text-primary)] bg-[var(--card-bg)]">
                {cat === "All" ? "Semua Kategori" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense Items List */}
      {sortedExpenses.length === 0 ? (
        <div className="bg-[var(--input-bg)]/20 border border-[var(--border-color)] flex flex-col items-center justify-center text-center rounded-[24px] p-10">
          <div className="rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] mb-4 border border-[var(--accent-color)]/20 p-4">
            <AlertCircle size={28} strokeWidth={2.5} />
          </div>
          <h4 className="font-bold text-[var(--text-primary)] mb-1.5 text-base">Tidak ada transaksi ditemukan</h4>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm">
            {selectedCategory === "All"
              ? "Daftar pengeluaran Anda kosong. Silakan tambahkan pengeluaran baru menggunakan form."
              : `Belum ada pengeluaran untuk kategori "${selectedCategory}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {sortedExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
              isPending={isMutating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
