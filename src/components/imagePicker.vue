<template>
  <div class="avatar-uploader avatar">
    <div class="avatar-uploader" v-for="(item,index) in imgs" :key="item.id">
      <el-image :src="'https://junesunray.com/lanlian/file/get?id=' + item.id"
                :preview-src-list="srcList"
                class="avatar"/>
        <div
          style="position:absolute;
        width: 100px;
        height: 20px;
        background-color: rgba(0,0,0,0.5)">
          <img @click="delImg(item,index)" src="../assets/images/close.png" alt="删除"
               style="width: 24px;height: 24px;float: right">
        </div>
    </div>
    <span class="el-icon-plus avatar-uploader-icon" @click="toInput"></span>

    <input @change="fileUpload($event)" type="file" style="display: none"/>

  </div>
</template>

<script>
import {uploadFile} from "@/api/file";

export default {
  name: "imagePicker",
  data() {
    return {}
  },
  props: {
    imgs: {
      type: Array,
      default() {
        return [{id: '05ee53d5-4225-11ec-a51a-00163e04fbfa'}]
      }
    },
    flag: {
      type: String,
    }
  },
  mounted() {
  },
  computed: {
    srcList() {
      return this.imgs.map((item) => {
        return 'https://junesunray.com/lanlian/file/get?id=' + item.id
      })
    }
  },

  methods: {
    toInput() {

      let input = document.createElement('input')
      input.type = "file"
      input.onchange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (res) => {
          file.src = res
          let formData = new FormData
          formData.append('files', file)
          uploadFile(formData).then(res2 => {
            let imgId = res2.data.id
            /*获取到上传图片的id*/
            this.imgs.push({id: imgId})
            /*传值*/
            this.$emit('handleImage', {
              imgId: imgId
            })
          })
        }
      }
      input.click()
    },
    delImg(item, index) {
      this.$confirm("确认删除这张图片介绍吗", "删除提醒", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delImg', {
          id: item.id,
          index: index
        })
      })
    }

  },


}
</script>

<style scoped>

.avatar-uploader {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 100px;
  text-align: center;
  min-width: 100px;
  border: 1px dotted;
}

.avatar-uploader-icon:hover {
  cursor: pointer;
}

.avatar {
  width: 100px;
  height: 100px;
}
</style>
