import React from "react";
import { DollarSign, TrendingUp, Tag } from "lucide-react";

export default function ExpenseSummary({ expenses = [] }) {
  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const total = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const count = expenses.length;
  const average = count > 0 ? Math.round(total / count) : 0;

  // Find top category
  const categoryTotals = expenses.reduce((acc, curr) => {
    const amt = Number(curr.amount) || 0;
    acc[curr.category] = (acc[curr.category] || 0) + amt;
    return acc;
  }, {});

  let topCategory = "N/A";
  let topCategoryAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > topCategoryAmount) {
      topCategory = cat;
      topCategoryAmount = amt;
    }
  });

  const cards = [
    {
      title: "Total Pengeluaran",
      value: formatRupiah(total),
      subtitle: `${count} Transaksi`,
      icon: DollarSign,
      iconBg: "bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20",
    },
    {
      title: "Rata-rata / Transaksi",
      value: formatRupiah(average),
      subtitle: "Rata-rata biaya",
      icon: TrendingUp,
      iconBg: "bg-[var(--success-color)]/10 text-[var(--success-color)] border border-[var(--success-color)]/20",
    },
    {
      title: "Kategori Terbesar",
      value: topCategory,
      subtitle: topCategory !== "N/A" ? formatRupiah(topCategoryAmount) : "Belum ada data",
      icon: Tag,
      iconBg: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[24px] p-6 shadow-[0_2px_8px_var(--shadow-color)] transition-all duration-300 hover:shadow-[0_4px_16px_var(--shadow-hover)] hover:-translate-y-0.5 theme-transition"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">{card.title}</span>
              <div className={`rounded-2xl p-3 ${card.iconBg} flex items-center justify-center`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-1.5">{card.value}</h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
