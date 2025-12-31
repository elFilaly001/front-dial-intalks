import ForgotPassword from "@/components/auth/ForgotPassword";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const page = () => {
  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader>
          <div className="flex flex-col py-5 ">
            <h2 className="text-3xl font-semibold">
              Don’t worry, it happens to everyone! 👋🏻
            </h2>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
