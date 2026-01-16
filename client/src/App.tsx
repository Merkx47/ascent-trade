import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { FxRatesProvider } from "@/hooks/use-fx-rates";
import { LanguageProvider } from "@/components/LanguageSwitcher";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckerQueueProvider } from "@/contexts/CheckerQueueContext";

import Login from "@/pages/Login";
import OtpVerification from "@/pages/OtpVerification";
import Dashboard from "@/pages/Dashboard";
import FormM from "@/pages/FormM";
import FxTrading from "@/pages/FxTrading";
import ProductPage from "@/pages/ProductPage";
import Notifications from "@/pages/Notifications";
import Customers from "@/pages/Customers";
import Reports from "@/pages/Reports";
import CustomReport from "@/pages/reports/CustomReport";
import MISReport from "@/pages/reports/MISReport";
import RegulatoryReport from "@/pages/reports/RegulatoryReport";
import CBNMonthlyReport from "@/pages/reports/CBNMonthlyReport";
import Compliance from "@/pages/Compliance";
import Settings from "@/pages/Settings";
import UserManagement from "@/pages/UserManagement";
import CheckerQueue from "@/pages/CheckerQueue";
import NotFound from "@/pages/not-found";

function AppLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between h-14 px-4 border-b-2 border-border bg-background shrink-0 relative z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Badge variant="outline" className="border-2 hidden sm:flex">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                System Online
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <GoogleTranslate />
              <Button variant="outline" size="icon" className="border-2 relative" data-testid="button-notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  5
                </span>
              </Button>
              <Button variant="outline" size="icon" className="border-2" data-testid="button-refresh">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  const { isAuthenticated, isOtpRequired } = useAuth();

  // Show OTP screen if credentials validated but OTP not yet verified
  if (isOtpRequired) {
    return <OtpVerification />;
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/form-m" component={FormM} />
        <Route path="/form-a">
          <ProductPage productCode="FORMA" />
        </Route>
        <Route path="/form-nxp">
          <ProductPage productCode="FORMNXP" />
        </Route>
        <Route path="/paar">
          <ProductPage productCode="PAAR" />
        </Route>
        <Route path="/import-lc">
          <ProductPage productCode="IMPORTLC" />
        </Route>
        <Route path="/bfc">
          <ProductPage productCode="BFC" />
        </Route>
        <Route path="/shipping-docs">
          <ProductPage productCode="SHIPPINGDOC" />
        </Route>
        <Route path="/fx-trading" component={FxTrading} />
        <Route path="/trade-loans">
          <ProductPage productCode="LOAN" />
        </Route>
        <Route path="/inward-payments">
          <ProductPage productCode="INWCP" />
        </Route>
        <Route path="/outward-payments">
          <ProductPage productCode="DOMOUTAC" />
        </Route>
        <Route path="/customers" component={Customers} />
        <Route path="/reports" component={Reports} />
        <Route path="/reports/custom" component={CustomReport} />
        <Route path="/reports/mis" component={MISReport} />
        <Route path="/reports/regulatory" component={RegulatoryReport} />
        <Route path="/reports/cbn" component={CBNMonthlyReport} />
        <Route path="/compliance" component={Compliance} />
        <Route path="/settings" component={Settings} />
        <Route path="/user-management" component={UserManagement} />
        <Route path="/checker-queue" component={CheckerQueue} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ascent-trade-theme">
        <AuthProvider>
          <FxRatesProvider>
            <CheckerQueueProvider>
              <LanguageProvider>
                <TooltipProvider>
                  <Router />
                  <Toaster />
                </TooltipProvider>
              </LanguageProvider>
            </CheckerQueueProvider>
          </FxRatesProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
