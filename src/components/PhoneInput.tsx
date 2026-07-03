"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { marketingFormCompositeSegmentClass, marketingFormControlClass } from "@/lib/forms/marketing-form-classes";
import { formatMarketingPhoneValue } from "@/lib/forms/marketing-lead";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' }
];

const PhoneInput = ({ value, onChange, className = '', placeholder = 'Phone number' }: PhoneInputProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const onChangeRef = useRef(onChange);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const notifyChange = (country: Country, localNumber: string) => {
    onChangeRef.current(formatMarketingPhoneValue(country.dialCode, localNumber));
  };

  const applyCountry = (country: Country, localNumber: string) => {
    setSelectedCountry(country);
    notifyChange(country, localNumber);
  };

  // Auto-detect user's location and set default country
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get timezone-based location
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let countryCode = 'US'; // Default fallback

        // Simple timezone to country mapping
        if (timezone.includes('Europe/London')) countryCode = 'GB';
        else if (timezone.includes('Europe/Berlin')) countryCode = 'DE';
        else if (timezone.includes('Europe/Paris')) countryCode = 'FR';
        else if (timezone.includes('Europe/Rome')) countryCode = 'IT';
        else if (timezone.includes('Europe/Madrid')) countryCode = 'ES';
        else if (timezone.includes('Europe/Amsterdam')) countryCode = 'NL';
        else if (timezone.includes('Europe/Stockholm')) countryCode = 'SE';
        else if (timezone.includes('Europe/Oslo')) countryCode = 'NO';
        else if (timezone.includes('Europe/Copenhagen')) countryCode = 'DK';
        else if (timezone.includes('Europe/Helsinki')) countryCode = 'FI';
        else if (timezone.includes('Australia/')) countryCode = 'AU';
        else if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver')) countryCode = 'CA';
        else if (timezone.includes('Asia/Tokyo')) countryCode = 'JP';
        else if (timezone.includes('Asia/Shanghai')) countryCode = 'CN';
        else if (timezone.includes('Asia/Kolkata')) countryCode = 'IN';
        else if (timezone.includes('Asia/Singapore')) countryCode = 'SG';
        else if (timezone.includes('America/Sao_Paulo')) countryCode = 'BR';
        else if (timezone.includes('America/Mexico_City')) countryCode = 'MX';

        const defaultCountry = countries.find(c => c.code === countryCode) || countries[0];
        setSelectedCountry(defaultCountry);
        setPhoneNumber((currentNumber) => {
          notifyChange(defaultCountry, currentNumber);
          return currentNumber;
        });
      } catch (error) {
        console.log('Location detection failed, using US as default');
      }
    };

    detectLocation();
  }, []);

  // Sync when parent resets or hydrates a controlled value.
  useEffect(() => {
    if (!value) {
      setPhoneNumber('');
      return;
    }

    if (!value.includes(' ')) return;

    const parts = value.split(' ');
    const dialCode = parts[0];
    const number = parts.slice(1).join(' ');

    const country = countries.find(c => c.dialCode === dialCode);
    if (country) {
      setSelectedCountry(country);
      setPhoneNumber(number);
    }
  }, [value]);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 320),
    });
  };

  useLayoutEffect(() => {
    if (!isDropdownOpen) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();

    const onScrollOrResize = () => updateMenuPosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [isDropdownOpen]);

  const dropdownMenu =
    isDropdownOpen && menuPosition ? (
      <div
        className="fixed z-50 max-h-60 overflow-hidden rounded-md border border-border bg-background shadow-lg"
        style={{ top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }}
      >
        <div className="border-b border-border p-2">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(marketingFormControlClass({ fullWidth: true }), "h-9")}
          />
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                applyCountry(country, phoneNumber);
                setIsDropdownOpen(false);
                setSearchTerm("");
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left font-sans transition-colors hover:bg-accent focus:bg-accent focus:outline-none"
            >
              <span className="text-lg">{country.flag}</span>
              <span className="min-w-[50px] text-sm font-medium font-sans">{country.dialCode}</span>
              <span className="truncate text-sm font-sans text-muted-foreground">{country.name}</span>
            </button>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className={cn("marketing-form-surface relative w-full font-sans", className)}>
      {/* Backdrop before z-50 field so the menu stacks above it and stays clickable */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="relative z-50">
        <div
          className={cn(
            "flex h-10 w-full items-stretch rounded-md border border-input bg-background shadow-sm",
            "ring-offset-background transition-shadow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          )}
        >
        {/* Country Code Dropdown */}
        <div className="relative shrink-0">
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex h-full min-w-[100px] items-center gap-2 rounded-l-[calc(0.375rem-1px)] border-0 border-r border-input bg-transparent px-3 text-sm font-medium font-sans text-foreground transition-colors hover:bg-muted/50 focus-visible:outline-none"
          >
            <span className="text-lg leading-none">{selectedCountry.flag}</span>
            <span className="tabular-nums">{selectedCountry.dialCode}</span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 transition-transform", isDropdownOpen && "rotate-180")}
            />
          </button>
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const next = e.target.value;
            setPhoneNumber(next);
            notifyChange(selectedCountry, next);
          }}
          placeholder={placeholder}
          className={cn(marketingFormCompositeSegmentClass, "rounded-r-[calc(0.375rem-1px)]")}
        />
        </div>
      </div>
      {typeof document !== "undefined" && dropdownMenu
        ? createPortal(dropdownMenu, document.body)
        : null}
    </div>
  );
};

export default PhoneInput;