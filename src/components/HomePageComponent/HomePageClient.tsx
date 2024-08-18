"use client";

import * as React from "react";
import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import texts from "@/messages/es.json";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const HomePageClient = () => {
  const text = texts.layout.home;
  const year = moment().format("YYYY");

  const meses = [
    {
      id: 0,
      mes: "Enero",
    },
    { id: 1, mes: "Febrero" },
    {
      id: 2,
      mes: "Marzo",
    },
    {
      id: 3,
      mes: "Abril",
    },
    {
      id: 4,
      mes: "Mayo",
    },
    {
      id: 5,
      mes: "Junio",
    },
    {
      id: 6,
      mes: "Julio",
    },
    {
      id: 7,
      mes: "Agosto",
    },
    {
      id: 8,
      mes: "Septiembre",
    },
    {
      id: 9,
      mes: "Octubre",
    },
    {
      id: 10,
      mes: "Noviembre",
    },
    {
      id: 11,
      mes: "Diciembre",
    },
  ];

  const chartData = [
    { month: "Agosto", objetivo: 800000, ahorro: 150000, objetivoRes: 950000 },
  ];

  const chartConfig = {
    objetivo: {
      label: "Objetivo",
      color: "hsl(var(--chart-3))",
    },
    ahorro: {
      label: "Ahorro",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalVisitors = chartData[0].objetivoRes - chartData[0].ahorro;

  return (
    <main className="w-full">
      <div className="container mx-auto py-8 md:py-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {text.cards.map((item, index) => (
              <Card key={item.id} x-chunk={`dashboard-01-chunk-${index}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.id === 1 ? `${item.title} ${year}` : item.title}
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Radial Chart - Stacked</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full max-w-[250px]"
              >
                <RadialBarChart
                  data={chartData}
                  endAngle={180}
                  innerRadius={80}
                  outerRadius={130}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 16}
                                className="fill-foreground text-2xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
                                className="fill-muted-foreground"
                              >
                                Faltante
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="objetivo"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-objetivo)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="ahorro"
                    fill="var(--color-ahorro)"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                  />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Savings Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead> Cantidad ahorrada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Enero</TableCell>
                    <TableCell>$500</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell className="font-semibold">$500</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default HomePageClient;
