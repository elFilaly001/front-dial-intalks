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
        <h3 className="text-xl font-semibold">Mes informations personnelles</h3>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithLabel
            label="Nom complet"
            name="fullName"
            placeHolder="Jean Dupont"
            value={form.fullName}
            onChange={handleChange("fullName")}
          />
          <InputWithLabel
            label="Adresse e-mail"
            name="email"
            placeHolder="jean.dupont@exemple.com"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
          />

          <InputWithLabel
            label="Nom de l'entreprise"
            name="company"
            placeHolder="Acme SARL"
            value={form.company}
            onChange={handleChange("company")}
          />
          <InputWithLabel
            label="Fonction"
            name="jobTitle"
            placeHolder="Chef de produit"
            value={form.jobTitle}
            onChange={handleChange("jobTitle")}
          />

          <InputWithLabel
            label="Site web"
            name="website"
            placeHolder="https://exemple.com"
            value={form.website}
            onChange={handleChange("website")}
          />
          <InputWithLabel
            label="Pays"
            name="country"
            placeHolder="Maroc"
            value={form.country}
            onChange={handleChange("country")}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="language" className="text-xs">
              Langue
            </label>
            <select
              id="language"
              value={form.language}
              onChange={handleChange("language")}
              className="h-10 rounded-md border border-gray-200 px-3 text-sm placeholder:text-gray-600"
            >
              <option value="English">Anglais</option>
              <option value="Français">Français</option>
              <option value="العربية">العربية</option>
              <option value="Español">Español</option>
            </select>
          </div>
        </div>

        {/* Save button positioned bottom-right like the screenshot */}
        <div className="absolute right-4 bottom-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10 px-4 rounded-md hover:opacity-95"
          >
            Enregistrer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
