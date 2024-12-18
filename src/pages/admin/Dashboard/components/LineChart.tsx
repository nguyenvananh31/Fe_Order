"use client"

import { TrendingUp } from "lucide-react"
import { Area, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
  ChartTooltipContent
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
    label: "Tại nhà hàng",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Onine",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  loading: boolean;
  dataChart: any[];
}

export function LineChartCn({ loading, dataChart }: IProps) {

  return (
    <Card>
      <CardHeader className="flex items-stretch space-y-0 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Biểu đồ doanh thu</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </div>

      </CardHeader>
      <CardContent>
        {
          loading || dataChart.length == 0 ?
            <div className='flex justify-center items-center'>
              <Spin />
            </div>
            :
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart
                accessibilityLayer
                data={dataChart}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} stroke="#e0e0e0"/>
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return value;
                  }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
        }
      </CardContent>
    </Card>
  )
}
