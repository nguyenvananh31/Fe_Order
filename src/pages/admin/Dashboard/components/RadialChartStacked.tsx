"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Spin } from "antd"

const chartConfig = {
  chrome: {
    label: "Thất bại",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Thành công",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  failed_bills: number;
  completed_bills: number;
  loading: boolean;
}

export function RadialChartStackedCn({ failed_bills, completed_bills, loading }: IProps) {
  const chartData = [
    { browser: "chrome", visitors: +failed_bills || 0, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: +completed_bills || 0, fill: "var(--color-safari)" },
  ]
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tổng đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {
          loading ?
            <div className='flex justify-center items-center'>
              <Spin />
            </div>
            :
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Đơn
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
        }
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Tổng số đơn hàng Online và Tại nhà hàng
        </div>
      </CardFooter>
    </Card>
  )
}
