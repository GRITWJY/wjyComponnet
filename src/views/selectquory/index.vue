<template>
  <manage-style>
    <div class="psger-outbox">
      <el-card class="box-card">
        <div class="psger-form">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-divider></el-divider> -->
            <el-form-item label="护照" prop="passport">
              <el-input v-model.number="ruleForm.passport"></el-input>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
        </div>
        <div class="ticket-msg">
          <div class="ticket-where">
            <span class="ticket-time">12-01</span>
            <span class="country">阿富汗</span>
            <i class="el-icon-right" />
            <span class="country">中国</span>
          </div>
          <div class="company-msg">
            <span>中国民航</span>
            <span>波音747</span>
            <span>头等舱</span>
          </div>
          <div class="ticket-time-where">
            <div class="tw-from">
              <div>7:10</div>
              <div class="tw-where">天河机场</div>
            </div>
            <div class="tw-time">
              <div>3h</div>
            </div>
            <div class="tw-to">
              <div>17:10</div>
              <div class="tw-where">首都机场</div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </el-card>
      <div class="ticket-button">
        <el-button
          class="bt-size"
          type="primary"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button class="bt-size" @click="resetForm('ruleForm')"
          >重置</el-button
        >
      </div>
    </div>
  </manage-style>
</template>

<script>
import ManageStyle from "../../layout/ManageStyle";

export default {
  components: {
    ManageStyle,
  },
  data() {
    var checkPassport = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error("请输入数字值"));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error("必须年满18岁"));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      }
      // else {
      //   if (this.ruleForm.checkPass !== "") {
      //     this.$refs.ruleForm.validateField("checkPass");
      //   }
      //   callback();
      // }
    };
    return {
      ruleForm: {
        name: "",
        passport: "",
      },
      rules: {
        name: [{ validator: validatePass, trigger: "blur" }],
        passport: [{ validator: checkPassport, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log("submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.psger-outbox {
  width: 50vw;
  display: block;
  margin: 0px auto;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  .psger-form {
    width: 20vw;
    float: left;
  }
  .ticket-msg {
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ticket-where {
      font-size: 18px;
      color: #1f2f3d;
      .ticket-time {
        padding: 0vh 3vh;
        font-weight: 600;
      }
      .country {
        padding: 1vh 2vh 1vh 2vh;
        font-weight: 700;
      }
    }
    .company-msg {
      display: flex;
      flex-direction: row;
      font-size: 15px;
      color: rgb(101, 96, 96);
      span {
        padding: 8px 16px;
      }
    }
    .ticket-time-where {
      display: flex;
      flex-direction: row;
      font-weight: bold;
      .tw-from {
        font-size: 22px;
        color: #1f2f3d;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .tw-to {
        font-size: 22px;
        color: #1f2f3d;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .tw-time {
        padding: 1vh 2vh;
      }
    }
  }
  .ticket-button {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
}

.tw-where {
  font-size: 15px;
}
.bt-size {
  width: 20vw;
}
</style>
