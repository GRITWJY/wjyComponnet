<template>
  <manage-style>
    <div class="out">
      <div class="inner">
        <div class="btn-list">
          <div class="btn-margin" v-for="(item, num) of 6" :key="num">
            <span class="btn-margin" v-for="(item1, row) of 10" :key="row">
              <div v-if="row == 2" class="btn-head-margin"></div>
              <el-button
                class="btn-list-seat"
                type="primary"
                :disabled="isdisabled(row,num)"
                :class="
                  selectedlist.btn_num == num + 1 &&
                  selectedlist.btn_row == row + 1
                    ? selectedlist.btn_row > 2
                      ? 'btn-list-active'
                      : 'btn-list-active-head'
                    : 'btn-list-seat'
                "
                @click="highlight(row + 1, num + 1)"
              ></el-button>
            </span>
          </div>

        </div>
      </div>

      <div class="seat-msg">
        <div class="seat-right">
          <el-descriptions
            title="座位信息"
            :labelStyle="{ 'font-weight': '800', color: '#409EFF' }"
          >
            <el-descriptions-item label="行号"
            >{{ selectedlist.btn_row }}
            </el-descriptions-item
            >
            <el-descriptions-item label="列号"
            >{{ selectedlist.btn_num }}
            </el-descriptions-item
            >
            <el-descriptions-item label="类型">{{ selectedlist.type }}</el-descriptions-item>
            <el-descriptions-item label="机型"> 波音787</el-descriptions-item>
            <el-descriptions-item label="座位价格">{{ selectedlist.money }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <el-button type="primary" @click="saveSeat">确认，进行下一步</el-button>
      </div>
    </div>
  </manage-style>
</template>

<script>
import ManageStyle from "../../layout/ManageStyle";
import { addSeat} from "@/api/plane";

export default {
  components: {
    ManageStyle,
  },
  data() {
    return {
      disablednums: [
        {row: 3, num: 4},
        {row: 5, num: 1},
        {row: 2, num: 4},
        {row: 4, num: 4},
        {row: 4, num: 2},
      ],
      selectedlist: {
        fightid: this.$router.param.id,
        num: null,
        row: null,
        selected_head: false,
        type: null,
        money: null
      },
    };
  },
  created() {

  },
  computed: {},
  methods: {
    isdisabled(row, num) {
      for (let i = 0; i < this.disablednums.length; i++) {
        if (row == this.disablednums[i].row && num == this.disablednums[i].num) {
          return true
        }
      }
      return false
    },
    highlight(row, num) {
      this.selectedlist.btn_num = num;
      this.selectedlist.btn_row = row;
      this.selectedlist.selected = true;
      if (row > 2) {
        this.selectedlist.type = '经济舱'
        this.selectedlist.money = this.$router.param.money
      } else {
        this.selectedlist.type = '头等舱'
        this.selectedlist.money = this.$router.param.money + 500
      }
    },
    saveSeat() {
      addSeat(this.selectedlist).then(res => {
        this.$router.to('selectquory', {
          fightid: this.selectedlist.fightid,
          seatid: res.data.id
        })
      })
    },

  },
};
</script>
<style lang="scss" scoped>
.out {
  padding: 5vh;
  display: flex;
  justify-content: space-between;

  .inner {
    padding: 5vh;
    width: 300px;

    .btn-list {
      display: flex;
      flex-wrap: wrap;

      .btn-margin {
        width: 16.6%;

        .btn-list-seat {
          height: 40px;
          margin: 2px;
        }
      }
    }
  }

  .seat-msg {
    width: 40vw;
    padding: 10vw 5vw 0vw 10vw;

    .seat-right {
      background-color: #fff;
      border: 1px solid #ebebeb;
      padding: 20px;
    }
  }
}

.btn-list-active {
  background-color: #14C193;
}

.btn-list-active-head {
  background-color: #f56c6c;
}

.btn-head-margin {
  height: 30px;
}

.btn-lang-margin {
  width: 30px;
}

.el-button + .el-button {
  margin: 0px;
}
</style>
