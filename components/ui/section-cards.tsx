import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  MessageSquare, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown 
} from "lucide-react";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <CardHeader>
          <CardDescription>Mentions totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            11,780
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="@container/card relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <CardHeader>
          <CardDescription>Mentions mensuelles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            81M
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="@container/card relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <ThumbsUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardHeader>
          <CardDescription>Mentions positives</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="@container/card relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
          <ThumbsDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
        </div>
        <CardHeader>
          <CardDescription>Mentions négatives</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}