import axiosInstance from "../../../api/axiosInstance";

export const expenseService = {
  getExpenses: async () => {
    const response = await axiosInstance.get("/expenses");
    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await axiosInstance.post("/expenses", expenseData);
    return response.data;
  },

  updateExpense: async ({ id, ...expenseData }) => {
    const response = await axiosInstance.patch(`/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await axiosInstance.delete(`/expenses/${id}`);
    return response.data;
  },
};
