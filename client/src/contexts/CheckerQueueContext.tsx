import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mockCheckerQueue as initialMockCheckerQueue, type MockCheckerQueueItem } from "@/lib/mockData";

// Maps checker queue status to transaction status
const mapQueueStatusToTransactionStatus = (queueStatus: string): string => {
  switch (queueStatus) {
    case "approved": return "approved";
    case "rejected": return "rejected";
    case "sent_back": return "under_review";
    default: return "pending";
  }
};

interface TransactionStatusUpdate {
  entityId: string;
  status: string;
  updatedAt: Date;
}

interface CheckerQueueContextType {
  queueItems: MockCheckerQueueItem[];
  addToQueue: (item: Omit<MockCheckerQueueItem, "id" | "submittedAt" | "status">) => void;
  updateQueueItem: (id: string, updates: Partial<MockCheckerQueueItem>) => void;
  removeFromQueue: (id: string) => void;
  getQueueCount: () => number;
  // New: track transaction status updates from checker actions
  transactionStatusUpdates: TransactionStatusUpdate[];
  getTransactionStatus: (entityId: string) => string | null;
}

const CheckerQueueContext = createContext<CheckerQueueContextType | null>(null);

export function CheckerQueueProvider({ children }: { children: ReactNode }) {
  const [queueItems, setQueueItems] = useState<MockCheckerQueueItem[]>([...initialMockCheckerQueue]);
  const [transactionStatusUpdates, setTransactionStatusUpdates] = useState<TransactionStatusUpdate[]>([]);

  const addToQueue = useCallback((item: Omit<MockCheckerQueueItem, "id" | "submittedAt" | "status">) => {
    const newItem: MockCheckerQueueItem = {
      ...item,
      id: `queue-${Date.now()}`,
      submittedAt: new Date(),
      status: "pending",
    };
    setQueueItems((prev) => [newItem, ...prev]);
  }, []);

  const updateQueueItem = useCallback((id: string, updates: Partial<MockCheckerQueueItem>) => {
    setQueueItems((prev) => {
      const updatedItems = prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updates };
          // If status is being updated, track it for transaction sync
          if (updates.status && updates.status !== "pending") {
            const transactionStatus = mapQueueStatusToTransactionStatus(updates.status);
            setTransactionStatusUpdates((prevUpdates) => [
              ...prevUpdates.filter((u) => u.entityId !== item.entityId),
              { entityId: item.entityId, status: transactionStatus, updatedAt: new Date() },
            ]);
          }
          return updatedItem;
        }
        return item;
      });
      return updatedItems;
    });
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueueItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getQueueCount = useCallback(() => {
    return queueItems.filter((item) => item.status === "pending").length;
  }, [queueItems]);

  const getTransactionStatus = useCallback((entityId: string): string | null => {
    const update = transactionStatusUpdates.find((u) => u.entityId === entityId);
    return update?.status || null;
  }, [transactionStatusUpdates]);

  return (
    <CheckerQueueContext.Provider
      value={{
        queueItems,
        addToQueue,
        updateQueueItem,
        removeFromQueue,
        getQueueCount,
        transactionStatusUpdates,
        getTransactionStatus,
      }}
    >
      {children}
    </CheckerQueueContext.Provider>
  );
}

export function useCheckerQueue() {
  const context = useContext(CheckerQueueContext);
  if (!context) {
    throw new Error("useCheckerQueue must be used within a CheckerQueueProvider");
  }
  return context;
}
