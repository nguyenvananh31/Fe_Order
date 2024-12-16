"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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


const chartConfig = {
  visitors: {
    label: "Tổng",
  },
  chrome: {
    label: "Khách hàng",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Đơn hàng",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Sản phẩm",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Bàn",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Tài khoản",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

interface IProps {
  guests: number;
  orders: number;
  products: number;
  tables: number;
  users: number;
}

export function BarChartCn({ guests,
  orders,
  products,
  tables,
  users }: IProps) {

  const chartData = [
    { browser: "chrome", visitors: guests, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: orders, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: products, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: tables, fill: "var(--color-edge)" },
    { browser: "other", visitors: users, fill: "var(--color-other)" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê chung</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
