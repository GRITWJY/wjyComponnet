<template>
  <manage-style>
    <div class="flight-out">
      <div class="block time-place">
        <!-- 出发地 -->
        <div>from</div>
        <el-select class="place-pick" v-model="fromplace" placeholder="请选择">
          <el-option
            v-for="item in fromcities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 目的地 -->
        <div>to</div>
        <el-select class="place-pick" v-model="toplace" placeholder="请选择">
          <el-option
            v-for="item in tocities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 时间 -->
        <div>请选择出行日期</div>
        <el-date-picker
          class="time-pick"
          v-model="pickertime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>

        <el-button type="primary" @click="selectFight" class="chosetimebutton"> 查询</el-button>
      </div>

      <div class="selection">
        <span class="selection-text">筛选条件</span>
        <el-dropdown @command="handleCommand" trigger="click">
          <el-button type="primary" class="chosetimebutton">
            按照排序<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="m">最低价格</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="flight-box">
      <div class="text-out">
        <i class="el-icon-s-promotion"></i>
        <span class="text">航班列表</span>
      </div>
      <div v-for="(item, index) of resultList" :key="index">
        <div class="flight-outbox">
          <div class="flight-innerbox">
            <div class="flight-time">{{ item.depatureHour }} - {{ item.arrivalHour }}</div>
            <div class="flight-message">
              <el-timeline>
                <el-timeline-item color="#1890ff" :timestamp="item.depatureDay">
                  {{ item.depatureCity }}
                </el-timeline-item>
                <el-timeline-item color="#1890ff" :timestamp="item.arrivalDay">
                  {{ item.arrivalCity }}
                </el-timeline-item>
              </el-timeline>
            </div>
            <div class="flight-where">
              <div class="country">{{ item.depatureCity }}</div>
              <i class="el-icon-bottom"/>
              <div class="country">{{ item.arrivalCity }}</div>
            </div>
            <div class="flight-contime">
              <div class="contime-text">行程时长</div>
              <div class="contime-text">
                <i class="el-icon-time"/>
                {{ item.time }}
              </div>
            </div>
            <div class="flight-money">
              <el-row>
                <el-button type="primary" round @click="$router.to('choseseat',{id:item.id,money:item.fare})">
                  CNY {{ item.fare }}
                </el-button>
              </el-row>
              <div class="seat-text">该航班还剩1个座位！</div>
            </div>
            <!-- <div class="flight-foot">foot</div> -->
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <div class="bottem-text">
          所有金额均以 CNY 为单位。 包含税款和附加费。
          不收取预订费，但可能会收取付款附加费。
        </div>
        <div class="bottem-text">
          根据所需费用，显示的票价可能会有所不同。
          当您选择付款方式后，您会看到最终金额。
        </div>
      </div>
    </div>
  </manage-style>
</template>

<script>
import ManageStyle from "../../layout/ManageStyle.vue";
import {getFightList} from "@/api/plane";
import moment from 'moment'

export default {
  components: {ManageStyle},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      fromcities: [
        {
          value: "武汉",
          label: "武汉",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      tocities: [
        {
          value: "北京",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      activities: [
        {
          content: "阿富汗",
          timestamp: "2018-04-15",
        },
        {
          content: "南天门",
          timestamp: "2021-11-31",
        },
      ],
      fromplace: "",
      toplace: "",
      pickertime: "",
      timelinecolor: "#1890ff",
      activeName: "second",

      resultList: [],
    };
  },
  created() {
  },
  methods: {
    selectFight() {
      console.log(this.fromplace)
      getFightList({
        arrivalCity: this.toplace,
        depatureCity: this.fromplace,
        depatureTime: moment(this.pickertime).format('YYYY-MM-DD HH:mm:ss')
      }).then(res => {
        this.resultList = res.data
        this.resultList = this.resultList.map((item) => {
          item.depatureDay = moment(item.depatureTime).format('YYYY-MM-DD')
          item.depatureHour = moment(item.depatureTime).format('HH:mm')
          item.arrivalDay = moment(item.arrivaltime).format('YYYY-MM-DD')
          item.arrivalHour = moment(item.arrivaltime).format('HH:mm')

          let time = moment.duration(moment(item.arrivaltime) - moment(item.depatureTime))
          item.time = time.get('hours') + 'h' + time.get('minutes') + '分'
          return item
        })
      })
    },

    handleCommand() {
      this.resultList.sort((a, b) => {
        return a.fare - b.fare
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.chosetimebutton {
  border-radius: 20px;
}

.flight-out {
  width: 80%;
  margin: 0px auto;
  display: block;
}

.time-place {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .place-pick {
    margin: 2vh;
  }

  .time-pick {
    margin: 2vh;
  }
}

.selection {
  margin-top: 5vh;
  margin-bottom: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .selection-text {
    margin-right: 2vh;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
    font-weight: 600;
    color: #003145;
  }
}

.flight-box {
  width: 50vw;
  // display: grid;
  display: block;
  margin: 0px auto;

  .text-out {
    padding: 3vh 0vh 3vh 2vh;
    display: block;
    margin: 0px auto;

    .text {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      sans-serif;
      font-weight: 900;
      font-size: 25px;
      color: #003145;
      margin-left: 15px;
    }
  }

  .flight-outbox {
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
    // grid-template-columns: 4fr 1fr;
    padding: 8px 16px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
    font-weight: 400;

    .flight-innerbox {
      display: grid;
      grid-template-columns: minmax(25%, 2fr) 1fr 1fr 1fr;
      grid-template-rows: auto 2fr auto;
      // grid-column: 1;
      // grid-row: 1;
      align-self: center;

      .flight-time {
        grid-column: 1;
        grid-row: 1;
      }

      .flight-message {
        grid-column: 1 / span2;
        grid-row: 2/4;
        padding: 16px 8px 0px 8px;
      }

      .flight-where {
        grid-column: 2;
        grid-row: 1/3;
        align-self: center;
        display: flex;
        flex-direction: column;

        .country {
          padding: 3vh 0vh;
        }
      }

      .flight-contime {
        grid-column: 3;
        grid-row: 2/4;
        align-self: center;
        padding: 8px;

        .contime-text {
          margin: 8px;
        }
      }

      .flight-money {
        grid-column: 4;
        grid-row: 1/4;
        align-self: center;
        justify-self: center;

        .seat-text {
          margin: 8px;
          font-size: 13px;
          color: #ff4949;
          line-height: 1.75;
          font-weight: 700;
        }
      }

      // .flight-foot{
      //     grid-column: 1;
      //     grid-row: 4/5;
      // }
    }
  }

  .bottom-area {
    padding: 2vh;
    display: block;

    .bottem-text {
      text-align: center;
      max-width: 1016px;
      font-size: 0.75rem;
      line-height: 1.75;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      sans-serif;
      font-weight: 400;
      color: #707575;
    }
  }
}

.card-box {
  display: block;
  margin: 0px auto;
  width: 60%;
  align-self: center;

  .el-header-card {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 30px;
    // height: 10px;
  }

  .el-aside-card {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 150px;
    // height:150px;
    height: auto;
  }

  .el-main-card {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 30px;
    height: auto;
  }
}

//   .el-container.el-aside {
//     line-height: 320px;
//   }
//   .el-container .el-aside,
//   .el-container .el-aside {
//     line-height: 260px;
//   }
</style>
