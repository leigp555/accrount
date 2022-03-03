import * as echarts from "echarts/core";
import {BarSeriesOption, LineSeriesOption} from "echarts/charts";
import {
    DatasetComponentOption,
    GridComponentOption,
    TitleComponentOption,
    TooltipComponentOption
} from "echarts/components";

export type ECOption = echarts.ComposeOption< | BarSeriesOption | LineSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption>;