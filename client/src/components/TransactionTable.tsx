import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CurrencyIcon, formatCurrencyAmount } from "./CurrencyIcon";
import { StatusBadge } from "./StatusBadge";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import type { Transaction } from "@shared/schema";
import { mockCustomers } from "@/lib/mockData";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
  title?: string;
  showProductColumn?: boolean;
  onView?: (transaction: Transaction) => void;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  onCreate?: () => void;
}

export function TransactionTable({
  transactions,
  title = "Transactions",
  showProductColumn = true,
  onView,
  onEdit,
  onDelete,
  onCreate,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const pageSize = 10;

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.referenceNumber.toLowerCase().includes(searchLower) ||
          tx.description?.toLowerCase().includes(searchLower) ||
          mockCustomers.find(c => c.id === tx.customerId)?.name.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((tx) => tx.status === statusFilter);
    }

    result.sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortField) {
        case "amount":
          aVal = parseFloat(a.amount || "0");
          bVal = parseFloat(b.amount || "0");
          break;
        case "createdAt":
          aVal = new Date(a.createdAt || 0).getTime();
          bVal = new Date(b.createdAt || 0).getTime();
          break;
        default:
          aVal = (a as any)[sortField];
          bVal = (b as any)[sortField];
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [transactions, search, statusFilter, sortField, sortOrder]);

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, page]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  const getCustomerName = (customerId: string) => {
    return mockCustomers.find(c => c.id === customerId)?.name || "Unknown";
  };

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

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64 border-border"
                data-testid="input-search-transactions"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 border-border" data-testid="select-status-filter">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="exception">Exception</SelectItem>
              </SelectContent>
            </Select>
            {onCreate && (
              <Button onClick={onCreate} data-testid="button-create-new">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 border-b border-border">
                <TableHead className="font-semibold border-r border-border px-4 py-3">
                  <button
                    className="flex items-center gap-1 hover:text-primary"
                    onClick={() => toggleSort("referenceNumber")}
                  >
                    Reference
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                {showProductColumn && (
                  <TableHead className="font-semibold border-r border-border px-4 py-3">Product</TableHead>
                )}
                <TableHead className="font-semibold border-r border-border px-4 py-3">Customer</TableHead>
                <TableHead className="font-semibold border-r border-border px-4 py-3">
                  <button
                    className="flex items-center gap-1 hover:text-primary"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead className="font-semibold border-r border-border px-4 py-3">Status</TableHead>
                <TableHead className="font-semibold border-r border-border px-4 py-3">Priority</TableHead>
                <TableHead className="font-semibold border-r border-border px-4 py-3">
                  <button
                    className="flex items-center gap-1 hover:text-primary"
                    onClick={() => toggleSort("createdAt")}
                  >
                    Date
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead className="font-semibold w-14 px-4 py-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showProductColumn ? 8 : 7} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                    data-testid={`row-transaction-${tx.id}`}
                  >
                    <TableCell className="font-mono text-sm font-medium border-r border-border px-4 py-3">
                      {tx.referenceNumber}
                    </TableCell>
                    {showProductColumn && (
                      <TableCell className="border-r border-border px-4 py-3">
                        <Badge variant="outline" className="font-normal border-border">
                          {productLabels[tx.productType] || tx.productType}
                        </Badge>
                      </TableCell>
                    )}
                    <TableCell className="border-r border-border px-4 py-3">
                      <div className="max-w-[180px] truncate text-sm">
                        {getCustomerName(tx.customerId)}
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-border px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CurrencyIcon currency={tx.currency || "USD"} />
                        <span className="font-mono font-semibold text-sm">
                          {formatCurrencyAmount(tx.amount || "0", tx.currency || "USD")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-border px-4 py-3">
                      <StatusBadge status={tx.status} />
                    </TableCell>
                    <TableCell className="border-r border-border px-4 py-3">
                      <Badge
                        variant={
                          tx.priority === "urgent"
                            ? "destructive"
                            : tx.priority === "high"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize text-xs"
                      >
                        {tx.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground border-r border-border px-4 py-3">
                      {tx.createdAt ? format(new Date(tx.createdAt), "dd MMM yyyy") : "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" data-testid={`button-actions-${tx.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView?.(tx)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(tx)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete?.(tx)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filteredTransactions.length)} of {filteredTransactions.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="border-border"
              data-testid="button-prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                }
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 border-border"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="border-border"
              data-testid="button-next-page"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
