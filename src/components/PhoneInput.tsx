import * as React from 'react';
import './phone-pro.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

// Common country codes with flags and names
const countryCodes = [
  // Priority countries at the top
  { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  
  // Rest of countries in alphabetical order
  { code: '+971', country: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: '+54', country: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: '+43', country: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: '+880', country: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+32', country: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: '+501', country: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: '+591', country: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+55', country: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: '+1', country: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: '+56', country: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
  { code: '+57', country: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: '+506', country: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: '+420', country: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+45', country: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: '+593', country: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+20', country: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: '+358', country: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+502', country: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: '+30', country: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: '+504', country: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: '+36', country: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: '+62', country: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: '+254', country: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+52', country: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: '+95', country: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: '+977', country: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: '+31', country: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+234', country: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+505', country: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: '+47', country: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: '+507', country: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: '+51', country: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: '+63', country: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: '+48', country: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: '+92', country: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+595', country: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: '+7', country: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: '+966', country: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: '+503', country: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: '+46', country: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: '+94', country: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+41', country: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: '+90', country: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: '+380', country: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+598', country: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+58', country: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+84', country: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+27', country: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

interface PhoneInputProps {
  id: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name,
  value = '',
  onChange,
  disabled = false,
  required = false,
  className = '',
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = React.useState('+91');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    if (value) {
      // Extract country code and phone number from value
      const countryCodeMatch = value.match(/^\+(\d+)/);
      if (countryCodeMatch) {
        const code = '+' + countryCodeMatch[1];
        const country = countryCodes.find(c => c.code === code);
        if (country) {
          setSelectedCountryCode(code);
          setPhoneNumber(value.replace(code, '').trim());
        }
      }
    }
  }, [value]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, '');
    setPhoneNumber(newPhoneNumber);
    
    if (onChange) {
      const fullNumber = selectedCountryCode + ' ' + newPhoneNumber;
      onChange(fullNumber);
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code);
    setSearchQuery(''); // Clear search when selection is made
    
    if (onChange) {
      const fullNumber = code + ' ' + phoneNumber;
      onChange(fullNumber);
    }
  };

  // Filter countries based on search query
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return countryCodes;
    
    const query = searchQuery.toLowerCase();
    return countryCodes.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.includes(query) ||
      country.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex gap-2">
      <Select value={selectedCountryCode} onValueChange={handleCountryCodeChange} disabled={disabled}>
        <SelectTrigger className="w-[160px] h-10 bg-background border border-input hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors duration-200 group">
          <SelectValue placeholder="Select country">
            <span className="flex items-center gap-2">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">{countryCodes.find(c => c.code === selectedCountryCode)?.flag}</span>
              <span className="text-sm font-medium text-foreground">{selectedCountryCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[450px] w-[280px] p-0 border-2 border-border shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          {/* Search input with enhanced styling */}
          <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border p-3">
            <div className="flex items-center gap-2 px-2 py-2 bg-muted/50 rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground text-foreground"
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          {/* Country list with enhanced styling */}
          <div className="max-h-[350px] overflow-y-auto p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem 
                  key={country.code} 
                  value={country.code} 
                  className="cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground transition-all duration-200 hover:shadow-sm"
                >
                  <span className="flex items-center gap-3 py-2 px-2 w-full group/item">
                    <span className="text-xl flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">{country.flag}</span>
                    <span className="text-sm font-semibold text-foreground">{country.code}</span>
                    <span className="text-xs text-muted-foreground truncate flex-1 group-hover/item:text-foreground transition-colors duration-200">{country.name}</span>
                  </span>
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="text-muted-foreground mb-2">
                  <Search className="h-8 w-8 mx-auto opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  No countries found matching "{searchQuery}"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
      
      <Input
        id={id}
        name={name}
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handlePhoneChange}
        disabled={disabled}
        required={required}
        className={`flex-1 ${className}`}
      />
    </div>
  );
};

export default PhoneInput;
