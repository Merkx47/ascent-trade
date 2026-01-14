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
import {
  FileCheck,
  FileSpreadsheet,
  FileSearch,
  Ship,
  CreditCard,
  FileText,
  Landmark,
  ArrowDownToLine,
  ArrowUpFromLine,
  type LucideIcon,
} from "lucide-react";
import type { Transaction } from "@shared/schema";

interface ProductPageProps {
  productCode: string;
}

const productConfig: Record<string, { name: string; description: string }> = {
  FORMA: { name: "Form A", description: "Process invisible/service payments" },
  FORMNXP: { name: "Form NXP", description: "Export documentation management" },
  PAAR: { name: "PAAR", description: "Pre-Arrival Assessment Reports" },
  IMPORTLC: { name: "Import LC", description: "Letters of Credit for imports" },
  BFC: { name: "Bills for Collection", description: "Documentary collections" },
  SHIPPINGDOC: { name: "Shipping Documents", description: "Shipping documentation" },
  LOAN: { name: "Trade Loans", description: "Trade finance facilities" },
  INWCP: { name: "Inward Payments", description: "Incoming wire transfers" },
  DOMOUTAC: { name: "Outward Payments", description: "Outgoing wire transfers" },
};

const productIcons: Record<string, LucideIcon> = {
  FORMA: FileCheck,
  FORMNXP: FileSpreadsheet,
  PAAR: FileSearch,
  IMPORTLC: Ship,
  BFC: CreditCard,
  SHIPPINGDOC: FileText,
  LOAN: Landmark,
  INWCP: ArrowDownToLine,
  DOMOUTAC: ArrowUpFromLine,
};

const productColors: Record<string, string> = {
  FORMA: "bg-green-500",
  FORMNXP: "bg-teal-500",
  PAAR: "bg-orange-500",
  IMPORTLC: "bg-cyan-500",
  BFC: "bg-blue-500",
  SHIPPINGDOC: "bg-amber-500",
  LOAN: "bg-purple-500",
  INWCP: "bg-emerald-500",
  DOMOUTAC: "bg-rose-500",
};

export default function ProductPage({ productCode }: ProductPageProps) {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productInfo = productConfig[productCode];
  const Icon = productIcons[productCode] || FileText;
  const colorClass = productColors[productCode] || "bg-gray-500";

  const transactions = getTransactionsByProduct(productCode);
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
            <BreadcrumbPage>{productInfo?.name || productCode}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorClass} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {productInfo?.name || productCode}
          </h1>
          <p className="text-sm text-muted-foreground">
            {productInfo?.description || "Manage transactions"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total</p>
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
            title={`Active ${productInfo?.name || productCode}`}
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
            title={`Completed ${productInfo?.name || productCode}`}
            showProductColumn={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="all">
          <TransactionTable
            transactions={transactions}
            title={`All ${productInfo?.name || productCode}`}
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
        productType={productCode}
      />
    </div>
  );
}
