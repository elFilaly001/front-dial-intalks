import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";

const PhoneNumber = ({
  label,
  value,
  onChange,
  error,
}: {
  error?: string;
  label: string;
  value?: string;
  onChange: (e: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="phone" className="text-xs">{label}</Label>
      <div>
        <PhoneInput
          country={"ma"}
          onChange={(e) => onChange(e)}
          value={value}
          inputProps={{
            name: "phone",
            id: "phone",
          }}
          inputStyle={{
            backgroundColor: "transparent",
          }}
          inputClass={` !border  !border-gray-200 !w-full flex h-9 w-full rounded-md bg-transparent px-3 !py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
        />
        <span className={`text-red-600 text-sm pt-2`}>{error}</span>
      </div>
    </div>
  );
};

export default PhoneNumber;
