import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  BarChart3,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  FileText,
} from "lucide-react";
import { generateMISReport } from "@/lib/report-generator";
import { format } from "date-fns";
import { ReportBuilderModal } from "@/components/ReportBuilderModal";

// MIS Report templates data
const misReports = [
  {
    id: "RPT_TRANSACTION_VOLUME",
    name: "RPT_TRANSACTION_VOLUME",
    description: "Transaction volume analysis report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 15, 10, 45, 46),
  },
  {
    id: "RPT_PRODUCT_PERFORMANCE",
    name: "RPT_PRODUCT_PERFORMANCE",
    description: "Product performance metrics report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 15, 10, 45, 46),
  },
  {
    id: "RPT_CUSTOMER_ACTIVITY",
    name: "RPT_CUSTOMER_ACTIVITY",
    description: "Customer activity summary report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_FEE_INCOME",
    name: "RPT_FEE_INCOME",
    description: "Fee income analysis report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_PROCESSING_TIME",
    name: "RPT_PROCESSING_TIME",
    description: "Processing time analysis report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_BRANCH_PERFORMANCE",
    name: "RPT_BRANCH_PERFORMANCE",
    description: "Branch performance comparison report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_TRADE_SUMMARY",
    name: "RPT_TRADE_SUMMARY",
    description: "Trade finance summary report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_FX_UTILIZATION",
    name: "RPT_FX_UTILIZATION",
    description: "FX utilization analysis report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
  {
    id: "RPT_EXCEPTION_ANALYSIS",
    name: "RPT_EXCEPTION_ANALYSIS",
    description: "Exception and error analysis report",
    category: "GENERAL SERVICES",
    status: "ACTIVE",
    createdAt: new Date(2025, 0, 20, 11, 3, 18),
  },
];

export default function MISReport() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 100;

  const filteredReports = misReports
    .filter((report) => {
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          report.name.toLowerCase().includes(searchLower) ||
          report.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((report) => {
      if (statusFilter !== "all") {
        return report.status === statusFilter;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortOrder === "asc"
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      }
      const aVal = (a as any)[sortField];
      const bVal = (b as any)[sortField];
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleExportReport = () => {
    generateMISReport({
      period: format(new Date(), "MMMM yyyy"),
      generatedBy: "Adebayo Ogunlesi",
    });
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
            <BreadcrumbLink href="/reports">Report Engine</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>MIS Report</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-green-600 text-white">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">MIS Report Management</h1>
            <p className="text-sm text-muted-foreground">
              Management Information System reports with KPIs and performance analytics
            </p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FileText className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </div>

      <ReportBuilderModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        reportType="mis"
      />

      {/* Report Table */}
      <Card className="border-2 border-border">
        <CardHeader className="border-b-2 border-border pb-4">
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">PerPage</span>
              <Select defaultValue="100">
                <SelectTrigger className="w-20 border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm font-medium">
              Page {page} of {totalPages || 1}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto border-2 border-gray-300 dark:border-gray-600">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10 hover:bg-primary/10">
                  <TableHead className="font-semibold border-2 border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Name
                      <Filter className="w-3 h-3" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold border-2 border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleSort("description")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Description
                      <Filter className="w-3 h-3" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold border-2 border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Category
                      <Filter className="w-3 h-3" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold border-2 border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Status
                      <Filter className="w-3 h-3" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold border-2 border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      Created At
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-primary/5"
                    onClick={() => handleExportReport()}
                  >
                    <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                      <span className="font-medium text-primary hover:underline">
                        {report.name}
                      </span>
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                      {report.description}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                      <span className="uppercase text-sm">{report.category}</span>
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                      <Badge
                        variant="outline"
                        className={
                          report.status === "ACTIVE"
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                      {format(report.createdAt, "MMM do, yyyy HH:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t-2 border-gray-300 dark:border-gray-600 bg-muted/30">
            <div className="text-sm font-medium">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, filteredReports.length)} of {filteredReports.length} reports
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-2 font-medium"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded">
                {page}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-2 font-medium"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
