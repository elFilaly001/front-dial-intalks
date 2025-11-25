"use client";
import React, { useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const InputWithLabel = ({
  label,
  name,
  type,
  onChange,
  value,
  error,
  readOnly,
  placeHolder,
  className,
}: {
  label?: string;
  name: string;
  type?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
  className?: string;
}) => {
  const [typeInput, setTypeInput] = useState<string>(type ?? "text");

  const handleChnage = (type: string) => {
    setTypeInput(type);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={name} className="text-end text-xs">
          {label}
        </Label>
      )}
      <div className="">
        <div className="relative">
          <Input
            className={`${
              !error || "border-[0.2px] border-red-500"
            }  border-gray-200 border placeholder:text-gray-600 ${className}`}
            value={value}
            onChange={onChange}
            type={typeInput}
            id={name}
            readOnly={readOnly ?? false}
            placeholder={placeHolder ? placeHolder : label}
          />
          {type === "password" && (
            <>
              {typeInput === "password" && (
                <Eye
                  className="text-gray-700 w-4 h-4 absolute right-2 top-1/2 bottom-1/2 -translate-y-1/2"
                  onClick={() => handleChnage("text")}
                />
              )}
              {typeInput === "text" && (
                <EyeOffIcon
                  className="text-gray-700 w-4 h-4 absolute right-2 top-1/2 bottom-1/2 -translate-y-1/2"
                  onClick={() => handleChnage("password")}
                />
              )}
            </>
          )}
        </div>

        <span className={`text-red-600 text-sm pt-2`}>{error}</span>
      </div>
    </div>
  );
};

export default InputWithLabel;
