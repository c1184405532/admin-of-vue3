import type { Options, Line } from "@antv/g2plot";

interface ChartOptions extends Options {
  xField: string, // x轴字段名 对应data中的对象key
  yField: string, // y轴字段名
}
type ChartLine= Line;

export type {
  ChartOptions,
  ChartLine
}