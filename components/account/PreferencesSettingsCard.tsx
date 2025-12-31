"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputWithLabel from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";

export default function PreferencesSettingsCard() {
  const [notifications, setNotifications] = useState({
    alerts: false,
    rankingDrops: false,
    sentimentSpike: false,
  });

  const toggle = (key: keyof typeof notifications) => () =>
    setNotifications((s) => ({ ...s, [key]: !s[key] }));

  return (
    <Card className="rounded-lg border border-gray-200">
      <CardHeader>
        <h3 className="text-xl font-semibold">Préférences et paramètres</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Changer le mot de passe</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWithLabel
                  label="Mot de passe actuel"
                  name="currentPassword"
                  placeHolder="Mot de passe actuel"
                />
                <InputWithLabel
                  label="Nouveau mot de passe"
                  name="newPassword"
                  placeHolder="Nouveau mot de passe"
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Notifications</h4>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.alerts}
                    onChange={toggle("alerts")}
                    className="w-4 h-4 rounded"
                  />
                  Alertes
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.rankingDrops}
                    onChange={toggle("rankingDrops")}
                    className="w-4 h-4 rounded"
                  />
                  Baisse du classement
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.sentimentSpike}
                    onChange={toggle("sentimentSpike")}
                    className="w-4 h-4 rounded"
                  />
                  Pic de sentiment
                </label>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Gestion des marques</h5>
                <p className="text-sm text-gray-600">Gérer les marques et les accès pour votre compte.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Gérer les marques
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Gérer l&apos;abonnement</h5>
                <p className="text-sm text-gray-600">Modifier ou consulter les détails de l&apos;abonnement.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Mettre à niveau l&apos;abonnement
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Ajouter des utilisateurs</h5>
                <p className="text-sm text-gray-600">Inviter de nouveaux membres et définir des rôles.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Inviter un utilisateur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
