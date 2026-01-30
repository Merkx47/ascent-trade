import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Search,
  FileText,
  FileCheck,
  FileSpreadsheet,
  Ship,
  Repeat,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Timer,
  Users,
  Eye,
  RotateCcw,
} from "lucide-react";
import { type MockCheckerQueueItem } from "@/lib/mockData";
import { formatDistanceToNow, format } from "date-fns";
import { useCheckerQueue } from "@/contexts/CheckerQueueContext";
import { useAuth } from "@/hooks/use-auth";

const productIcons: Record<string, any> = {
  FORMM: FileText,
  FORMA: FileCheck,
  FORMNXP: FileSpreadsheet,
  PAAR: FileText,
  IMPORTLC: Ship,
  BFC: FileText,
  SHIPPINGDOC: FileText,
  FXSALES: Repeat,
  LOAN: FileText,
  INWCP: ArrowDownToLine,
  DOMOUTAC: ArrowUpFromLine,
  CUSTOMER: Users,
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
  CUSTOMER: "Customer",
};

export default function MyRequests() {
  const { queueItems } = useCheckerQueue();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MockCheckerQueueItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const pageSize = 10;

  // Filter queue items for current user's submissions
  const myRequests = useMemo(() => {
    const currentUserId = user?.id || "user-001";
    return queueItems.filter((item) => item.makerId === currentUserId);
  }, [queueItems, user]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: myRequests.length,
      pending: myRequests.filter((item) => item.status === "pending").length,
      approved: myRequests.filter((item) => item.status === "approved").length,
      rejected: myRequests.filter((item) => item.status === "rejected").length,
      sentBack: myRequests.filter((item) => item.status === "sent_back").length,
    };
  }, [myRequests]);

  // Count items by product type
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    myRequests.forEach((item) => {
      counts[item.entityType] = (counts[item.entityType] || 0) + 1;
    });
    return counts;
  }, [myRequests]);

  // Apply filters
  const filteredRequests = useMemo(() => {
    return myRequests.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      const matchesTab =
        activeTab === "all" ||
        item.entityType === activeTab ||
        (activeTab === "PAYMENTS" && (item.entityType === "INWCP" || item.entityType === "DOMOUTAC"));

      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [myRequests, searchQuery, statusFilter, activeTab]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: any }> = {
      pending: {
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: Clock,
      },
      approved: {
        color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle2,
      },
      rejected: {
        color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
      },
      sent_back: {
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        icon: AlertCircle,
      },
    };

    const { color, icon: Icon } = config[status] || config.pending;

    return (
      <Badge variant="outline" className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, string> = {
      low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      normal: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
      <Badge variant="outline" className={config[priority] || config.normal}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const handleViewDetails = (item: MockCheckerQueueItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
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
            <BreadcrumbPage>My Requests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary text-primary-foreground">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Requests</h1>
          <p className="text-sm text-muted-foreground">
            Track all your submissions and their approval status
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Timer className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting checker</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Successfully approved</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Not approved</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent Back</CardTitle>
            <RotateCcw className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.sentBack}</div>
            <p className="text-xs text-muted-foreground">Needs revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by reference, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-2 border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] border-2 border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="sent_back">Sent Back</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs and Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          <TabsTrigger value="all">
            All
            {myRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {myRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="FORMM">
            Form M
            {tabCounts.FORMM > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {tabCounts.FORMM}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="FORMA">
            Form A
            {tabCounts.FORMA > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {tabCounts.FORMA}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="FORMNXP">
            Form NXP
            {tabCounts.FORMNXP > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {tabCounts.FORMNXP}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="IMPORTLC">
            Import LC
            {tabCounts.IMPORTLC > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {tabCounts.IMPORTLC}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="PAYMENTS">
            Payments
            {(tabCounts.INWCP || 0) + (tabCounts.DOMOUTAC || 0) > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {(tabCounts.INWCP || 0) + (tabCounts.DOMOUTAC || 0)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="CUSTOMER">
            Customers
            {tabCounts.CUSTOMER > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {tabCounts.CUSTOMER}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <Card className="border-2 border-gray-300 dark:border-gray-600 overflow-hidden rounded-lg">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px] border-2 border-gray-300 dark:border-gray-600 font-semibold">Reference</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Customer</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Amount</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Submitted</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Priority</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Status</TableHead>
                <TableHead className="border-2 border-gray-300 dark:border-gray-600 font-semibold">Checker</TableHead>
                <TableHead className="text-left border-2 border-gray-300 dark:border-gray-600 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground border-2 border-gray-300 dark:border-gray-600">
                    No requests found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRequests.map((item) => {
                  const Icon = productIcons[item.entityType] || FileText;
                  return (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono text-sm font-medium">{item.referenceNumber}</p>
                            <p className="text-xs text-muted-foreground">
                              {productLabels[item.entityType]}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        <span className="text-sm">{item.customerName || "—"}</span>
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        <div className="font-mono text-sm">
                          {item.currency} {Number(item.amount || 0).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        <div>
                          <p className="text-sm">
                            {format(new Date(item.submittedAt), "dd MMM yyyy")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        {getPriorityBadge(item.priority)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        {item.checkerName ? (
                          <div>
                            <p className="text-sm font-medium">{item.checkerName}</p>
                            {item.checkedAt && (
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(item.checkedAt), "dd MMM")}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not yet reviewed</span>
                        )}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 dark:border-gray-600">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(item)}
                          className="border-2"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, filteredRequests.length)} of{" "}
              {filteredRequests.length} requests
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="border-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Tabs>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl border-2 border-border p-0 max-h-[90vh] flex flex-col">
          {selectedItem && (
            <>
              {/* Modal Header */}
              <div className="border-b-2 border-border px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {(() => {
                        const Icon = productIcons[selectedItem.entityType] || FileText;
                        return <Icon className="w-5 h-5 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{selectedItem.referenceNumber}</h2>
                      <p className="text-sm text-muted-foreground">{productLabels[selectedItem.entityType]}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedItem.status)}
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
                {/* Checker Feedback - Prominent for rejected/sent_back */}
                {(selectedItem.status === "rejected" || selectedItem.status === "sent_back") && (
                  <div className={`p-4 rounded-lg border-2 ${
                    selectedItem.status === "rejected"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                      : "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        selectedItem.status === "rejected"
                          ? "bg-red-100 dark:bg-red-800"
                          : "bg-orange-100 dark:bg-orange-800"
                      }`}>
                        {selectedItem.status === "rejected" ? (
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold ${
                            selectedItem.status === "rejected"
                              ? "text-red-700 dark:text-red-400"
                              : "text-orange-700 dark:text-orange-400"
                          }`}>
                            {selectedItem.status === "rejected" ? "Request Rejected" : "Request Sent Back"}
                          </h4>
                          {selectedItem.checkedAt && (
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(selectedItem.checkedAt), "dd MMM yyyy, HH:mm")}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reviewed by <span className="font-medium">{selectedItem.checkerName || "Checker"}</span>
                        </p>
                        {selectedItem.checkerComments ? (
                          <div className={`p-3 rounded-md ${
                            selectedItem.status === "rejected"
                              ? "bg-red-100 dark:bg-red-800/50"
                              : "bg-orange-100 dark:bg-orange-800/50"
                          }`}>
                            <p className="text-sm font-medium mb-1">Checker Comments:</p>
                            <p className="text-sm">{selectedItem.checkerComments}</p>
                          </div>
                        ) : (
                          <p className="text-sm italic text-muted-foreground">No comments provided</p>
                        )}
                        {selectedItem.status === "sent_back" && (
                          <p className="text-xs mt-3 text-orange-600 dark:text-orange-400">
                            Please review the feedback above and resubmit your request with the necessary corrections.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Approved Feedback */}
                {selectedItem.status === "approved" && (
                  <div className="p-4 rounded-lg border-2 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-100 dark:bg-green-800">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-green-700 dark:text-green-400">Request Approved</h4>
                          {selectedItem.checkedAt && (
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(selectedItem.checkedAt), "dd MMM yyyy, HH:mm")}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Approved by <span className="font-medium">{selectedItem.checkerName || "Checker"}</span>
                        </p>
                        {selectedItem.checkerComments && (
                          <div className="p-3 rounded-md bg-green-100 dark:bg-green-800/50 mt-2">
                            <p className="text-sm font-medium mb-1">Checker Comments:</p>
                            <p className="text-sm">{selectedItem.checkerComments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pending Status Info */}
                {selectedItem.status === "pending" && (
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                          Awaiting Checker Review
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your request is in the queue and will be reviewed soon
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Request Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Request Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-2 border-border">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Customer</p>
                        <p className="font-medium">{selectedItem.customerName || "—"}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Amount</p>
                        <p className="font-mono font-bold text-lg">
                          {selectedItem.currency} {Number(selectedItem.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                        <p className="font-medium">
                          {format(new Date(selectedItem.submittedAt), "dd MMM yyyy, HH:mm")}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Priority</p>
                        <div className="mt-1">{getPriorityBadge(selectedItem.priority)}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Your Comments */}
                {selectedItem.makerComments && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Your Comments
                    </h4>
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm">{selectedItem.makerComments}</p>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedItem.description && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Description
                    </h4>
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm">{selectedItem.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
