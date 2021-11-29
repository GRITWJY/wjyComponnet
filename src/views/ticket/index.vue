<template>
  <manage-style>
    <div class="page-out-box">
      <div class="ticket-scription">
        <div class="scription-pad">
          <el-descriptions title="订单信息">
            <el-descriptions-item label="订单状态">已出票</el-descriptions-item>
            <el-descriptions-item label="订单日期"
              >2021-12-01</el-descriptions-item
            >
            <el-descriptions-item label="订单方式"
              >网上预定</el-descriptions-item
            >
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="ticket-money">
          <div class="money-number">
            <span>总金额:</span>
            <span class="number">RMB 1052</span>
          </div>
          <div class="money-detail">
            <div>座位:51元</div>
            <div>保险:1元</div>
            <div>航班:1000元</div>
          </div>
        </div>
      </div>
      <div class="scription">
        <el-descriptions :column="4" border>
          <el-descriptions-item label="类型">单程</el-descriptions-item>
          <el-descriptions-item label="位置">
            <span class="text-all">百草园</span>
            <i class="el-icon-right" />
            <span class="text-all">三味书屋</span>
          </el-descriptions-item>
          <el-descriptions-item label="时间">
            <span>2021年12月1日</span>
          </el-descriptions-item>
          <el-descriptions-item label="乘机人">周树人</el-descriptions-item>
          <el-descriptions-item
            label="机票信息"
            :contentStyle="{ 'text-align': 'right' }"
          >
            <div class="ticket-info">
              <div class="info-companybox">
                <div class="company">湖工航空</div>
                <span>CZ3381</span>
                <div class="type-time">
                  <span class="type">波音787</span>
                  <i class="el-icon-time" />
                  <span class="time"> 19h36</span>
                </div>
              </div>
              <div class="info-from">
                <div class="time">19:40</div>
                <div class="where">新白云国际机场</div>
              </div>
              <div class="info-to">
                <div class="time">21:30</div>
                <div class="where">天河机场</div>
              </div>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="scription-1">
        <el-descriptions
          title="乘客信息"
          :column="3"
          :labelStyle="{ 'font-weight': '800', color: '#409EFF' }"
          direction="vertical"
        >
          <el-descriptions-item label="姓名">周树人</el-descriptions-item>
          <el-descriptions-item label="出生日期"
            >1965-05-27</el-descriptions-item
          >
          <el-descriptions-item label="证件号码">G516468</el-descriptions-item>
          <el-descriptions-item label="票号">165459781</el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="scription-1">
        <el-descriptions
          title="支付信息"
          :column="3"
          :labelStyle="{ 'font-weight': '800', color: '#409EFF' }"
          direction="vertical"
        >
          <el-descriptions-item label="支付类型">支付宝</el-descriptions-item>
          <el-descriptions-item label="支付额"
            >RMB
            <span class="number">1052元</span>
          </el-descriptions-item>
          <el-descriptions-item label="抵用券支付">0元</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="yes-button">
        <el-button class="bt-size" type="primary">返回</el-button>
      </div>
    </div>
    <!-- <div class="ticket-inform-box">
      <div class="innerbox">
        <div class="all">单程</div>
        <div class="message">
          <span>广州</span>
          <span>张家界</span>
          <span>2021年4月12日</span>
        </div>
        <div class="name">
          <span>乘机人</span>
          <span>彼得帕克</span>
        </div>
        <div class="ticket-info">
          <div class="info-companybox">
            <div class="company">湖工航空</div>
            <span>CZ3381</span>
            <div class="type-time">
              <span class="type">波音787</span>
              <span class="time">19h36</span>
            </div>
          </div>
          <div class="info-from">
            <div>19:40</div>
            <div>新白云国际机场</div>
          </div>
          <div class="info-to">
            <div>21:30</div>
            <div>天河机场</div>
          </div>
        </div>
      </div>
    </div> -->
  </manage-style>
</template>

<script>
import ManageStyle from "../../layout/ManageStyle";

export default {
  components: {
    ManageStyle,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.page-out-box {
  width: 80%;
  margin: 0px auto;
  .yes-button {
    box-sizing: border-box;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    .bt-size {
      width: 40vw;
    }
  }
}
.ticket-scription {
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .scription-pad {
    padding: 23px;
    width: 60%;
  }
  .ticket-money {
    font-size: 20px;
    width: 30%;
    float: right;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 25px;
    div {
      margin-bottom: 5px;
    }
    .money-number {
      display: flex;
      .number {
        color: rgb(228, 175, 78);
      }
      span {
        margin-right: 25px;
      }
    }
    .money-detail {
      font-size: 13px;
    }
  }
}

.scription {
  margin-top: 20px;
  .ticket-info {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .info-companybox {
      display: flex;
      flex-direction: column;
      //   align-content: space-between;
      .company {
        font-weight: 700;
        font-size: 17px;
        color: black;
      }
      .type {
        font-size: 12px;
        padding-right: 10px;
        // margin-right: 10px;
      }
      .time {
        font-size: 12px;
      }
    }
    .info-from {
      .time {
        font-size: 20px;
        font-weight: 700;
      }
      .where {
      }
    }
    .info-to {
      .time {
        font-size: 20px;
        font-weight: 700;
      }
      .where {
      }
    }
  }
}
.scription-1 {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  padding: 16px;
  .margintop {
    padding-top: 10px;
  }
  .number {
    color: rgb(228, 175, 78);
  }
}
/*.ticket-inform-box {
  grid-template-columns: 4fr 1fr;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
  font-weight: 400;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  .innerbox {
    display: grid;
    grid-template-columns: minmax(5%, 20px) 1fr 1fr;
    grid-template-rows: auto 2fr auto;
    justify-items: center;
    align-items: center;
    
    .all {
      grid-column: 1;
      grid-row: 1 / span3;
      border: 1px solid #ebebeb;
      width: 100%;
      height: 100%;
      background-color: rgb(224, 225, 228)
    }
    .message {
      border: 1px solid #ebebeb;
      grid-column: 2;
      grid-row: 1;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
    .ticket-info {
      border: 1px solid #ebebeb;
      grid-column: 2 / span2;
      grid-row: 2 / span2;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
    .name {
      border: 1px solid #ebebeb;
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
*/
</style>
