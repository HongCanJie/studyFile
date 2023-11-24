<template>
  <div>
    <!-- layout栅格式，24 -->
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover"
                 style="margin-top: 20px; margin-left: 20px;">
          <div class="user">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 alt=""
                 srcset="">
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="power">超级管理员</p>
            </div>
          </div>
          <div class="user-info">
            <p>上次登陆时间: <span>2023-8-26</span></p>
            <p>上次登陆地点: <span>江苏</span></p>
          </div>
        </el-card>
        <el-card shadow="hover"
                 style="margin-top: 20px; margin-left: 20px">
          <!-- 这里不太理解，如何把data读取进去的 -->
          <el-table :data="
                   tableData"
                    style="width: 100%; height:800px">
            <!-- prop直接对应data里面的 -->
            <!-- <el-table-column prop="name"
                               label="品牌名称"
                               width="auto">
              </el-table-column>
              <el-table-column prop="todayBuy"
                               label="日销量"
                               width="auto">
              </el-table-column>
              <el-table-column prop="monthBuy"
                               label="月销量"
                               width="auto">
              </el-table-column>
              <el-table-column prop="totalBuy"
                               label="总销量"
                               width="auto">
              </el-table-column> -->
            <!-- 利用v-for遍历对象，v-for="(value, key) in object" 注意一定要由:key -->
            <el-table-column v-for="(val, key) in tableLabel"
                             :key="key"
                             :prop='key'
                             :label='val'
                             width="auto" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card shadow="hover"
                   v-for="item in countData"
                   :key="item.name"
                   :body-style="{display:'flex', padding:0}">
            <!-- 动态样式的设置 :style="{}" -->
            <i class='icon'
               :class="`el-icon-${item.icon}`"
               :style="{background: item.color}"></i>
            <div class="detail">
              <p class="price">{{ '￥'+item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div class="zhexian">
          <el-card shadow="hover">
            <!-- echarts必须设置宽高 -->
            <div id="line"
                 ref="lineRef"
                 class="main-chart"
                 style="width: 100%;height:500px;"></div>
          </el-card>
        </div>
        <div class="graph">
          <el-card shadow="hover">
            <div id="bar"
                 ref="barRef"
                 class="main-chart"
                 style="width: 100%;height:400px;"></div>
          </el-card>
          <el-card shadow="hover">
            <div id="pie"
                 ref="pieRef"
                 class="main-chart"
                 style="width: 100%;height:400px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// 引入api接口
import { getData } from '../api'
// 引入echart
import * as echarts from 'echarts'
export default {
  data () {
    return {
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      tableLabel: {
        name: '品牌名称',
        todayBuy: '日销量',
        monthBuy: "月销量",
        totalBuy: "总销量"
      }



    }
  },

  mounted () {
    getData().then(({ data }) => {
      console.log(data);
      // 获得data里面data的tableData数据
      const { tableData } = data.data
      console.log(tableData);
      this.tableData = tableData

      // 基于准备好的dom，初始化echarts实例
      //   this.$refs.lineRef获取当前的dom节点
      const echarts_line = echarts.init(this.$refs.lineRef);
      //   指定图标的数据和配置
      var option_line = {}
      //   需要的数据在data的data里面，处理数据：获取当前图例的数据
      // 处理数据xAxis, 需要解构出来
      const { orderData } = data.data // 是对象
      console.log(orderData.date);
      const xAxis = Object.keys(orderData.data[0])
      console.log(xAxis);  // ['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']
      option_line.xAxis = {
        data: orderData.date // 日期
      }
      option_line.legend = { // 图例
        data: xAxis
      }
      option_line.series = []
      //   遍历拿到数据
      xAxis.forEach(key => {
        option_line.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
        console.log(option_line);
      })

      option_line.yAxis = {}
      option_line.tooltip = { // 提示框
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      }
      // 显示图像
      echarts_line.setOption(option_line);

      // 柱状图
      const echarts_bar = echarts.init(this.$refs.barRef);
      const { userData } = data.data
      console.log(userData);
      var option_bar = {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],

        series: [

          {
            type: 'bar',
            name: '新增用户',
            data: userData.map(item => item.new),


          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar',
          }
        ],
      }
      console.log(userData.map(item => item.new));
      echarts_bar.setOption(option_bar);

      // 饼图
      const echarts_pie = echarts.init(this.$refs.pieRef);
      const { videoData } = data.data
      console.log(videoData);
      var option_pie = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      echarts_pie.setOption(option_pie);


    })

    // 基于准备好的dom，初始化echarts实例
    // const echarts1 = echarts.init(this.$refs.lineRef);
    // var option_line = {
    //   title: {
    //     text: 'ECharts 折线图'
    //   },
    //   tooltip: { // 提示框
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   //   图例
    //   //   legend: {
    //   // 	data: ['oppo', 'vivo', '苹果', '小米', '三星', '魅族']
    //   //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3% ',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   //   x轴
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['日销量', '月销量', '总销量']
    //   },
    //   //   y轴
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: 'oppo',
    //       type: 'line', // 折线图
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [500, 3500, 22000]
    //     },
    //     {
    //       name: 'vivo',
    //       type: 'line',
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [300, 2200, 2400]
    //     },
    //     {
    //       name: '苹果',
    //       type: 'line',
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [800, 4500, 6500]
    //     },
    //     {
    //       name: '小米',
    //       type: 'line',
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [1200, 6500, 4500]
    //     },
    //     {
    //       name: '三星',
    //       type: 'line',
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [300, 2000, 4500]
    //     },
    //     {
    //       name: '魅族',
    //       type: 'line',
    //       stack: 'Total',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [350, 3000, 2200]
    //     },
    //   ]
    // };
    // echarts1.setOption(option_line);
  }
}
</script>

<style lang="less" scope>
.user {
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    margin-left: 20px;
    .name {
      //   color: #999;
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .power {
      color: #7e7b7b;
      font-size: 14px;
    }
  }
}
.user-info {
  padding-top: 20px;

  p {
    font-size: 12px;
    color: #999;
    line-height: 20px;
    padding-bottom: 5px;
    margin-left: 5px;
  }
  span {
    margin-left: 40px;
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  //   注意是在el-card里面设置三分之一32%,而不是在num里面
  .el-card {
    width: 32%;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  .icon {
    height: 80px;
    width: 80px;
    color: #fff;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
  }
  .detail {
    display: flex;
    flex-direction: column; // 决定主轴的方向（即项目的排列方向
    // align-items: center;
    text-align: center;
    justify-content: center; // 在主轴上的对齐方式
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .txt {
      font-size: 14px;
      color: #999;
      //   text-align: center;
    }
  }
}
.zhexian {
  margin-left: 20px;
  .el-card {
    height: 500px;
  }
}
.graph {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 20px;
  .el-card {
    width: 49%;
    height: 400px;
  }
}
</style  >


<!-- 快捷键：< 再按TAB键 -->