import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleQuestionMark } from "lucide-react";
const ToolTipsProvider = ({ title }: { title: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"icon"} variant="ghost" className="h-6 w-6">
          <MessageCircleQuestionMark className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className=" w-[350px]">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ToolTipsProvider;
