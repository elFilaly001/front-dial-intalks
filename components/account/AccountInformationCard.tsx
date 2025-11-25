"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputWithLabel from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";

type AccountData = {
  fullName?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  website?: string;
  country?: string;
  language?: string;
};

export default function AccountInformationCard({
  initial = {},
  onSave,
}: {
  initial?: AccountData;
  onSave?: (data: AccountData) => void;
}) {
  const [form, setForm] = useState<AccountData>({
    fullName: initial.fullName ?? "",
    email: initial.email ?? "",
    company: initial.company ?? "",
    jobTitle: initial.jobTitle ?? "",
    website: initial.website ?? "",
    country: initial.country ?? "",
    language: initial.language ?? "English",
  });

  const handleChange = (key: keyof AccountData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };

  const handleSave = () => {
    if (onSave) onSave(form);
    // For now we just log — consumer can pass onSave to hook up persistence
    console.log("Saved account info", form);
  };

  return (
    <Card className="rounded-lg border border-gray-200">
      <CardHeader>
        <h3 className="text-xl font-semibold">My personal information</h3>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithLabel
            label="Full name"
            name="fullName"
            placeHolder="John Doe"
            value={form.fullName}
            onChange={handleChange("fullName")}
          />
          <InputWithLabel
            label="Email address"
            name="email"
            placeHolder="john.doe@example.com"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
          />

          <InputWithLabel
            label="Company name"
            name="company"
            placeHolder="Acme Corp"
            value={form.company}
            onChange={handleChange("company")}
          />
          <InputWithLabel
            label="Job title"
            name="jobTitle"
            placeHolder="Product Manager"
            value={form.jobTitle}
            onChange={handleChange("jobTitle")}
          />

          <InputWithLabel
            label="Website"
            name="website"
            placeHolder="https://example.com"
            value={form.website}
            onChange={handleChange("website")}
          />
          <InputWithLabel
            label="Country"
            name="country"
            placeHolder="Morocco"
            value={form.country}
            onChange={handleChange("country")}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="language" className="text-xs">
              Language
            </label>
            <select
              id="language"
              value={form.language}
              onChange={handleChange("language")}
              className="h-10 rounded-md border border-gray-200 px-3 text-sm placeholder:text-gray-600"
            >
              <option>English</option>
              <option>Français</option>
              <option>العربية</option>
              <option>Español</option>
            </select>
          </div>
        </div>

        {/* Save button positioned bottom-right like the screenshot */}
        <div className="absolute right-4 bottom-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10 px-4 rounded-md hover:opacity-95"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
