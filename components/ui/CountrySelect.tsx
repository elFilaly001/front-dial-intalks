"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";

const countries = [
  { code: "AF", label: "Afghanistan" },
  { code: "AL", label: "Albania" },
  { code: "DZ", label: "Algeria" },
  { code: "AD", label: "Andorra" },
  { code: "AO", label: "Angola" },
  { code: "AG", label: "Antigua and Barbuda" },
  { code: "AR", label: "Argentina" },
  { code: "AM", label: "Armenia" },
  { code: "AU", label: "Australia" },
  { code: "AT", label: "Austria" },
  { code: "AZ", label: "Azerbaijan" },
  { code: "BS", label: "Bahamas" },
  { code: "BH", label: "Bahrain" },
  { code: "BD", label: "Bangladesh" },
  { code: "BB", label: "Barbados" },
  { code: "BY", label: "Belarus" },
  { code: "BE", label: "Belgium" },
  { code: "BZ", label: "Belize" },
  { code: "BJ", label: "Benin" },
  { code: "BT", label: "Bhutan" },
  { code: "BO", label: "Bolivia" },
  { code: "BA", label: "Bosnia and Herzegovina" },
  { code: "BW", label: "Botswana" },
  { code: "BR", label: "Brazil" },
  { code: "BN", label: "Brunei" },
  { code: "BG", label: "Bulgaria" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BI", label: "Burundi" },
  { code: "KH", label: "Cambodia" },
  { code: "CM", label: "Cameroon" },
  { code: "CA", label: "Canada" },
  { code: "CV", label: "Cape Verde" },
  { code: "CF", label: "Central African Republic" },
  { code: "TD", label: "Chad" },
  { code: "CL", label: "Chile" },
  { code: "CN", label: "China" },
  { code: "CO", label: "Colombia" },
  { code: "KM", label: "Comoros" },
  { code: "CG", label: "Congo (Brazzaville)" },
  { code: "CD", label: "Congo (Kinshasa)" },
  { code: "CR", label: "Costa Rica" },
  { code: "CI", label: "Côte d'Ivoire" },
  { code: "HR", label: "Croatia" },
  { code: "CU", label: "Cuba" },
  { code: "CY", label: "Cyprus" },
  { code: "CZ", label: "Czech Republic" },
  { code: "DK", label: "Denmark" },
  { code: "DJ", label: "Djibouti" },
  { code: "DM", label: "Dominica" },
  { code: "DO", label: "Dominican Republic" },
  { code: "EC", label: "Ecuador" },
  { code: "EG", label: "Egypt" },
  { code: "SV", label: "El Salvador" },
  { code: "GQ", label: "Equatorial Guinea" },
  { code: "ER", label: "Eritrea" },
  { code: "EE", label: "Estonia" },
  { code: "SZ", label: "Eswatini" },
  { code: "ET", label: "Ethiopia" },
  { code: "FJ", label: "Fiji" },
  { code: "FI", label: "Finland" },
  { code: "FR", label: "France" },
  { code: "GA", label: "Gabon" },
  { code: "GM", label: "Gambia" },
  { code: "GE", label: "Georgia" },
  { code: "DE", label: "Germany" },
  { code: "GH", label: "Ghana" },
  { code: "GR", label: "Greece" },
  { code: "GD", label: "Grenada" },
  { code: "GT", label: "Guatemala" },
  { code: "GN", label: "Guinea" },
  { code: "GW", label: "Guinea-Bissau" },
  { code: "GY", label: "Guyana" },
  { code: "HT", label: "Haiti" },
  { code: "HN", label: "Honduras" },
  { code: "HU", label: "Hungary" },
  { code: "IS", label: "Iceland" },
  { code: "IN", label: "India" },
  { code: "ID", label: "Indonesia" },
  { code: "IR", label: "Iran" },
  { code: "IQ", label: "Iraq" },
  { code: "IE", label: "Ireland" },
  { code: "IL", label: "Israel" },
  { code: "IT", label: "Italy" },
  { code: "JM", label: "Jamaica" },
  { code: "JP", label: "Japan" },
  { code: "JO", label: "Jordan" },
  { code: "KZ", label: "Kazakhstan" },
  { code: "KE", label: "Kenya" },
  { code: "KI", label: "Kiribati" },
  { code: "KP", label: "North Korea" },
  { code: "KR", label: "South Korea" },
  { code: "KW", label: "Kuwait" },
  { code: "KG", label: "Kyrgyzstan" },
  { code: "LA", label: "Laos" },
  { code: "LV", label: "Latvia" },
  { code: "LB", label: "Lebanon" },
  { code: "LS", label: "Lesotho" },
  { code: "LR", label: "Liberia" },
  { code: "LY", label: "Libya" },
  { code: "LI", label: "Liechtenstein" },
  { code: "LT", label: "Lithuania" },
  { code: "LU", label: "Luxembourg" },
  { code: "MG", label: "Madagascar" },
  { code: "MW", label: "Malawi" },
  { code: "MY", label: "Malaysia" },
  { code: "MV", label: "Maldives" },
  { code: "ML", label: "Mali" },
  { code: "MT", label: "Malta" },
  { code: "MH", label: "Marshall Islands" },
  { code: "MR", label: "Mauritania" },
  { code: "MU", label: "Mauritius" },
  { code: "MX", label: "Mexico" },
  { code: "FM", label: "Micronesia" },
  { code: "MD", label: "Moldova" },
  { code: "MC", label: "Monaco" },
  { code: "MN", label: "Mongolia" },
  { code: "ME", label: "Montenegro" },
  { code: "MA", label: "Morocco" },
  { code: "MZ", label: "Mozambique" },
  { code: "MM", label: "Myanmar" },
  { code: "NA", label: "Namibia" },
  { code: "NR", label: "Nauru" },
  { code: "NP", label: "Nepal" },
  { code: "NL", label: "Netherlands" },
  { code: "NZ", label: "New Zealand" },
  { code: "NI", label: "Nicaragua" },
  { code: "NE", label: "Niger" },
  { code: "NG", label: "Nigeria" },
  { code: "MK", label: "North Macedonia" },
  { code: "NO", label: "Norway" },
  { code: "OM", label: "Oman" },
  { code: "PK", label: "Pakistan" },
  { code: "PW", label: "Palau" },
  { code: "PA", label: "Panama" },
  { code: "PG", label: "Papua New Guinea" },
  { code: "PY", label: "Paraguay" },
  { code: "PE", label: "Peru" },
  { code: "PH", label: "Philippines" },
  { code: "PL", label: "Poland" },
  { code: "PT", label: "Portugal" },
  { code: "QA", label: "Qatar" },
  { code: "RO", label: "Romania" },
  { code: "RU", label: "Russia" },
  { code: "RW", label: "Rwanda" },
  { code: "KN", label: "Saint Kitts and Nevis" },
  { code: "LC", label: "Saint Lucia" },
  { code: "VC", label: "Saint Vincent and the Grenadines" },
  { code: "WS", label: "Samoa" },
  { code: "SM", label: "San Marino" },
  { code: "ST", label: "São Tomé and Príncipe" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "SN", label: "Senegal" },
  { code: "RS", label: "Serbia" },
  { code: "SC", label: "Seychelles" },
  { code: "SL", label: "Sierra Leone" },
  { code: "SG", label: "Singapore" },
  { code: "SK", label: "Slovakia" },
  { code: "SI", label: "Slovenia" },
  { code: "SB", label: "Solomon Islands" },
  { code: "SO", label: "Somalia" },
  { code: "ZA", label: "South Africa" },
  { code: "SS", label: "South Sudan" },
  { code: "ES", label: "Spain" },
  { code: "LK", label: "Sri Lanka" },
  { code: "SD", label: "Sudan" },
  { code: "SR", label: "Suriname" },
  { code: "SE", label: "Sweden" },
  { code: "CH", label: "Switzerland" },
  { code: "SY", label: "Syria" },
  { code: "TW", label: "Taiwan" },
  { code: "TJ", label: "Tajikistan" },
  { code: "TZ", label: "Tanzania" },
  { code: "TH", label: "Thailand" },
  { code: "TL", label: "Timor-Leste" },
  { code: "TG", label: "Togo" },
  { code: "TO", label: "Tonga" },
  { code: "TT", label: "Trinidad and Tobago" },
  { code: "TN", label: "Tunisia" },
  { code: "TR", label: "Turkey" },
  { code: "TM", label: "Turkmenistan" },
  { code: "TV", label: "Tuvalu" },
  { code: "UG", label: "Uganda" },
  { code: "UA", label: "Ukraine" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "UY", label: "Uruguay" },
  { code: "UZ", label: "Uzbekistan" },
  { code: "VU", label: "Vanuatu" },
  { code: "VA", label: "Vatican City" },
  { code: "VE", label: "Venezuela" },
  { code: "VN", label: "Vietnam" },
  { code: "YE", label: "Yemen" },
  { code: "ZM", label: "Zambia" },
  { code: "ZW", label: "Zimbabwe" },
];

function CountrySelect({
  value,
  onChange,
  error,
}: {
  error?: string;
  value?: string;
  onChange: (e: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={"country"} className="text-xs">
        Country
      </Label>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full h-9 bg-background border-input justify-between hover:bg-accent hover:text-accent-foreground"
            >
              {value ? (
                <div className="flex items-center gap-2.5">
                  <ReactCountryFlag
                    countryCode={
                      countries.find((framework) => framework.code === value)
                        ?.code || ""
                    }
                    svg
                    style={{ width: "1em", height: "1em" }}
                  />
                  {
                    countries.find((framework) => framework.code === value)
                      ?.label
                  }
                </div>
              ) : (
                <span className="text-muted-foreground">
                  Select country...
                </span>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] h-[250px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search country..."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.code}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{ width: "1em", height: "1em" }}
                      />
                      <span>{country.label}</span>
                      <Check
                        className={cn(
                          "ml-auto",
                          value === country.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <span className={`text-red-600 text-sm pt-2`}>{error}</span>
      </div>
    </div>
  );
}

export default CountrySelect;