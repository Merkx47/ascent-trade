import { cn } from "@/lib/utils";

interface CurrencyIconProps {
  currency: string;
  className?: string;
  showSymbol?: boolean;
}

export function CurrencyIcon({ currency, className, showSymbol = true }: CurrencyIconProps) {
  const currencyConfig: Record<string, { symbol: string; bgColor: string; textColor: string }> = {
    NGN: { symbol: "₦", bgColor: "bg-green-500/10", textColor: "text-green-600 dark:text-green-400" },
    USD: { symbol: "$", bgColor: "bg-blue-500/10", textColor: "text-blue-600 dark:text-blue-400" },
    EUR: { symbol: "€", bgColor: "bg-yellow-500/10", textColor: "text-yellow-600 dark:text-yellow-400" },
    GBP: { symbol: "£", bgColor: "bg-purple-500/10", textColor: "text-purple-600 dark:text-purple-400" },
    CNY: { symbol: "¥", bgColor: "bg-red-500/10", textColor: "text-red-600 dark:text-red-400" },
    CHF: { symbol: "Fr", bgColor: "bg-orange-500/10", textColor: "text-orange-600 dark:text-orange-400" },
    JPY: { symbol: "¥", bgColor: "bg-pink-500/10", textColor: "text-pink-600 dark:text-pink-400" },
  };

  const config = currencyConfig[currency] || { symbol: currency, bgColor: "bg-muted", textColor: "text-muted-foreground" };

  if (!showSymbol) {
    return (
      <span className={cn("font-mono text-xs font-semibold", config.textColor, className)}>
        {currency}
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-sm", config.bgColor, config.textColor, className)}>
      {config.symbol}
    </div>
  );
}

export function formatCurrencyAmount(amount: string | number, currency: string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  
  const currencySymbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    CHF: "Fr",
    JPY: "¥",
  };
  
  const symbol = currencySymbols[currency] || "";
  
  if (num >= 1000000000) {
    return `${symbol}${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `${symbol}${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${symbol}${(num / 1000).toFixed(2)}K`;
  }
  
  return `${symbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatFullAmount(amount: string | number, currency: string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  
  const currencySymbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    CHF: "Fr",
    JPY: "¥",
  };
  
  const symbol = currencySymbols[currency] || "";
  
  return `${symbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
