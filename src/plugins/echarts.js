/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2021-12-26 12:21:27
 * @LastEditTime: 2022-02-11 09:13:59
 * @LastEditors: LiuYan
 * @Reference:
 */

// 不使用cdn的情况下可以按需引入
import Vue from 'vue';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart,
  RadarChart,
  GaugeChart,
  PieChart,
  ScatterChart,
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GaugeChart,
  BarChart,
  LineChart,
  RadarChart,
  PieChart,
  LabelLayout,
  ScatterChart,
  UniversalTransition,
  CanvasRenderer,
]);
Vue.prototype.$echarts = echarts;
Vue.prototype.$resizeCharts = function (charts) {
  window.addEventListener('resize', function () {
    charts.resize();
  });
};
