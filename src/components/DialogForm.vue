<template>
  <el-dialog
    :visible.sync="dialogShow"
    :title="title"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-form :model="form.data" :rules="form.rules" ref="dialog-form" label-width="100px">
      <el-form-item v-for="(field,i) of fields" :key="i" :label="field.lable" :prop="field.id">
        <!--   日期     -->
        <el-date-picker v-if="field.type == 'data'" type="date" placeholder="选择日期" v-model="form.data[field.id]"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 200px;"
                        @change="field.change?field.change(form.data):''"/>

        <!--   时间     -->
        <el-date-picker v-else-if="field.type == 'time'" placeholder="选择时间" v-model="form.data[field.id]"
                        style="width: 200px;"/>

        <!--    下拉选择    -->
        <el-switch v-else-if="field.type == 'switch'" v-model="form.data[field.id]"/>

        <!--    单选框    -->
        <el-radio-group v-else-if="field.type == 'radio'" v-model="form.data[field.id]">
          <el-radio v-for="(op,i) of field.options" :key="i" :label="op.value">{{ op.name }}</el-radio>
        </el-radio-group>

        <!--   选择框     -->
        <el-select v-else-if="field.type == 'select'" v-model="form.data[field.id]" :placeholder="'请选择' + field.lable">
          <el-option v-for="(op,i) of field.options" :key="i" :label="op.name" :value="op.value"/>
        </el-select>

        <!--  描述列表      -->
        <el-descriptions v-else-if="field.type == 'des'" :column="3" size="medium" border>

        </el-descriptions>

        <div v-else-if="field.type=='img'" class="avatar-uploader avatar" @click="uploadImg(field)">
          <img v-if="form.data[field.id]" :src="'https://junesunray.com/eim/file/get?id=' +form.data[field.id]"
               class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>

        <el-input v-else :type="field.type" v-model="form.data[field.id]">
          <template v-if="field.slot" slot="append">{{ field.slot }}</template>
        </el-input>
      </el-form-item>
    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>

    <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
  </el-dialog>
</template>
<script>

import {uploadFile} from "@/api/file";


var limit = (rule, value, callback) => {
  const min = rule.limit.min
  const max = rule.limit.max
  const require = rule.required
  const type = rule.type
  const lable = rule.lable
  if (!value && require) {
    return callback(new Error(lable + '不能为空'))
  }
  if (type === 'number') {
    if (min > value) {
      return callback(new Error(lable + '不能小于' + min))
    }
    if (max < value) {
      return callback(new Error(lable + '不能大于' + max))
    }
  } else {
    if (value) {
      if (min > value.length) {
        return callback(new Error(lable + '不能小于' + min + '字符'))
      }
      if (max < value.length) {
        return callback(new Error(lable + '不能大于' + max + '字符'))
      }
    }
  }
  callback()
};
export default {

  props: {
    title: {
      type: String,
      default: '表单弹窗'
    },
    fields: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {
      dialogShow: false,
      form: {
        rules: {},
        data: {},
      },
      types: ['switch', 'img', 'data', 'select', 'textarea'],
      fileId: 0,
    }
  },
  methods: {

    fileChange(e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.vue = this
      reader.readAsDataURL(file)
      reader.onload = (res) => {
        file.src = res
        // 上传file
        let formData = new FormData
        formData.append('files', file)
        formData.append("user_id",this.$caches.user.id)
        formData.append("filename","11.png")
        formData.append("type","png")
        uploadFile(formData).then(res2 => {
          let imgId = res2.data.id
          console.log(res2)
          this.form.data[this.fileId] =imgId
        })
      }
      e.target.value = ''
    },

    uploadImg(field) {
      this.fileId = field.id
      let input = document.getElementById('upload_file')
      input.click()
    },
    submit() {
      this.$refs['dialog-form'].validate((success) => {
        if (success) {
          this.$emit('submit', this.form.data)
          this.dialogShow = false
        } else {
          this.$message.error('请按要求填写字段！')
        }
      })
    },
    show(data) {

      this.form.rules = {}
      for (const r of Object.keys(data)) {
        this.$set(this.form.data, r, data[r])
      }
      for (const r of this.fields) {
        this.$set(this.form.data, r.id, data[r.id])
        if (r.limit) {
          r.validator = limit
        }
        r.trigger = 'blur'
        if (this.types.indexOf(r.type) === -1) {
          this.form.rules[r.id] = [r]
        }
      }
      this.dialogShow = true
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader :hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
