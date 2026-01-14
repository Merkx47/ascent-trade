import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { getTransactionsByProduct } from "@/lib/mockData";
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

export default function FormM() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formMTransactions = getTransactionsByProduct("FORMM");
  const activeTransactions = formMTransactions.filter((tx) =>
    ["pending", "under_review", "approved"].includes(tx.status)
  );
  const completedTransactions = formMTransactions.filter((tx) =>
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
    console.log("Delete transaction:", tx.id);
    setIsModalOpen(false);
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
            <p className="text-2xl font-semibold mt-1">{formMTransactions.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-semibold mt-1 text-yellow-600">
              {formMTransactions.filter((tx) => tx.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Under Review</p>
            <p className="text-2xl font-semibold mt-1 text-blue-600">
              {formMTransactions.filter((tx) => tx.status === "under_review").length}
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
            All ({formMTransactions.length})
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
          />
        </TabsContent>
        <TabsContent value="all">
          <TransactionTable
            transactions={formMTransactions}
            title="All Form M Transactions"
            showProductColumn={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
        </TabsContent>
      </Tabs>

      <TransactionModal
        transaction={selectedTx}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => console.log("Save:", data)}
        onDelete={(id) => console.log("Delete:", id)}
        mode={modalMode}
        productType="FORMM"
      />
    </div>
  );
}
