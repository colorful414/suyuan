<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.cropName" placeholder="产品名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" style="margin-left: 80px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 50px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-left: 50px;" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="播种记录ID" prop="id" sortable="custom" align="center" width="110" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播种环节溯源码" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作物名称" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cropName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="种子来源" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedSource }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播种时间" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播种量(kg)" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播种地点" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="种植员" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.seedPeople }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)" round>
            编辑
          </el-button>
          <el-button v-if="row.status!='删除'" size="mini" type="danger" @click="handleDelete(row,$index)" round>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="播种记录ID" prop="seedCode">
          <el-input v-model="temp.id"  :disabled='isDis'/>
        </el-form-item>
        <el-form-item label="播种环节溯源码" prop="seedCode">
          <el-input v-model="temp.seedCode" :disabled='isDis'/>
        </el-form-item>
        <el-form-item label="作物名称" prop="cropName">
          <el-input v-model="temp.cropName" />
        </el-form-item>
        <el-form-item label="种子来源" prop="cropName">
          <el-input v-model="temp.seedSource" />
        </el-form-item>
        <el-form-item label="播种时间" prop="seedTime" v-show='timeShow'>
          <el-date-picker v-model="temp.seedTime" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="播种量" prop="seedPlace">
          <el-input v-model="temp.seedRate" />
        </el-form-item>
        <el-form-item label="播种地点" prop="seedPlace">
          <el-input v-model="temp.seedPlace" />
        </el-form-item>
        <el-form-item label="种植员" prop="seedPlace">
          <el-input v-model="temp.seedPeople" />
        </el-form-item>
        <el-form-item label="备注" prop="seedPlace">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { seedList, detail, create, update, deletes } from '@/api/bozhong'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Upload from '@/components/Upload/SingleImage3'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'ComplexTable',
  components: { Pagination,Upload},
  directives: { waves },
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      isDis:true,
      timeShow:true,
      listQuery: {
        page: 1,
        limit: 20,
        seedCode: undefined,
        cropName:'',
        seedPlace:'',
        sort: '+id',
        seedTime: new Date(),
        seedRate: '',
        seedSource: '',
        seedPeople:'',
        remark:'',
      },
      calendarTypeOptions,
      temp: {
        id: undefined,
        seedCode:'',
        cropName:'',
        seedPlace:'',
        seedTime: new Date(),
        seedRate: '',
        seedSource: '',
        seedPeople:'',
        remark:'',
      },
      temp2:{
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // seedTime: [{ type: 'string', required: true, message: 'seedTime is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  // computed:{
  //   timeShow2(){
  //     var _this =this
  //     return _this.timeShow = true ? _this.temp : _this.temp2
  //   }
  // },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      seedList().then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }).catch(
      setTimeout(() => {
        this.listLoading = false
      }, 3000)
      )
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        seedTime: new Date(),
        cropName:'',
        seedPlace:'',
        seedRate: '',
        seedSource: '',
        seedPeople:'',
        remark:'',
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.isDis = false
      this.timeShow = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        this.$delete(this.temp,'seedTime')
        this.temp2 = this.temp
        console.log(this.temp2)
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          create(this.temp2).then(() => {
            this.list.unshift(this.temp2)
            this.dialogFormVisible = false
            this.isDis = true
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      const id = row.id;
      detail(id).then(response => {
        this.temp = response.data
        // console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          // tempData.seedTime = +new Date(tempData.seedTime) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该表单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      const ids = row.id;
      deletes(ids).then(response => {
        this.temp = response.data
        console.log(this.temp)
      })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.list.splice(index, 1)  
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      });          
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['seedTime', 'title', 'type', 'importance', 'status']
        const filterVal = ['seedTime', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'seedTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped lang='less'>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
  .add-row {
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .label-span {
      width: 160px;
      padding-right: 15px;
      padding-left: 15px;
      &:first-child {
        width: 270px;
        text-align: right;
      }
    }
  }
  .delete-btn {
    height: 28px;
    margin-left: 10px;
  }
  .el-icon-delete {
    display: block;
    padding-top: 0px;
  }
  .footer-btn {
    margin-top: 10px;
    text-align: right;
  }
</style>