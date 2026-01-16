import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  FileText,
  Shield,
  Landmark,
  ArrowRight,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const reportModules = [
  {
    id: "custom",
    name: "Custom Report",
    description: "Build custom reports with flexible data selection and visualization options",
    icon: FileText,
    href: "/reports/custom",
    color: "bg-blue-600",
    count: 9,
    features: ["Fixed Asset Register", "Balance Sheet", "Trial Balance", "Audit Logs"],
  },
  {
    id: "mis",
    name: "MIS Report",
    description: "Management Information System reports with KPIs and performance analytics",
    icon: BarChart3,
    href: "/reports/mis",
    color: "bg-green-600",
    count: 9,
    features: ["Transaction Volume", "Product Performance", "Customer Activity", "Fee Income"],
  },
  {
    id: "regulatory",
    name: "Regulatory Report",
    description: "Compliance status, sanctions screening, and AML activity reports",
    icon: Shield,
    href: "/reports/regulatory",
    color: "bg-amber-600",
    count: 8,
    features: ["Compliance Status", "Sanctions Screening", "AML Monitoring", "KYC Tracking"],
  },
  {
    id: "cbn",
    name: "CBN Monthly Report",
    description: "Central Bank of Nigeria monthly returns and trade finance reporting",
    icon: Landmark,
    href: "/reports/cbn",
    color: "bg-purple-600",
    count: 9,
    features: ["Form M Summary", "Form A Summary", "FX Utilization", "Outstanding LCs"],
  },
];

const recentReports = [
  { name: "MIS Report - January 2025", date: "Jan 15, 2025", status: "completed" },
  { name: "CBN Monthly Return - Dec 2024", date: "Jan 10, 2025", status: "submitted" },
  { name: "Compliance Status Report", date: "Jan 08, 2025", status: "completed" },
  { name: "Transaction Volume Analysis", date: "Jan 05, 2025", status: "completed" },
];

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Report Engine</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Report Engine</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive reporting suite for trade finance operations
            </p>
          </div>
        </div>
      </div>

      {/* Report Modules Grid */}
      <div className="grid grid-cols-2 gap-6">
        {reportModules.map((module) => (
          <Link key={module.id} href={module.href}>
            <Card className="border-2 border-border hover:border-primary/50 transition-all cursor-pointer group h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${module.color} text-white`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {module.count} reports
                    </Badge>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <CardTitle className="mt-4">{module.name}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Reports & Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="col-span-2 border-2 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Recently generated and viewed reports</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-2">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-muted">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.date}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      report.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">35</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reports This Month</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CBN Submissions</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/reports/custom">
            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Create New Report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
