import React from "react";
import { Edit2, Trash2, Coffee, Car, Film, Receipt, ShoppingBag, Box } from "lucide-react";

export default function ExpenseItem({ expense, onEdit, onDelete, isPending = false }) {
  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("id-ID", options);
  };

  // Get iOS-inspired specific category styles and icons
  const getCategoryDetails = (category) => {
    switch (category) {
      case "Food":
        return {
          icon: Coffee,
          bg: "bg-orange-500/10 border-orange-500/20 text-orange-500",
        };
      case "Transport":
        return {
          icon: Car,
          bg: "bg-blue-500/10 border-blue-500/20 text-[var(--accent-color)]",
        };
      case "Entertainment":
        return {
          icon: Film,
          bg: "bg-purple-500/10 border-purple-500/20 text-purple-500",
        };
      case "Bills":
        return {
          icon: Receipt,
          bg: "bg-red-500/10 border-red-500/20 text-[var(--danger-color)]",
        };
      case "Shopping":
        return {
          icon: ShoppingBag,
          bg: "bg-pink-500/10 border-pink-500/20 text-pink-500",
        };
      default:
        return {
          icon: Box,
          bg: "bg-emerald-500/10 border-emerald-500/20 text-[var(--success-color)]",
        };
    }
  };

  const { icon: CategoryIcon, bg: categoryClass } = getCategoryDetails(expense.category);

  return (
    <div className="group flex items-center justify-between rounded-2xl p-4 bg-[var(--card-bg)] border border-[var(--border-color)] hover:shadow-[0_2px_8px_var(--shadow-color)] hover:bg-[var(--input-bg)]/20 transition-all duration-200 theme-transition">
      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div className={`rounded-2xl border p-3 ${categoryClass} transition-transform duration-200 group-hover:scale-105`}>
          <CategoryIcon size={20} strokeWidth={2.5} />
        </div>

        {/* Expense Info */}
        <div>
          <h4 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors text-sm sm:text-base">
            {expense.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${categoryClass}`}>
              {expense.category}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              {formatDate(expense.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Amount and Actions */}
      <div className="flex items-center gap-4">
        <span className="font-extrabold text-[var(--text-primary)] text-sm sm:text-base">
          {formatRupiah(expense.amount)}
        </span>
        
        <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(expense)}
            disabled={isPending}
            title="Edit Transaksi"
            className="rounded-xl bg-[var(--card-bg)] hover:bg-[var(--input-bg)] p-2.5 text-[var(--text-secondary)] hover:text-[var(--accent-color)] border border-[var(--border-color)] shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Edit2 size={13} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            disabled={isPending}
            title="Hapus Transaksi"
            className="rounded-xl bg-[var(--card-bg)] hover:bg-[var(--danger-color)]/10 p-2.5 text-[var(--text-secondary)] hover:text-[var(--danger-color)] border border-[var(--border-color)] shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
