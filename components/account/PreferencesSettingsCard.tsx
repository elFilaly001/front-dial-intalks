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
        <h3 className="text-xl font-semibold">Preferences & Settings</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Change Password</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWithLabel
                  label="Current password"
                  name="currentPassword"
                  placeHolder="Current password"
                />
                <InputWithLabel
                  label="New password"
                  name="newPassword"
                  placeHolder="New password"
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
                  Alerts
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.rankingDrops}
                    onChange={toggle("rankingDrops")}
                    className="w-4 h-4 rounded"
                  />
                  Ranking drops
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.sentimentSpike}
                    onChange={toggle("sentimentSpike")}
                    className="w-4 h-4 rounded"
                  />
                  Sentiment spike
                </label>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Brand Management</h5>
                <p className="text-sm text-gray-600">Manage brands and access for your account.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Manage Brands
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Manage Subscription</h5>
                <p className="text-sm text-gray-600">Change or view subscription details.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Upgrade Subscription
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h5 className="font-medium">Add users</h5>
                <p className="text-sm text-gray-600">Invite new team members and set roles.</p>
              </div>
              <div>
                <Button className="bg-gradient-to-br from-[#3fb3ff] to-[#36a2f0] text-white shadow-lg h-10">
                  Invite user
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
