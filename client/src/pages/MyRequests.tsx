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
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  TrendingUp,
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && (
                <>
                  {(() => {
                    const Icon = productIcons[selectedItem.entityType] || FileText;
                    return <Icon className="w-5 h-5" />;
                  })()}
                  {selectedItem.referenceNumber}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedItem && productLabels[selectedItem.entityType]} Request Details
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                {getStatusBadge(selectedItem.status)}
              </div>

              {/* Request Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedItem.customerName || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-mono font-medium">
                    {selectedItem.currency} {Number(selectedItem.amount || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {format(new Date(selectedItem.submittedAt), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  {getPriorityBadge(selectedItem.priority)}
                </div>
              </div>

              {/* Maker Comments */}
              {selectedItem.makerComments && (
                <div className="p-4 border-2 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Your Comments</p>
                  <p className="text-sm">{selectedItem.makerComments}</p>
                </div>
              )}

              {/* Checker Feedback */}
              {selectedItem.status !== "pending" && (
                <div className="p-4 border-2 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Checker Feedback</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{selectedItem.checkerName || "Unknown"}</span>
                      {selectedItem.checkedAt && (
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(selectedItem.checkedAt), "dd MMM yyyy, HH:mm")}
                        </span>
                      )}
                    </div>
                    {selectedItem.checkerComments && (
                      <p className="text-sm text-muted-foreground">{selectedItem.checkerComments}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action hint for sent back items */}
              {selectedItem.status === "sent_back" && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg">
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    This request has been sent back for revision. Please review the checker's feedback and resubmit.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
