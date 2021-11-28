<template>
  <div style="width: 100%">
    <el-row style="margin: 20px">
      <el-checkbox class="checkbox" v-for="(f,i) of thisFields" :key="i" :label="f.name" v-model="f.show"/>
    </el-row>
    <div class="table">
      <el-table :data="table.data" :loading="table.loading" :border="border" :stripe="stripe" class="data-table">
        <el-table-column v-for="(field,i) of showPropList" :key="i" :fixed="field.fixed" :prop="field.id"
                         :label="field.name" :width="field.width?field.width:'auto'">
          <template slot-scope="scope">
            <div v-if="field.filter" v-html="field.filter(scope.row[field.id])"></div>
            <div v-else>{{ scope.row[field.id] }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="operations.length > 0" fixed="right" :width="operations.length*100" label="操作">
          <template slot-scope="scope">
            <el-button-group v-if="opgroup">
              <el-button
                v-for="(op,i) of operations"
                :key="i"
                :type="op.type?op.type:'text'"
                :icon="op.icon?op.icon:undefined"
                size="mini"
                plain
                @click="op.action(scope.row)"
              ><span v-if="op.name">{{ op.name }}</span></el-button>
            </el-button-group>
            <div v-else>
              <el-button
                v-for="(op,i) of operations"
                :key="i"
                :type="op.type?op.type:'text'"
                :icon="op.icon?op.icon:undefined"
                size="mini"
                plain
                @click="op.action(scope.row)"
              ><span v-if="op.name">{{ op.name }}</span></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="page"
      :current-page="table.current"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="table.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import setting from '../config'
import request from '../core/request'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    page: {
      type: Boolean,
      default: false
    },
    opgroup: {
      type: Boolean,
      default: false
    },
    opfix: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => {
        return [
          {
            name: '字段1', id: 'field1', show: true, width: 230, fixed: false, filter: (v) => {
              return v
            }
          }
        ]
      }
    },
    operations: {
      type: Array,
      default: () => {
        return [
          {
            name: '操作1', action: (v) => {
              return v
            }
          }
        ]
      }
    },
  },
  data() {
    return {
      size: 10,
      thisFields: [],
      table: {
        loading: true,
        data: [],
        total: 0,
        current: 0,
      }
    }
  },
  computed: {
    showPropList() {
      const arr = []
      for (const r of this.thisFields) {
        if (r.show) {
          arr.push(r)
        }
      }
      return arr;
    }
  },
  created() {
    this.thisFields = this.fields
    this.initList()
  },
  methods: {
    initList() {
      if (this.page) {
        if (this.data) {
          this.data.from = this.table.current * this.size
          this.data.to = this.data.from + this.size
        } else {
          // this.data = {}
          this.data.from = this.table.current * this.size
          this.data.to = this.data.from + this.size
        }
      }
      console.log(this.data)
      request({
        url: setting.BASE_URL + this.url,
        method: 'post',
        data: this.data
      }).then(resp => {
        if (!this.page) {
          this.table.data = resp.data
        } else {
          this.table.data = resp.data.data
          this.table.total = resp.data.total
        }
      }).catch(e => {
        this.$message.error('获取数据失败：' + e)
      })
    },
    handleCurrentChange(v) {
      this.table.current = v
      this.initList()
    }
  }
}
</script>
<style lang="scss">
.data-table {
  width: 98%;
  min-height: 400px;

  .el-table__body-wrapper {
    min-height: 400px;
  }
}

.table {
  padding: 20px;
  border-radius: 20px;
  background-color: #ffffff;
}

.checkbox {
  margin-bottom: 10px;
  margin-right: 60px;
}
</style>
