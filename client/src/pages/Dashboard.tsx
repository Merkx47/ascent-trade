import { useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { QuickActions } from "@/components/QuickActions";
import {
  TransactionVolumeChart,
  ProductMixChart,
  StatusDistributionChart,
} from "@/components/DashboardCharts";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Landmark,
} from "lucide-react";
import {
  mockTransactions,
  mockActivities,
  dashboardStats,
  fxRates,
} from "@/lib/mockData";
import type { Transaction } from "@shared/schema";

export default function Dashboard() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const recentTransactions = mockTransactions.slice(0, 20);
  const pendingTransactions = mockTransactions.filter(
    (t) => t.status === "pending" || t.status === "under_review"
  );
  const exceptionTransactions = mockTransactions.filter(
    (t) => t.status === "exception"
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Trade operations overview and performance metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Transactions"
          value={dashboardStats.totalTransactions}
          previousValue={dashboardStats.previousTransactions}
          currentValue={dashboardStats.totalTransactions}
          icon={FileText}
          description="vs last month"
        />
        <StatsCard
          title="Pending Approvals"
          value={dashboardStats.pendingApprovals}
          previousValue={dashboardStats.previousPending}
          currentValue={dashboardStats.pendingApprovals}
          icon={Clock}
          iconColor="text-yellow-600"
          description="vs last month"
        />
        <StatsCard
          title="Exceptions"
          value={dashboardStats.exceptions}
          previousValue={dashboardStats.previousExceptions}
          currentValue={dashboardStats.exceptions}
          icon={AlertTriangle}
          iconColor="text-red-600"
          description="vs last month"
        />
        <StatsCard
          title="Completed Today"
          value={dashboardStats.completedToday}
          previousValue={dashboardStats.previousCompleted}
          currentValue={dashboardStats.completedToday}
          icon={CheckCircle}
          iconColor="text-green-600"
          description="vs yesterday"
        />
        <StatsCard
          title="FX Volume (USD)"
          value="$45.2M"
          previousValue={dashboardStats.previousFxVolume}
          currentValue={dashboardStats.fxVolume}
          icon={TrendingUp}
          iconColor="text-cyan-600"
          description="vs last month"
        />
        <StatsCard
          title="Fee Revenue"
          value="₦125M"
          previousValue={dashboardStats.previousRevenue}
          currentValue={dashboardStats.revenue}
          icon={Landmark}
          iconColor="text-emerald-600"
          description="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border border-border">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-medium">Live FX Rates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {fxRates.slice(0, 4).map((rate) => (
                <div
                  key={rate.pair}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <CurrencyIcon
                      currency={rate.pair.split("/")[0]}
                      className="w-5 h-5"
                    />
                    <span className="font-mono text-sm font-medium">
                      {rate.pair}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold">
                      {rate.bid.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs ${
                        rate.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {rate.change >= 0 ? "+" : ""}
                      {rate.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <TransactionVolumeChart />
        </div>

        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductMixChart />
        <StatusDistributionChart />
        <ActivityFeed activities={mockActivities} />
      </div>

      <TransactionTable
        transactions={recentTransactions}
        title="Recent Transactions"
        onView={handleView}
        onEdit={handleEdit}
      />

      <TransactionModal
        transaction={selectedTx}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
}
