import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CurrencyIcon, formatFullAmount } from "./CurrencyIcon";
import { StatusBadge } from "./StatusBadge";
import { mockCustomers } from "@/lib/mockData";
import {
  getProductFormConfig,
  initializeFormData,
  type FormField,
  type FormSection,
} from "@/lib/tradeProductForms";
import { format } from "date-fns";
import {
  FileText,
  Building2,
  Calendar,
  DollarSign,
  User,
  Clock,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Transaction } from "@shared/schema";

interface TransactionModalProps {
  transaction?: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: Partial<Transaction>) => void;
  onDelete?: (id: string) => void;
  mode: "view" | "edit" | "create";
  productType?: string;
}

const productLabels: Record<string, string> = {
  FORMM: "Form M",
  FORMA: "Form A",
  FORMNXP: "Form NXP",
  PAAR: "PAAR",
  IMPORTLC: "Import LC",
  BFC: "Bills for Collection",
  SHIPPINGDOC: "Shipping Docs",
  FXSALES: "FX Sales",
  LOAN: "Trade Loan",
  INWCP: "Inward Payment",
  DOMOUTAC: "Outward Payment",
};

export function TransactionModal({
  transaction,
  isOpen,
  onClose,
  onSave,
  onDelete,
  mode,
  productType,
}: TransactionModalProps) {
  const formConfig = getProductFormConfig(productType || "");

  // Initialize form data based on product type
  const getInitialFormData = () => {
    const baseData: Record<string, string> = {
      customerId: transaction?.customerId || "",
      amount: transaction?.amount || "",
      currency: transaction?.currency || "USD",
      description: transaction?.description || "",
      priority: transaction?.priority || "normal",
      status: transaction?.status || "draft",
    };

    // Add product-specific fields
    if (formConfig) {
      const productFields = initializeFormData(productType || "");
      // If editing, try to load existing values from transaction metadata
      const existingData = (transaction?.metadata as Record<string, string>) || {};
      return { ...baseData, ...productFields, ...existingData };
    }

    return baseData;
  };

  const [formData, setFormData] = useState<Record<string, string>>(getInitialFormData);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Reset form data when modal opens or product type changes
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setCollapsedSections({});
    }
  }, [isOpen, productType, transaction]);

  const customer = transaction
    ? mockCustomers.find((c) => c.id === transaction.customerId)
    : null;

  // Map customer data to form field names for auto-population
  const getCustomerAutoFillData = (selectedCustomer: typeof mockCustomers[0]) => {
    return {
      // Importer/Business info
      businessName: selectedCustomer.name,
      businessAddress: selectedCustomer.address,
      companyAddress: selectedCustomer.address,
      applicantName: selectedCustomer.name,
      applicantAddress: selectedCustomer.address,
      exporterName: selectedCustomer.name,
      exporterAddress: selectedCustomer.address,
      importerName: selectedCustomer.name,
      importerAddress: selectedCustomer.address,
      // Regulatory IDs
      rcNumber: selectedCustomer.rcNumber,
      tin: selectedCustomer.tin,
      // Bank account info
      bankAccountNumber: selectedCustomer.accountNumber,
      accountNumber: selectedCustomer.accountNumber,
      accountName: selectedCustomer.accountName,
      // Contact info
      email: selectedCustomer.email,
      phone: selectedCustomer.phone,
      // Default bank info for Union Bank
      bankName: "Union Bank of Nigeria",
    };
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === "customerId" && value) {
      // Auto-populate customer-related fields when customer is selected
      const selectedCustomer = mockCustomers.find((c) => c.id === value);
      if (selectedCustomer) {
        const autoFillData = getCustomerAutoFillData(selectedCustomer);
        setFormData((prev) => ({
          ...prev,
          [fieldName]: value,
          // Only auto-fill fields that are empty or in create mode
          ...(mode === "create" || !prev.businessName ? { businessName: autoFillData.businessName } : {}),
          ...(mode === "create" || !prev.businessAddress ? { businessAddress: autoFillData.businessAddress } : {}),
          ...(mode === "create" || !prev.companyAddress ? { companyAddress: autoFillData.companyAddress } : {}),
          ...(mode === "create" || !prev.applicantName ? { applicantName: autoFillData.applicantName } : {}),
          ...(mode === "create" || !prev.applicantAddress ? { applicantAddress: autoFillData.applicantAddress } : {}),
          ...(mode === "create" || !prev.exporterName ? { exporterName: autoFillData.exporterName } : {}),
          ...(mode === "create" || !prev.exporterAddress ? { exporterAddress: autoFillData.exporterAddress } : {}),
          ...(mode === "create" || !prev.importerName ? { importerName: autoFillData.importerName } : {}),
          ...(mode === "create" || !prev.importerAddress ? { importerAddress: autoFillData.importerAddress } : {}),
          ...(mode === "create" || !prev.rcNumber ? { rcNumber: autoFillData.rcNumber } : {}),
          ...(mode === "create" || !prev.tin ? { tin: autoFillData.tin } : {}),
          ...(mode === "create" || !prev.bankAccountNumber ? { bankAccountNumber: autoFillData.bankAccountNumber } : {}),
          ...(mode === "create" || !prev.accountNumber ? { accountNumber: autoFillData.accountNumber } : {}),
          ...(mode === "create" || !prev.accountName ? { accountName: autoFillData.accountName } : {}),
          ...(mode === "create" || !prev.email ? { email: autoFillData.email } : {}),
          ...(mode === "create" || !prev.phone ? { phone: autoFillData.phone } : {}),
          ...(mode === "create" || !prev.bankName ? { bankName: autoFillData.bankName } : {}),
        }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = () => {
    // Extract the main transaction fields
    const { customerId, amount, currency, description, priority, status, ...productFormData } = formData;

    // Get amount from product-specific field if main amount is empty
    // Different products store amount in different fields
    const effectiveAmount = amount ||
      productFormData.invoiceAmount ||  // Form M
      productFormData.exportValue ||     // Form NXP
      productFormData.assessmentValue || // PAAR
      productFormData.lcAmount ||        // Import LC
      productFormData.totalAmount ||     // BFC (Bills for Collection)
      productFormData.freightAmount ||   // Shipping Docs
      productFormData.insuredValue ||    // Shipping Docs (alternative)
      "0";

    // Get currency from product-specific field if not set
    const effectiveCurrency = currency || productFormData.currency || "USD";

    onSave?.({
      customerId,
      amount: effectiveAmount,
      currency: effectiveCurrency,
      description,
      priority,
      status,
      productType: productType || transaction?.productType || "FORMM",
      // Store product-specific data in a formData field
      formData: productFormData,
    } as any);
    onClose();
  };

  const handleDelete = () => {
    if (transaction) {
      onDelete?.(transaction.id);
      onClose();
    }
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isViewMode = mode === "view";
  const title =
    mode === "create"
      ? `New ${productLabels[productType || "FORMM"] || "Transaction"}`
      : mode === "edit"
      ? `Edit ${transaction?.referenceNumber}`
      : transaction?.referenceNumber || "Transaction Details";

  // Render a single form field
  const renderField = (field: FormField) => {
    const value = formData[field.name] || "";
    const fieldId = `field-${field.name}`;

    if (isViewMode) {
      return (
        <div key={field.name} className={`${field.span === 2 ? "col-span-2" : ""}`}>
          <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
          <p className="text-sm font-medium">
            {field.type === "select" && field.options
              ? field.options.find((o) => o.value === value)?.label || value || "-"
              : value || "-"}
          </p>
        </div>
      );
    }

    return (
      <div key={field.name} className={`space-y-2 ${field.span === 2 ? "col-span-2" : ""}`}>
        <Label htmlFor={fieldId} className="text-sm">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {field.type === "select" && field.options ? (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field.name, val)}
          >
            <SelectTrigger className="border-2 border-border">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "textarea" ? (
          <Textarea
            id={fieldId}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="min-h-[80px] border-2 border-border text-sm"
          />
        ) : field.type === "date" ? (
          <Input
            id={fieldId}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="border-2 border-border"
          />
        ) : field.type === "number" ? (
          <Input
            id={fieldId}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="border-2 border-border"
          />
        ) : (
          <Input
            id={fieldId}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="border-2 border-border"
          />
        )}
      </div>
    );
  };

  // Render a form section
  const renderSection = (section: FormSection, index: number) => {
    const isCollapsed = collapsedSections[section.id];

    return (
      <div key={section.id} className="border border-border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title}
          </h4>
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {!isCollapsed && (
          <div className="p-4 grid grid-cols-2 gap-4">
            {section.fields.map(renderField)}
          </div>
        )}
      </div>
    );
  };

  // Render generic form (fallback for products without specific config)
  const renderGenericForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer</Label>
          <Select
            value={formData.customerId}
            onValueChange={(value) => handleFieldChange("customerId", value)}
          >
            <SelectTrigger className="border-2 border-border" data-testid="select-customer">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {mockCustomers.slice(0, 20).map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleFieldChange("priority", value)}
          >
            <SelectTrigger className="border-2 border-border" data-testid="select-priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleFieldChange("amount", e.target.value)}
            placeholder="Enter amount"
            className="border-2 border-border"
            data-testid="input-amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleFieldChange("currency", value)}
          >
            <SelectTrigger className="border-2 border-border" data-testid="select-currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
              <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {mode === "edit" && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleFieldChange("status", value)}
          >
            <SelectTrigger className="border-2 border-border" data-testid="select-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder="Enter description of goods or services"
          className="min-h-[100px] border-2 border-border"
          data-testid="input-description"
        />
      </div>
    </div>
  );

  // Render product-specific form
  const renderProductForm = () => {
    if (!formConfig) {
      return renderGenericForm();
    }

    return (
      <div className="space-y-4">
        {/* Customer Selection - always at top */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-muted/30">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Customer & Transaction
            </h4>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer" className="text-sm">
                Customer <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => handleFieldChange("customerId", value)}
              >
                <SelectTrigger className="border-2 border-border">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.slice(0, 30).map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {mode === "edit" && (
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleFieldChange("status", value)}
                >
                  <SelectTrigger className="border-2 border-border">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Product-specific sections */}
        {formConfig.sections.map((section, index) => renderSection(section, index))}
      </div>
    );
  };

  // Render view mode content
  const renderViewContent = () => {
    if (!transaction) return null;

    const productFormData = (transaction?.metadata as Record<string, string>) || {};

    return (
      <>
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Building2 className="w-4 h-4" />
              Customer
            </div>
            <p className="font-medium">{customer?.name || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">{customer?.accountNumber}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign className="w-4 h-4" />
              Amount
            </div>
            <div className="flex items-center gap-2">
              <CurrencyIcon currency={transaction.currency || "USD"} />
              <span className="font-mono text-lg font-bold">
                {formatFullAmount(transaction.amount || "0", transaction.currency || "USD")}
              </span>
            </div>
          </div>
        </div>

        {/* Product-specific data */}
        {formConfig && Object.keys(productFormData).length > 0 && (
          <>
            <Separator className="border-border" />
            {formConfig.sections.map((section) => (
              <div key={section.id} className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted/30">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  {section.fields.map((field) => {
                    const value = productFormData[field.name] || "";
                    return (
                      <div key={field.name} className={`${field.span === 2 ? "col-span-2" : ""}`}>
                        <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
                        <p className="text-sm font-medium">
                          {field.type === "select" && field.options
                            ? field.options.find((o) => o.value === value)?.label || value || "-"
                            : value || "-"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Description if no product form data */}
        {(!formConfig || Object.keys(productFormData).length === 0) && (
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <FileText className="w-4 h-4" />
              Description
            </div>
            <p className="text-sm">{transaction.description || "No description provided"}</p>
          </div>
        )}

        <Separator className="border-border" />

        {/* Meta information */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 border border-border rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
              <Calendar className="w-3 h-3" />
              Created
            </div>
            <p className="font-medium text-sm">
              {transaction.createdAt
                ? format(new Date(transaction.createdAt), "dd MMM yyyy")
                : "-"}
            </p>
          </div>
          <div className="text-center p-3 border border-border rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
              <Clock className="w-3 h-3" />
              Updated
            </div>
            <p className="font-medium text-sm">
              {transaction.updatedAt
                ? format(new Date(transaction.updatedAt), "dd MMM yyyy")
                : "-"}
            </p>
          </div>
          <div className="text-center p-3 border border-border rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
              <User className="w-3 h-3" />
              Priority
            </div>
            <Badge
              variant={
                transaction.priority === "urgent"
                  ? "destructive"
                  : transaction.priority === "high"
                  ? "default"
                  : "secondary"
              }
              className="capitalize"
            >
              {transaction.priority}
            </Badge>
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-2 border-border p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b-2 border-border px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg">{title}</DialogTitle>
                <DialogDescription>
                  {mode === "create"
                    ? `Fill in the details to create a new ${formConfig?.productName || "transaction"}`
                    : mode === "edit"
                    ? "Update the transaction details"
                    : productLabels[transaction?.productType || ""] || "Transaction"}
                </DialogDescription>
              </div>
            </div>
            {transaction && <StatusBadge status={transaction.status} />}
          </div>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          {isViewMode ? renderViewContent() : renderProductForm()}
        </div>

        <DialogFooter className="border-t-2 border-border px-6 py-4 flex-shrink-0 bg-muted/30">
          {isViewMode ? (
            <Button variant="outline" onClick={onClose} className="border-border">
              Close
            </Button>
          ) : (
            <>
              {mode === "edit" && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="mr-auto"
                  data-testid="button-delete"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button variant="outline" onClick={onClose} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleSubmit} data-testid="button-save">
                <Save className="w-4 h-4 mr-2" />
                {mode === "create" ? "Create" : "Save Changes"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
