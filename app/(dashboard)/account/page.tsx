import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import AccountInformationCard from "@/components/account/AccountInformationCard";
import PreferencesSettingsCard from "@/components/account/PreferencesSettingsCard";
import SubscriptionBillingCard from "@/components/account/SubscriptionBillingCard";

const tabs = [
  {
    label: "Account",
    value: "account",
    component: <AccountInformationCard />,
  },
  {
    label: "Preference & Settings",
    value: "preference-settings",
    component: <PreferencesSettingsCard />,
  },
  {
    label: "Subscription & Billing",
    value: "subscription-billing",
    component: <SubscriptionBillingCard />,
  },
];

const Page = () => {
  return (
    <Suspense>
      <div className="@container/main flex flex-col">
        <Tabs defaultValue={"account"} className="my-2">
          {/* Make the tab list a flex container so triggers can grow equally */}
          <TabsList className="flex w-full text-white border dark:border-gray-800 border-gray-200">
            {tabs.map((tab) => (
              <TabsTrigger
                className="flex-1 text-center bg-white dark:data-[state=active]:bg-main data-[state=active]:bg-main data-[state=active]:text-white text-gray-700"
                key={tab.label}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Suspense>
  );
};

export default Page;
