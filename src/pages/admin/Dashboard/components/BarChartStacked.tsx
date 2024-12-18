"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Spin } from "antd"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Thành công",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Thất bại",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  loading: boolean;
  dataChart: any[];
}

export function BarChartStacked({ loading, dataChart }: IProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê đơn hàng</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        {
          loading || dataChart.length == 0 ?
            <div className='flex justify-center items-center'>
              <Spin />
            </div>
            :
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={dataChart}>
                <CartesianGrid vertical={false} stroke="#e0e0e0"/>
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="desktop"
                  stackId="a"
                  fill="var(--color-desktop)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="mobile"
                  stackId="a"
                  fill="var(--color-mobile)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
        }
      </CardContent>
    </Card>
  )
}
