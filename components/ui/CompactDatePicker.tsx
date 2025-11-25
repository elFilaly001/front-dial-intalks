// components/compact-date-picker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./label";
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface CompactDatePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

const PRESETS = [
  { label: "Aujourd'hui", days: 0 },
  { label: "Hier", days: 1 },
  { label: "7 derniers jours", days: 7 },
  { label: "14 derniers jours", days: 14 },
  { label: "30 derniers jours", days: 30 },
  { label: "Ce mois-ci", type: "this_month" },
  { label: "Le mois dernier", type: "last_month" },
];

export function CompactDatePicker({
  dateRange,
  onDateRangeChange,
  className,
}: CompactDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // const applyPreset = (days: number) => {
  //   const to = new Date();
  //   const from = new Date();

  //   if (days === 0) {
  //     from.setHours(0, 0, 0, 0);
  //     to.setHours(23, 59, 59, 999);
  //   } else {
  //     from.setDate(from.getDate() - days);
  //     from.setHours(0, 0, 0, 0);
  //     to.setHours(23, 59, 59, 999);
  //   }

  //   onDateRangeChange({ from, to });
  //   setIsOpen(false);
  // };

  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) {
      return "Période";
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd MMM")} - ${format(
        dateRange.to,
        "dd MMM yyyy"
      )}`;
    }
    return "Période";
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex-1 justify-start text-left font-normal",
              !dateRange.from && !dateRange.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 grid grid-cols-3" align="start">
          <RadioGroup defaultValue="comfortable">
            <div className="flex flex-col gap-5 p-5">
              {PRESETS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <RadioGroupItem value={item.label} id={item.label} />
                  <Label htmlFor={item.label}>{item.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
          <div className="col-span-2">
            <Calendar
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateRangeChange({
                    from: range.from,
                    to: range.to,
                  });
                  setIsOpen(false);
                }
              }}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
