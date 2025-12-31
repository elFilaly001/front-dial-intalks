"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputWithLabel from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";

export default function SubscriptionBillingCard() {
  return (
    <Card className="rounded-lg border border-gray-200">
      <CardHeader>
        <h3 className="text-xl font-semibold">Abonnement et facturation</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Nom du forfait</div>
                    <div className="mt-2">Pro</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Prix</div>
                  <div className="mt-2">49 $ / mois</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Date d&apos;expiration</div>
              <div className="mt-2">2026-12-31</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Annuler l&apos;abonnement</div>
              <div className="mt-2">
                <Button className="bg-transparent border border-gray-200 text-gray-800 h-8">
                  Annuler
                </Button>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Méthodes de paiement</div>
              <div className="mt-3 flex items-center gap-3 border rounded-md px-3 py-2">
                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">Visa</span>
                <span className="text-sm text-gray-700">**** **** **** 4242</span>
                <span className="ml-auto text-xs text-gray-500">Exp 12/25</span>
              </div>
              <div className="mt-4">
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Ajouter un moyen de paiement
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Informations de facturation</div>
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithLabel label="Nom" name="billingName" placeHolder="Jean Dupont" />
              <InputWithLabel label="Adresse de facturation" name="billingAddress" placeHolder="123 Rue Principale, Casablanca" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithLabel label="Numéro de TVA" name="vat" placeHolder="TVA-123456" />
              <InputWithLabel label="Pays" name="billingCountry" placeHolder="Maroc" />
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Historique des factures</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                  <div>Facture n°12345</div>
                  <div className="text-sm text-gray-700">49 $ — 2025-10-01</div>
                </div>
                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                  <div>Facture n°12222</div>
                  <div className="text-sm text-gray-700">49 $ — 2025-09-01</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
