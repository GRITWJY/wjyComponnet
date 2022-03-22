<template>
  <div>
    <w-form :model="formValidate" :rules="ruleValidate">
      <w-form-item label="用户名" prop="name">
        <input v-model="formValidate.name"></input>
      </w-form-item>
      <w-form-item label="邮箱" prop="mail">
        <input v-model="formValidate.mail"></input>
      </w-form-item>
    </w-form>
  </div>
</template>

<script>
import wForm from "@/components/form/form";
import wFormItem from '@/components/form/form-item'


export default {
  components: {
    wForm, wFormItem
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
        ]
      }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
