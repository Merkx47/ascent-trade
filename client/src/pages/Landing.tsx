import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import {
  Shield,
  Zap,
  Globe,
  BarChart3,
  FileText,
  Lock,
  ArrowRight,
  Check,
  Building2,
  Ship,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Users,
  Clock,
  Award,
  ChevronRight,
  Play,
  CircleDollarSign,
  Landmark,
  LineChart,
  ShieldCheck,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Straight-Through Processing",
    description: "Automate end-to-end trade workflows with intelligent routing, exception handling, and real-time status tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    description: "Built-in CBN validation, OFAC screening, sanctions checking, and automatic regulatory reporting for every transaction.",
  },
  {
    icon: Globe,
    title: "SWIFT Integration",
    description: "Seamless MT-4xx and MT-7xx message generation with real-time transmission status and acknowledgment tracking.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards and reports for transaction monitoring, performance insights, and executive reporting.",
  },
  {
    icon: FileText,
    title: "Smart Document Management",
    description: "OCR-powered document processing with intelligent validation, secure storage, and complete version control.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with role-based access control, complete audit trails, and end-to-end data encryption.",
  },
];

const products = [
  { name: "Form M Processing", icon: FileText, count: "2,340", trend: "+12%" },
  { name: "Import Letter of Credit", icon: Ship, count: "1,456", trend: "+8%" },
  { name: "Form A Processing", icon: CreditCard, count: "987", trend: "+15%" },
  { name: "Bills for Collection", icon: Wallet, count: "654", trend: "+5%" },
  { name: "FX Trading", icon: RefreshCw, count: "3,210", trend: "+22%" },
  { name: "Trade Loans", icon: Landmark, count: "432", trend: "+18%" },
];

const stats = [
  { label: "Daily Transactions", value: "NGN 45B+", icon: TrendingUp },
  { label: "Active Customers", value: "2,500+", icon: Users },
  { label: "Processing Time", value: "<2 hrs", icon: Clock },
  { label: "Uptime SLA", value: "99.99%", icon: Award },
];

const testimonials = [
  {
    quote: "Ascent Trade has transformed our import operations. Processing time reduced by 60%.",
    author: "Adebayo Ogunlesi",
    role: "CFO, Dangote Industries",
    company: "Dangote Industries Ltd",
  },
  {
    quote: "The compliance automation alone has saved us countless hours and eliminated manual errors.",
    author: "Ngozi Okonkwo",
    role: "Trade Finance Manager",
    company: "Flour Mills of Nigeria",
  },
  {
    quote: "Real-time FX trading with integrated settlement has improved our treasury operations significantly.",
    author: "Chukwuemeka Eze",
    role: "Treasury Head",
    company: "Nigerian Breweries Plc",
  },
];

export default function Landing() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">Ascent Trade</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Union Bank</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={login} data-testid="button-login">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-28 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                  <Zap className="w-4 h-4" />
                  Nigeria's Premier Trade Finance Platform
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    Enterprise Trade
                    <span className="block bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Finance Platform</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                    Streamline your trade operations with Union Bank's integrated solution for Letters of Credit, Form M/A processing, FX trading, and regulatory compliance.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={login} className="text-base h-12 px-8" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base h-12 px-8" data-testid="button-watch-demo">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  {[
                    { icon: Check, text: "CBN Compliant" },
                    { icon: Check, text: "SWIFT Certified" },
                    { icon: Check, text: "ISO 27001" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                        <item.icon className="h-3 w-3 text-green-500" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-card border border-border rounded-2xl p-6 shadow-lg">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Live Dashboard</p>
                          <p className="text-xs text-muted-foreground">Real-time metrics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((stat) => (
                        <Card key={stat.label} className="border border-border bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <stat.icon className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{stat.label}</span>
                            </div>
                            <p className="text-xl font-bold">{stat.value}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Activity</p>
                      {[
                        { ref: "FM-2024-0847", amount: "USD 2.5M", status: "Approved", icon: ArrowUpRight, color: "text-green-500" },
                        { ref: "LC-2024-0156", amount: "EUR 1.8M", status: "Processing", icon: RefreshCw, color: "text-blue-500" },
                        { ref: "FX-2024-0923", amount: "USD 5.0M", status: "Settled", icon: Check, color: "text-green-500" },
                      ].map((item) => (
                        <div key={item.ref} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${item.color}`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-mono text-sm font-medium">{item.ref}</p>
                              <p className="text-xs text-muted-foreground">{item.status}</p>
                            </div>
                          </div>
                          <p className="font-mono text-sm font-semibold">{item.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 border-y border-border bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
              {["Dangote Industries", "BUA Group", "Flour Mills", "Nigerian Breweries", "Lafarge Africa", "Nestle Nigeria", "MTN Nigeria", "Zenith Bank"].map((company) => (
                <span key={company} className="text-sm font-semibold text-muted-foreground">{company}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
                Platform Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                World-Class Trade Finance Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for enterprise-scale operations with the reliability, security, and compliance standards that Nigerian businesses demand.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border border-border group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="py-24 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
                Trade Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Product Suite
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete coverage for all your trade finance needs with integrated workflows and full regulatory compliance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.name} className="border border-border hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <product.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                        <ArrowUpRight className="w-4 h-4" />
                        {product.trend}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary">{product.count}</p>
                    <p className="text-xs text-muted-foreground mt-1">transactions this month</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
                Customer Success
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Nigeria's Leading Enterprises
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author} className="border border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {testimonial.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-br from-primary to-cyan-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="max-w-4xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Trade Operations?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join Nigeria's leading enterprises using Ascent Trade to streamline their international trade operations and achieve operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={login} className="text-base h-12 px-8" data-testid="button-cta-get-started">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12 px-8 border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Ascent Trade</p>
                  <p className="text-xs text-muted-foreground">Union Bank</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Nigeria's premier enterprise trade finance platform, powered by Union Bank.
              </p>
            </div>
            
            {[
              { title: "Products", links: ["Form M", "Import LC", "FX Trading", "Trade Loans"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Support", "Status"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-semibold mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Union Bank of Nigeria Plc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
