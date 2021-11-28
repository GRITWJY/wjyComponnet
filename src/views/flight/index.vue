<template>
    <manage-style>
        <div class="block">
            <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
            </el-date-picker>
        </div>

<!-- @command="handleCommand" -->
        <div class="selection">
            <span class="selection-text">筛选条件</span>
            <el-dropdown :hide-on-click="false"  trigger="click">
                <el-button type="primary" class="chosetimebutton">
                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="b">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="用户管理" name="first">用户吃饭啦！</el-tab-pane>
                            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        </el-tabs>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @command="handleCommand" trigger="click">
                <el-button type="primary" class="chosetimebutton">
                    按照排序<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="d">行程最短时间</el-dropdown-item>
                    <el-dropdown-item command="m">最低价格</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        
        <div class="text-out">
            <span class="text">航班列表</span>
        </div>


        <!-- <div class="card-box">
            <el-container>
                <el-aside class="el-aside-card" width="200px">Aside</el-aside>
                <el-container>
                    <el-header class="el-header-card">Header</el-header>
                    <el-main class="el-main-card">Main</el-main>
                    <el-footer class="el-footer-card">Footer</el-footer>
                </el-container>
            </el-container>
        </div> -->
        <div class="flight-outbox">
            <div class="flight-innerbox">
                <div class="flight-time">15:09-16:35(次日)</div>
                <div class="flight-message">阿富汗 - 南天门</div>
                <div class="flight-where">阿富汗 - 中国</div>
                <div class="flight-contime">行程时长 19h36</div>
                <div class="flight-money">CNY 16131</div>
                <div class="flight-foot">foot</div>
            </div>
        </div>
    </manage-style>
</template>

<script>
import ManageStyle from '../../layout/ManageStyle.vue';
export default {
  components: { ManageStyle },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        activeName: 'second'
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
}
</script>
<style lang="scss">
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  } 
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .chosetimebutton{
      border-radius: 20px;
  }
  .selection{
      margin-top: 5vh;
      margin-bottom: 2vh;
      display: flex;
      align-items: center;
      .selection-text{
        margin-right: 2vh;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
        font-weight: 600;
        color: #003145;
      }
  }
  .text-out{
    padding: 3vh 0vh 3vh 5vh;
    .text{
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
        font-weight: 900;
        font-size: 25px;
        color: #003145;
    }
  }
  .flight-outbox{
      grid-template-columns: 4fr 1fr;
      display: grid;
      padding: 8px 16px;
      .flight-innerbox{
        display: grid;
        grid-template-columns: minmax(25%,2fr) 1fr 1fr 1fr;
        grid-template-rows: auto 2fr auto;
        // grid-column: 1;
        // grid-row: 1;
        align-self: center;
        .flight-time{
            grid-column: 1;
            grid-row: 1;
        }
        .flight-message{
            grid-column: 1/span2;
            grid-row: 2/4;
            padding: 8px 16px;
        }
        .flight-where{
            grid-column: 2;
            grid-row: 1/3;
            align-self:center;
        }
        .flight-contime{
            grid-column: 3;
            grid-row: 2/4;
        }
        .flight-money{
            grid-column: 4;
            grid-row: 1/4;
            align-self:center;
        }
        .flight-foot{
            grid-column: 1;
            grid-row: 4/5;
        }
      }
  }
  .card-box{
      display: block;
      margin: 0px auto;
      width: 60%;
      align-self:center;
    .el-header-card{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 30px;
        // height: 10px;
    }
    .el-aside-card {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 150px;
        // height:150px;
        height: auto;
    }
    
    .el-main-card {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 30px;
        height:auto;
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
