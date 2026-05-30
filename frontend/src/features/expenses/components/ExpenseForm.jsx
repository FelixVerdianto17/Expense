import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Save, X, Calendar, Tag, DollarSign, FileText } from "lucide-react";

export default function ExpenseForm({ onSubmit, expenseToEdit = null, onCancel = null, isPending = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (expenseToEdit) {
      reset({
        title: expenseToEdit.title,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: expenseToEdit.date,
      });
    } else {
      reset({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [expenseToEdit, reset]);

  const onFormSubmit = async (data) => {
    const formattedData = {
      ...data,
      amount: Number(data.amount),
    };
    if (expenseToEdit) {
      await onSubmit({ id: expenseToEdit.id, ...formattedData });
    } else {
      await onSubmit(formattedData);
    }
    if (!expenseToEdit) {
      reset({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Others"];

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[24px] p-6 shadow-[0_2px_8px_var(--shadow-color)] transition-all duration-300 theme-transition">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          {expenseToEdit ? (
            <>
              <Save className="text-[var(--accent-color)]" size={20} strokeWidth={2.5} />
              Edit Pengeluaran
            </>
          ) : (
            <>
              <PlusCircle className="text-[var(--accent-color)]" size={20} strokeWidth={2.5} />
              Tambah Transaksi
            </>
          )}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            type="button"
            className="rounded-full bg-[var(--input-bg)] hover:opacity-80 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText size={13} /> Judul Pengeluaran
          </label>
          <input
            type="text"
            placeholder="Contoh: Kopi Susu, Bensin, Listrik"
            {...register("title", { required: "Judul wajib diisi" })}
            className={`w-full rounded-2xl bg-[var(--input-bg)] border ${
              errors.title ? "border-[var(--danger-color)] focus:ring-[var(--danger-color)]/10" : "border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]/10"
            } px-4 py-3.5 text-[var(--text-primary)] placeholder-gray-400 outline-none focus:ring-4 transition-all text-sm`}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-[var(--danger-color)] font-semibold">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <DollarSign size={13} /> Jumlah (IDR)
            </label>
            <input
              type="number"
              placeholder="Contoh: 25000"
              {...register("amount", {
                required: "Jumlah wajib diisi",
                min: { value: 1, message: "Jumlah harus lebih besar dari 0" },
                valueAsNumber: true,
              })}
              className={`w-full rounded-2xl bg-[var(--input-bg)] border ${
                errors.amount ? "border-[var(--danger-color)] focus:ring-[var(--danger-color)]/10" : "border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]/10"
              } px-4 py-3.5 text-[var(--text-primary)] placeholder-gray-400 outline-none focus:ring-4 transition-all text-sm`}
            />
            {errors.amount && (
              <p className="mt-1.5 text-xs text-[var(--danger-color)] font-semibold">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag size={13} /> Kategori
            </label>
            <select
              {...register("category", { required: "Kategori wajib dipilih" })}
              className={`w-full rounded-2xl bg-[var(--input-bg)] border ${
                errors.category ? "border-[var(--danger-color)] focus:ring-[var(--danger-color)]/10" : "border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]/10"
              } px-4 py-3.5 text-[var(--text-primary)] outline-none focus:ring-4 transition-all text-sm`}
            >
              <option value="" disabled className="text-gray-400">
                Pilih Kategori
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-[var(--text-primary)] bg-[var(--card-bg)]">
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1.5 text-xs text-[var(--danger-color)] font-semibold">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar size={13} /> Tanggal
          </label>
          <input
            type="date"
            {...register("date", { required: "Tanggal wajib diisi" })}
            className={`w-full rounded-2xl bg-[var(--input-bg)] border ${
              errors.date ? "border-[var(--danger-color)] focus:ring-[var(--danger-color)]/10" : "border-[var(--border-color)] focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]/10"
            } px-4 py-3.5 text-[var(--text-primary)] outline-none focus:ring-4 transition-all text-sm`}
          />
          {errors.date && (
            <p className="mt-1.5 text-xs text-[var(--danger-color)] font-semibold">{errors.date.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {expenseToEdit && onCancel && (
            <button
              onClick={onCancel}
              type="button"
              disabled={isSubmitting || isPending}
              className="flex-1 rounded-2xl bg-[var(--input-bg)] hover:opacity-85 py-3.5 text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="flex-[2] rounded-2xl bg-[var(--accent-color)] hover:opacity-90 py-3.5 text-center text-sm font-semibold text-white shadow-md active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {expenseToEdit ? (
              <>
                <Save size={16} strokeWidth={2.5} /> Simpan
              </>
            ) : (
              <>
                <PlusCircle size={16} strokeWidth={2.5} /> Tambah Transaksi
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
