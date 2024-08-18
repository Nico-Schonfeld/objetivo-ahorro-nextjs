"use client";

import React from "react";
import { parseCurrency } from "@/utils/formaterPrice/formaterPrice";

import { TrendingUp, ArrowDown, Box } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const chartData = [
  { month: "Ene", saving: 0 },
  { month: "Feb", saving: 0 },
  { month: "Mar", saving: 0 },
  { month: "Abr", saving: 0 },
  { month: "May", saving: 0 },
  { month: "Jun", saving: 0 },
  { month: "Jul", saving: 0 },
  { month: "Ago", saving: 450000 },
  { month: "Sep", saving: 0 },
  { month: "Oct", saving: 0 },
  { month: "Nov", saving: 0 },
  { month: "Dic", saving: 0 },
];

const chartConfig = {
  saving: {
    label: "Ahorros",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

const year = moment().format("YYYY");

const AppClient = () => {
  return (
    <main className="w-full min-h-screen container max-w-[30rem] py-8 px-5 flex flex-col gap-4">
      <nav className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold font-mono">
          <Box /> Ahorro objetivo
        </h1>

        <button className="transition-background inline-flex items-center justify-center rounded-md border bg-gradient-to-r from-gray-100 via-green-300 to-green-600 bg-[length:200%_200%] bg-[0%_0%] p-2 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
          <ArrowDown width={16} height={16} />
        </button>
      </nav>

      <div>
        <div>Objetivo</div>

        <div>Total Ahorrado 2024</div>

        <div>Faltante</div>
      </div>

      <div>
        <Card className="border-none">
          <CardHeader className="px-0">
            <CardTitle>Grafico Ahorros {year}</CardTitle>
            <CardDescription>
              Visualiza tus ahorros de cada mes.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="saving" fill="var(--color-saving)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="px-0 flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default AppClient;
