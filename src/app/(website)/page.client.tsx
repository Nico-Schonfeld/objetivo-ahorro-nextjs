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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import moment from "moment";
import "moment/locale/es";
import { toast } from "sonner";
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

const tablaSchema = [
  { month: "Enero", saving: 0, id: 1 },
  { month: "Febrero", saving: 0, id: 2 },
  { month: "Marzo", saving: 0, id: 3 },
  { month: "Abril", saving: 0, id: 4 },
  { month: "Mayo", saving: 0, id: 5 },
  { month: "Junio", saving: 0, id: 6 },
  { month: "Julio", saving: 0, id: 7 },
  { month: "Agosto", saving: 0, id: 8 },
  { month: "Septiembre", saving: 0, id: 9 },
  { month: "Octubre", saving: 0, id: 10 },
  { month: "Noviembre", saving: 0, id: 11 },
  { month: "Diciembre", saving: 0, id: 12 },
];

const AppClient = () => {
  const [tablaState, setTablaState] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const getTabla = localStorage.getItem("tabla") as string;
      const tablaMatches = JSON.parse(getTabla);
      if (!tablaMatches) {
        localStorage.setItem("tabla", JSON.stringify(tablaSchema));

        setTablaState(tablaSchema);
      }

      return setTablaState(tablaMatches);
    }
  }, []);

  return (
    <main className="w-full h-auto container max-w-[30rem] pt-8 pb-20 px-5 flex flex-col gap-20">
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
          <TableCaption>
            Visualiza tus ahorros de cada mes en esta tabla.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Mes</TableHead>
              <TableHead className="text-right">Cantidad ahorrada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tablaState?.map((item: any) => (
              <TableRow
                key={item.id}
                onClick={() => toast(`${item.month} - ${item.saving}`)}
              >
                <TableCell>{item.month}</TableCell>
                <TableCell className="text-right">
                  {parseCurrency(Number(item.saving))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>item.month</TableCell>
              <TableCell className="text-right">item.saving</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
};

export default AppClient;
