import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useExpense = create(persist(
    (set) => ({

        expenses: [],
        setExpenses: (payload) => set((state) => ({
            expenses: [...state.expenses, payload]

        })),

        deleteExpenses: (id) => set((state) => ({
            expenses: state.expenses.filter(item => item.id !== id)

        })),

        updateExpencess: (id, payload) => set((state) => ({
            expenses: state.expenses.map((item) => {
                return item.id === id ? {...item, ...payload}:item

                

            })
        }))



    }),
    { name: "expenses" }
))