<template>
  <manage-style>
    <el-button type="primary" @click="adduser">添加用户</el-button>
    <data-table
      url="/user/list"
      opgroup
      :fields="[
        { id: 'rolename', name: '角色', width: 100, show: true },
        { id: 'username', name: '用户名', width: 140, show: true },
        { id: 'name', name: '姓名', width: 100, show: true },
        { id: 'phone', name: '电话', width: 230, show: true },
        { id: 'email', name: '邮箱', show: true }
      ]"
      :operations="[
        { name: '修改', type: 'primary', icon: 'el-icon-edit', action: handleEdit },
        { type: 'danger', icon: 'el-icon-delete', action: handleDelete }
      ]"
    />
    <dialog-form
      ref="user-form"
      title="新增用户"
      :fields="[
        { id: 'username', lable: '用户名', limit: { min: 2, max: 20 }, required: true },
        { id: 'name', lable: '姓名', limit: { min: 2, max: 20 }, required: true },
        { id: 'phone', lable: '电话', limit: { min: 11, max: 11 }, required: true },
        { id: 'email', lable: '邮箱', limit: { min: 4, max: 50 } }
      ]"
      @submit="onSubmit"
    />
  </manage-style>
</template>

<script>
import ManageStyle from '../../layout/ManageStyle'
import DataTable from '../../components/DataTable'
import DialogForm from '../../components/DialogForm'

export default {
  components: {
    ManageStyle, DataTable, DialogForm
  },
  data: () => {
    return {
    }
  },
  methods: {
    adduser(){
      let user = {
        rolename:'',
        username:"",
        name:"",
        phone:"",
        email:""
      }

       this.$refs['user-form'].show(user)
    },
    handleEdit(row) {
      console.log('edit', row)
      this.$refs['user-form'].show(row)
    },
    handleDelete(row) {
      console.log('del', row)
    },
    handleAdd() {
    },
    onSubmit(data) {
      console.log('submit', data)
      
    }
  }
}
</script>
