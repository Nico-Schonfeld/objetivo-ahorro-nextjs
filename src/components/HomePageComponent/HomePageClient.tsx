"use client";

import * as React from "react";
import { DollarSign, Pencil, Plus } from "lucide-react";
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
import { Label as LabelUI } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { parseCurrency } from "@/utils/formaterPrice/formaterPrice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const HomePageClient = () => {
  const text = texts.layout.home;
  const year = moment().format("YYYY");
  const [openModaObjetivo, setOpenModalObjetivo] =
    React.useState<boolean>(false);

  const getObjetivo =
    typeof window !== "undefined" && localStorage.getItem("objetivo");
  const objetivoValidate = JSON.parse(getObjetivo as string);
  const objetivo = objetivoValidate ?? 0;
  const objetivoResValidate = JSON.parse(getObjetivo as string);
  const objetivoRes = objetivoResValidate ?? 0;

  const getAhorro =
    typeof window !== "undefined" && localStorage.getItem("ahorro");
  const ahorroValidate = JSON.parse(getAhorro as string);
  const ahorro = ahorroValidate ?? 0;

  const getTabla =
    typeof window !== "undefined" && localStorage.getItem("tabla");
  const tablaa = JSON.parse(getTabla as string);

  const [tabla, setTabla] = React.useState<
    {
      id: number;
      mes: string;
      ahorro: string;
    }[]
  >(tablaa ?? []);

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
    {
      month: "Agosto",
      objetivo: Number(objetivo),
      ahorro: Number(
        tabla?.reduce((acumulador, ahorroActual) => {
          const AhorroNumerico = parseFloat(ahorroActual.ahorro);
          return acumulador + AhorroNumerico;
        }, 0)
      ),
      objetivoRes: Number(objetivoRes),
      restanteObj: Number(objetivo) - ahorro,
    },
  ];

  const chartConfig = {
    objetivo: {
      label: "Objetivo",
      color: "hsl(var(--chart-2))",
    },
    ahorro: {
      label: "Ahorro",
      color: "hsl(var(--chart-3))",
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
                <CardContent className="relative ">
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold">
                      {item.id === 0 && parseCurrency(Number(objetivo))}

                      {item.id === 1 && tabla.length > 0
                        ? parseCurrency(
                            tabla?.reduce((acumulador, ahorroActual) => {
                              const AhorroNumerico = parseFloat(
                                ahorroActual.ahorro
                              );
                              return acumulador + AhorroNumerico;
                            }, 0)
                          )
                        : parseCurrency(0)}

                      {item.id === 2 &&
                        parseCurrency(
                          Number(objetivoRes) -
                            tabla?.reduce((acumulador, ahorroActual) => {
                              const AhorroNumerico = parseFloat(
                                ahorroActual.ahorro
                              );
                              return acumulador + AhorroNumerico;
                            }, 0)
                        )}
                    </p>
                    {item.id === 0 && (
                      <Dialog open={openModaObjetivo}>
                        <DialogTrigger
                          className="border rounded-lg p-1"
                          onClick={() =>
                            setOpenModalObjetivo(!openModaObjetivo)
                          }
                        >
                          <Pencil width={16} height={16} />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Añade el monto de tu objetivo
                            </DialogTitle>
                            <DialogDescription className="flex flex-col gap-4 py-5">
                              <form
                                action={async (formData: FormData) => {
                                  const objetivo = formData.get(
                                    "objetivo"
                                  ) as string;

                                  if (!objetivo)
                                    return toast.error("Campo obligatorio.");

                                  if (typeof window !== "undefined") {
                                    localStorage.setItem(
                                      "objetivo",
                                      JSON.stringify(objetivo)
                                    );

                                    setOpenModalObjetivo(!openModaObjetivo);
                                    return toast.success("Success");
                                  }
                                }}
                              >
                                <LabelUI htmlFor="objetivo">Objetivo</LabelUI>
                                <Input
                                  type="text"
                                  placeholder="650000"
                                  name="objetivo"
                                  id="objetivo"
                                />

                                <div className="flex items-center justify-end gap-4 w-full pt-4">
                                  <Button
                                    type="button"
                                    variant={"destructive"}
                                    onClick={() => {
                                      typeof window !== "undefined" &&
                                        localStorage.removeItem("objetivo");

                                      setOpenModalObjetivo(false);
                                    }}
                                  >
                                    eliminar
                                  </Button>
                                  <Button>Guardar</Button>
                                </div>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
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
                    dataKey="objetivoObj"
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
            <CardHeader className="relative">
              <CardTitle>Savings Tracker</CardTitle>

              <Dialog>
                <DialogTrigger className="absolute right-5 top-5 border rounded-lg p-1">
                  <Plus width={24} height={24} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añade el monto de tu objetivo</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4 py-5">
                      <form
                        action={async (formData: FormData) => {
                          const getMes = formData.get("mes") as string;
                          const getAhorro = formData.get("ahorro") as string;

                          if (!getAhorro || !getMes) return toast.error("Err");

                          setTabla([
                            ...tabla,
                            {
                              id: tabla.length + 1,
                              ahorro: getAhorro,
                              mes: getMes,
                            },
                          ]);

                          if (tabla.length > 0) {
                            typeof window !== "undefined" &&
                              localStorage.setItem(
                                "tabla",
                                JSON.stringify(tabla)
                              );
                          }
                        }}
                      >
                        <LabelUI>
                          Mes 2024
                          <Select name="mes">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Mes del 2024" />
                            </SelectTrigger>
                            <SelectContent>
                              {meses.map((mes) => (
                                <SelectItem key={mes.id} value={mes.mes}>
                                  {mes.mes}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </LabelUI>

                        <LabelUI>
                          Cantidad ahorrada
                          <Input type="text" placeholder="500" name="ahorro" />
                        </LabelUI>

                        <div className="flex items-center justify-end gap-4 w-full pt-4">
                          <Button type="button" variant={"destructive"}>
                            eliminar
                          </Button>
                          <Button>Guardar</Button>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
                  {tabla?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.mes}</TableCell>
                      <TableCell>
                        {parseCurrency(Number(item.ahorro))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell className="font-semibold">
                      {tabla.length <= 0
                        ? parseCurrency(0)
                        : parseCurrency(
                            tabla?.reduce((acumulador, ahorroActual) => {
                              const AhorroNumerico = parseFloat(
                                ahorroActual.ahorro
                              );
                              return acumulador + AhorroNumerico;
                            }, 0)
                          )}
                    </TableCell>
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
