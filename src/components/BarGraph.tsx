"use client";

import { TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface ChartData {
  month: string;
  ghgEmissionsWithoutDataConsulting: number;
  ghgEmissionsWithDataConsulting: number;
}

interface MultipleBarChartProps {
  data: ChartData[];
  title: string;
  description: string;
  trendPercentage?: string;
  chartTimeline?: string;
}

export default function MultipleBarChart({
  data,
  title,
  description,
  trendPercentage,
  chartTimeline,
}: MultipleBarChartProps) {
  const chartConfig = {
    ghgEmissionsWithoutDataConsulting: {
      label: "GHG Emissions Without Data Consulting",
      color: "hsl(var(--chart-1))",
    },
    ghgEmissionsWithDataConsulting: {
      label: "GHG Emissions With Data Consulting",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{
                value: "GHG Emissions (Metric Tons)",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="ghgEmissionsWithoutDataConsulting"
              fill="var(--color-ghgEmissionsWithoutDataConsulting)"
              radius={4}
            />
            <Bar
              dataKey="ghgEmissionsWithDataConsulting"
              fill="var(--color-ghgEmissionsWithDataConsulting)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {trendPercentage && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex justify-center font-medium leading-none text-center">
            {trendPercentage}
            <TrendingDown className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">{chartTimeline}</div>
        </CardFooter>
      )}
    </Card>
  );
}
