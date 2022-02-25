<template>
  <div class="table-contain">
    <div class="check-row" v-if="topOpera">
      <div>
        <!--    表格山上方按钮，如添加等按钮    -->
        <el-button
          v-for="(op,i) of tableOperations"
          :key="i"
          :type="op.type?op.type:'text'"
          :icon="op.icon?op.icon:undefined"
          class="table-button"
          :class="op.type"
          @click="op.action"
        ><span v-if="op.name">{{ op.name }}</span></el-button>

        <!--   表格下拉选择框    -->
        <span
          style="margin-right: 5px"
          v-for="(form,i) of tableSelections"
          :key="'select' + i"
        >
          <el-select
            v-if="form.type == 'select'"
            v-model="form.value"
            style="width: 200px"
            :placeholder="form.placeholder">
            <el-option
              v-for="(opt,i) in form.options"
              :key="'opt' + i"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <!--    查询输入框      -->
          <el-input
            v-else-if="form.type == 'input'"
            v-model="form.value"
            style="width: 150px"
            :placeholder="form.placeholder"></el-input>
        </span>
        <!--   查询按钮     -->
        <el-button v-show="tableSelections.length > 0" type="primary">查询</el-button>

        <!--   radio选择框     -->
        <el-radio
          style="margin-left: 20px"
          v-if="radio.show"
          v-for="(rad,idx) in radio.labels"
          :key="'rad' + idx"
          v-model="radio.value"
          @change="radio.action"
          :label="rad">{{ rad }}
        </el-radio>
      </div>
      <!--   表格右侧部分   -->
      <div style="display: flex;flex-direction: row">
        <el-popover
          v-show="filter"
          placement="bottom-end"
          width="100">
          <div class="checkbox-container">
            <el-checkbox class="checkbox" v-for="(f,i) of thisFields" :key="i" :label="f.name" v-model="f.show"/>
          </div>
          <img slot="reference" src="../assets/filter.png"
               style="width: 16px;height: 16px;padding: 3px; border: 1px solid #777;cursor: pointer">
        </el-popover>
        <img v-show="download" src="../assets/import.png"
             style="width: 16px;margin-left: 10px; height: 16px;padding: 3px; border: 1px solid #777;cursor: pointer">
        <el-popover
          v-show="info.show"
          style="margin-left: 10px"
          placement="bottom-end">
          <div class="checkbox-container">
            <div><span style="color: #14C193">绿色：</span>正常在库，可正常领用</div>
            <div><span style="color: #ffba00">黄色：</span>接近试验周期节点（30天内）</div>
            <div><span style="color: #ff4949">红色：</span>接近试验周期节点（10天内）</div>
            <div><span style="color: #804000">棕色：</span>工器具正常领用出库，退库时被标记为“退库待查”</div>
            <div><span style="color: #9832cd">紫色：</span>工器具正常领用出库后未正常退库，丢失状态</div>
            <div><span style="color: #aaaaaa">灰色：</span>正常领用出库或试验出库</div>
          </div>
          <div slot="reference">
            <img src="../assets/info.png"
                 style="width: 16px;height: 16px;padding: 3px; border: 1px solid #777;cursor: pointer">
          </div>
        </el-popover>
      </div>
    </div>
    <!--  表格正文  -->
    <div class="table">
      <el-table
        ref="dataTable"
        :header-cell-style="{'text-align':'center','padding':'0'}"
        :cell-style="{padding:'3px'}"
        :row-style="{padding:'0'}"
        :row-class-name="tableRowClassName"
        :data="table.data"
        :loading="table.loading"
        :span-method="merge.show == true ? cellMerge : null"
        :border="border"
        :fit="true"
        :stripe="stripe"
        class="data-table"
        @selection-change="handleSelectionChange">
        <el-table-column align="center" v-if="checkbox" type="selection" width="55"></el-table-column>
        <el-table-column align="center" v-if="index" type="index" width="55"></el-table-column>
        <el-table-column v-if="expand" type="expand">
          <template slot-scope="scope">
            <el-table
              :data="scope.row['list']"
              :header-cell-style="{'text-align':'center','padding':'0'}"
              :cell-style="{padding:'0'}"
              :row-style="{padding:'0'}"
              :stripe="true"
              border>
              <el-table-column v-for="(expad,i) of expandList" :key="i+'expand'" :fixed="expad.fixed" :prop="expad.id"
                               :label="expad.name" :width="expad.width!=undefined ? expad.width : 'auto'">
                <template slot-scope="scope">
                  <div v-if="expad.filter" v-html="expad.filter(scope.row[expad.id])"></div>
                  <div v-else>{{ scope.row[expad.id] }}</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(field,i) of showPropList" sortable :key="i" :fixed="field.fixed" :prop="field.id"
          :label="field.name" :width="field.width?field.width:'auto'">
          <template slot-scope="scope">
            <div v-if="field.filter" v-html="field.filter(scope.row[field.id])"></div>
            <div v-else-if="field.type == 'date'">
              <el-date-picker
                size="mini"
                style="width: 90%"
                v-model="scope.row[field.id]"
                type="date"
                placeholder="请选择日期">
              </el-date-picker>
            </div>
            <div v-else-if="field.type == 'input'">
              <el-input v-model="scope.row[field.id]" size="mini"></el-input>
            </div>
            <div v-else-if="field.type == 'button'">
              <el-button :type="field.info.type" @click="field.info.action">{{ scope.row[field.id] }}</el-button>
            </div>
            <div v-else-if="field.type == 'select'">
              <el-select v-model="scope.row[field.id]" size="mini" placeholder="请选择厂家">
                <el-option
                  v-for="item in field.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row[field.id] }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="opera" fixed="right" label="操作" :width="operationsWidth">
          <template slot-scope="scope">
            <el-button-group v-if="opgroup">
              <!--  单个数据按钮是否显示，如果要确定某一行是否显示，就用opgroup=true,要使用就必须
              每条数据里面有operaShow-->
              <el-button
                v-for="(op,i) of operations"
                v-if="scope.row.operaShow"
                :key="i"
                :type="op.type?op.type:'text'"
                :icon="op.icon?op.icon:undefined"
                size="mini"
                plain
                @click="op.action(scope.row,scope.$index)"
              ><span v-if="op.name">{{ op.name }}</span></el-button>
            </el-button-group>
            <div v-else>
              <!-- 所有数据的按钮是否显示,所有数据的按钮是否显示 -->
              <el-button
                v-for="(op,i) of operations"
                v-if="op.show == false ? false : true"
                :key="i"
                :type="op.type?op.type:'text'"
                :icon="op.icon?op.icon:undefined"
                size="mini"
                plain
                @click="op.action(scope.row,scope.$index)"
              ><span v-if="op.name">{{ op.name }}</span></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="page"
      :current-page="table.current"
      :page-size="5"
      layout="sizes, total, prev, pager, next, jumper"
      :total="table.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import request from '../core/request'

export default {
  props: {
    operationsWidth: {
      type: Number,
      default: 100
    },
    topOpera: {
      type: Boolean,
      default: false
    },
    radio: {
      type: Object,
      default: () => {
        return {
          show: false,
          value: '未审核',
          labels: ['未审核', '已审核'],
          action: null,
        }
      }
    },
    index: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    merge: {
      type: Object,
      default: () => {
        return {
          show: false,
          needMergeArr: ['people'],
          rowMergeArrs: {},
          param: 'people'
        }
      }
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    expandList: {
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
    download: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    checkbox: {
      type: Boolean,
      default: false,
    },
    opera: {
      type: Boolean,
      default: false,
    },
    color: {
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
        return []
      }
    },
    tableSelections: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOperations: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      size: 6,
      thisFields: [],
      table: {
        loading: true,
        data: [],
        total: 0,
        current: 0,
      },
      width: '',
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
    },

  },
  watch: {},
  created() {
    this.thisFields = this.fields
    this.initList()


  },
  methods: {

    selectChange(data, i) {
      console.log(this.tableSelections)
      this.tableSelections[i].value = data
    },


    getAllLength() {
      this.thisFields.map((item) => {
        this.width += parseInt(item.width)
        this.width = parseInt(this.width)
        this.width += 10
      })
      this.width += parseInt(this.operationsWidth)
      this.width += 'px'
    },

    cellMerge({row, column, rowIndex, columnIndex}) {
      if (column.property === this.merge.param) return this.mergeAction(this.merge.param, rowIndex, column)
    },
    mergeAction(val, rowIndex, colData) {
      let _row = this.merge.rowMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        };
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      return needMerge;
    },


    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', {
        val
      })
    },

    tableRowClassName({row, rowIndex}) {
      if (!this.color) {
        return
      } else {
        return row.colorName
      }
    },

    initList() {
      // 如果有分页
      if (this.page) {
        if (this.data) {
          this.data.from = this.table.current * this.size
          this.data.to = this.data.from + this.size
        } else {
          this.data = {}
          this.data.from = this.table.current * this.size
          this.data.to = this.data.from + this.size
        }
      }
      if (this.url) {
        request({
          url: this.url,
          method: 'post',
          data: this.param
        }).then(resp => {
          console.log(resp)
        })
      }
      this.$emit("initDataTable", {
        data: null,
        success: (data) => {
          this.table.data = data
          if (this.page) {
            this.table.total = resp.data.total
          }
          if (this.merge.show) {
            this.merge.rowMergeArrs = this.rowMergeHandle(this.merge.needMergeArr, this.table.data)
          }
          this.getAllLength()

        }
      })
    },
    handleCurrentChange(v) {
      this.table.current = v
      this.initList()
    }
  }
}
</script>
<style lang="scss" scoped>

.tableHead {
  text-align: center;
}

.table-contain {
  height: 100%;
  background-color: #fff;
  width: 100%;
}

.table-button {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
}

.primary {
  background-color: #52d3c7;
  border-color: #52d3c7;

  &:hover {
    background-color: #52d3d7;
  }
}

.check-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px;
}


.data-table {
  margin: 0 auto;
}

.table {
  margin: 0 auto;
  background-color: #ffffff;
}

.checkbox {
  margin-bottom: 10px;
  margin-right: 60px;
}

.checkbox-container {
  display: flex;
  flex-direction: column;

  .checkbox {
    width: 100px;
    margin-bottom: 10px;
    margin-right: 0;
  }
}
</style>

