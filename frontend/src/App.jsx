import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetExpenses, useCreateExpense, useUpdateExpense, useDeleteExpense } from "./features/expenses/hooks/useExpenses";
import ExpenseSummary from "./features/expenses/components/ExpenseSummary";
import ExpenseForm from "./features/expenses/components/ExpenseForm";
import ExpenseList from "./features/expenses/components/ExpenseList";
import { Wallet, Sparkles, Sun, Moon } from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ExpenseTrackerApp() {
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Initialize theme from localStorage or system preferences
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  // Keep HTML data-theme in sync with state
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const { data: expenses = [], isLoading, isError } = useGetExpenses();
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const handleFormSubmit = async (expenseData) => {
    try {
      if (expenseToEdit) {
        await updateExpenseMutation.mutateAsync(expenseData);
        setExpenseToEdit(null);
      } else {
        await createExpenseMutation.mutateAsync(expenseData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    // Scroll to form on small screens
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      try {
        await deleteExpenseMutation.mutateAsync(id);
        if (expenseToEdit && expenseToEdit.id === id) {
          setExpenseToEdit(null);
        }
      } catch (err) {
        console.error("Error deleting expense:", err);
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-[960px] mx-auto theme-transition">
      {/* Header */}
      <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="rounded-2xl bg-[var(--accent-color)]/10 p-2.5 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
              <Wallet size={26} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              Expense Tracker
              <Sparkles className="text-[var(--accent-color)] animate-pulse" size={18} />
            </h1>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">
            Kelola pengeluaran harian Anda dengan mudah, rapi, dan cepat.
          </p>
        </div>
        
        {/* Actions (Toggle Theme + Connection Status) */}
        <div className="flex items-center justify-center md:justify-end gap-3">
          {/* Light/Dark Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-color)] shadow-[0_2px_6px_var(--shadow-color)] active:scale-95 transition-all duration-200"
            title={theme === "light" ? "Aktifkan Mode Gelap" : "Aktifkan Mode Terang"}
          >
            {theme === "light" ? (
              <Moon size={18} strokeWidth={2.2} className="text-[#6B7280]" />
            ) : (
              <Sun size={18} strokeWidth={2.2} className="text-[#FFCC00]" />
            )}
          </button>

          <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] shadow-[0_2px_6px_var(--shadow-color)]">
            <span className="h-2 w-2 rounded-full bg-[var(--success-color)] animate-ping"></span>
            Koneksi API Aktif
          </span>
        </div>
      </header>

      {/* Summary Stats */}
      <ExpenseSummary expenses={expenses} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Form */}
        <div className="lg:col-span-1 space-y-6">
          <ExpenseForm
            onSubmit={handleFormSubmit}
            expenseToEdit={expenseToEdit}
            onCancel={expenseToEdit ? () => setExpenseToEdit(null) : null}
            isPending={createExpenseMutation.isPending || updateExpenseMutation.isPending}
          />
        </div>

        {/* Right Side: List */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[24px] p-6 shadow-[0_2px_8px_var(--shadow-color)] theme-transition">
          {isError ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-[var(--danger-color)]/5 border border-[var(--danger-color)]/10 rounded-[24px] text-[var(--danger-color)]">
              <p className="font-bold mb-2">Gagal memuat data dari server</p>
              <p className="text-xs text-[var(--text-secondary)] max-w-md">
                Pastikan backend Express Anda sudah berjalan di port 3000 (`http://localhost:3000`) dan coba segarkan halaman.
              </p>
            </div>
          ) : (
            <ExpenseList
              expenses={expenses}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isMutating={createExpenseMutation.isPending || updateExpenseMutation.isPending || deleteExpenseMutation.isPending}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-6">
        <p>© 2026 Expense Tracker Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExpenseTrackerApp />
    </QueryClientProvider>
  );
}
