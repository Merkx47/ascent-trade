import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English" },
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yoruba" },
  { code: "ig", name: "Igbo" },
];

export function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleTranslate = () => {
      if ((window as any).google?.translate) {
        setIsLoaded(true);
      }
    };
    
    checkGoogleTranslate();
    const interval = setInterval(checkGoogleTranslate, 500);
    
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    
    const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
    } else {
      const cookieValue = langCode === "en" ? "" : `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
      window.location.reload();
    }
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-2 border-border"
            data-testid="button-language-switcher"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium hidden sm:inline">{currentLanguage.name}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px] z-[9999]">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer ${currentLang === lang.code ? "bg-accent" : ""}`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
