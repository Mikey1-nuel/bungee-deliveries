// src/utils/batchChecklist.ts
const KEY = (orderId: string) => `batch_checklist_${orderId}`;

export const getChecked = (orderId: string): Set<number> => {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(KEY(orderId));
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

export const saveChecked = (orderId: string, checked: Set<number>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY(orderId), JSON.stringify([...checked]));
};

export const clearChecked = (orderId: string) => {
  localStorage.removeItem(KEY(orderId));
};
