import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { getTransactionsByProduct, mockCustomers } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useCheckerQueue } from "@/contexts/CheckerQueueContext";
import { useAuth } from "@/hooks/use-auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FileText } from "lucide-react";
import type { Transaction } from "@shared/schema";

// Generate unique reference number
const generateReferenceNumber = (): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FRM-${timestamp}-${random}`;
};

export default function FormM() {
  const { toast } = useToast();
  const { addToQueue, transactionStatusUpdates } = useCheckerQueue();
  const { user } = useAuth();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mutable transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize transactions from mock data
  useEffect(() => {
    const initialData = getTransactionsByProduct("FORMM");
    setTransactions(initialData);
  }, []);

  // Sync transaction status with checker queue updates
  useEffect(() => {
    if (transactionStatusUpdates.length > 0) {
      setTransactions((prev) =>
        prev.map((tx) => {
          const statusUpdate = transactionStatusUpdates.find((u) => u.entityId === tx.id);
          if (statusUpdate) {
            return { ...tx, status: statusUpdate.status };
          }
          return tx;
        })
      );
    }
  }, [transactionStatusUpdates]);

  const activeTransactions = transactions.filter((tx) =>
    ["pending", "under_review", "approved"].includes(tx.status)
  );
  const completedTransactions = transactions.filter((tx) =>
    ["completed", "rejected"].includes(tx.status)
  );

  const handleView = (tx: Transaction) => {
    setSelectedTx(tx);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (tx: Transaction) => {
    setSelectedTx(tx);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTx(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleDelete = (tx: Transaction) => {
    setTransactions((prev) => prev.filter((t) => t.id !== tx.id));
    setIsModalOpen(false);
    toast({
      title: "Form M Deleted",
      description: `${tx.referenceNumber} has been deleted successfully.`,
    });
  };

  const handleDuplicate = (tx: Transaction) => {
    const now = new Date();
    const duplicatedTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      referenceNumber: generateReferenceNumber(),
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };
    setTransactions((prev) => [duplicatedTx, ...prev]);
    toast({
      title: "Form M Duplicated",
      description: `New draft created: ${duplicatedTx.referenceNumber}`,
    });
  };

  const handleSave = (data: Partial<Transaction> & { formData?: Record<string, string> }) => {
    if (modalMode === "create") {
      // Create new transaction with product-specific form data stored in metadata
      const refNumber = generateReferenceNumber();
      const now = new Date();
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        referenceNumber: refNumber,
        productType: "FORMM",
        customerId: data.customerId || "",
        status: "pending",
        amount: data.amount || "0",
        currency: data.currency || "USD",
        description: data.description || "",
        priority: (data.priority as "low" | "normal" | "high" | "urgent") || "normal",
        // Store product-specific form data in metadata
        metadata: data.formData || {},
        assignedTo: null,
        dueDate: null,
        completedAt: null,
        createdBy: user?.id || null,
        createdAt: now,
        updatedAt: now,
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Add to checker queue with all required fields including metadata
      const customer = mockCustomers.find((c) => c.id === data.customerId);
      addToQueue({
        referenceNumber: refNumber,
        entityType: "FORMM",
        entityId: newTx.id,
        action: "create",
        customerName: customer?.name || "Unknown Customer",
        amount: data.amount || "0",
        currency: data.currency || "USD",
        description: data.description || "New Form M transaction",
        priority: (data.priority as "low" | "normal" | "high" | "urgent") || "normal",
        makerId: user?.id || "user-001",
        makerName: user ? `${user.firstName} ${user.lastName}` : "Current User",
        makerDepartment: "Trade Finance",
        makerComments: data.description || "",
        checkerId: null,
        checkerName: null,
        checkerComments: null,
        checkedAt: null,
        // Include product-specific form data for checker review
        metadata: data.formData || {},
      });

      toast({
        title: "Form M Created",
        description: `${refNumber} has been created and submitted for checker approval.`,
      });
    } else if (modalMode === "edit" && selectedTx) {
      // Update existing transaction with product-specific form data in metadata
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === selectedTx.id
            ? {
                ...tx,
                ...data,
                metadata: data.formData || tx.metadata,
                updatedAt: new Date(),
              }
            : tx
        )
      );
      toast({
        title: "Form M Updated",
        description: `${selectedTx.referenceNumber} has been updated successfully.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteFromModal = (id: string) => {
    const txToDelete = transactions.find((tx) => tx.id === id);
    if (txToDelete) {
      handleDelete(txToDelete);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Form M Processing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-indigo-500 text-white">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Form M Processing</h1>
          <p className="text-sm text-muted-foreground">
            Manage import documentation and NSW registration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Forms</p>
            <p className="text-2xl font-semibold mt-1">{transactions.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-semibold mt-1 text-yellow-600">
              {transactions.filter((tx) => tx.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Under Review</p>
            <p className="text-2xl font-semibold mt-1 text-blue-600">
              {transactions.filter((tx) => tx.status === "under_review").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-semibold mt-1 text-green-600">
              {completedTransactions.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 border border-border">
          <TabsTrigger value="active" data-testid="tab-active">
            Active ({activeTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">
            Completed ({completedTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="all" data-testid="tab-all">
            All ({transactions.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <TransactionTable
            transactions={activeTransactions}
            title="Active Form M Transactions"
            showProductColumn={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onCreate={handleCreate}
          />
        </TabsContent>
        <TabsContent value="completed">
          <TransactionTable
            transactions={completedTransactions}
            title="Completed Form M Transactions"
            showProductColumn={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        </TabsContent>
        <TabsContent value="all">
          <TransactionTable
            transactions={transactions}
            title="All Form M Transactions"
            showProductColumn={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onCreate={handleCreate}
          />
        </TabsContent>
      </Tabs>

      <TransactionModal
        transaction={selectedTx}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteFromModal}
        mode={modalMode}
        productType="FORMM"
      />
    </div>
  );
}
