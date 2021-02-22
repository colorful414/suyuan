<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.productname" placeholder="产品名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.producer" placeholder="产商" style="width: 100px;margin-left:80px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <!-- <el-table-column type="expand">
        <template slot-scope="props" >
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label=inner.name v-for="(inner,index) in list[0].items" :key="index">
              <span>{{ props.row.variable }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column header-align='center' label="序号" prop="id" sortable="custom" align="center" width="180" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align='center' label="流程类型" prop="liuchengtype" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.liuchengtype }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="流程名称" prop="liuchengname" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.liuchengname }}</span>
        </template>
      </el-table-column> -->
   <el-table-column header-align='center' prop="liuchengname" label="流程名称" key="aa" align="center" width="180">
     <template slot-scope="scope">
       <!-- <span>{{ scope.row.liuchengname }}</span> -->
       <el-popover
         placement="bottom"
         width="400"
         trigger="click">
         <ul v-for="(item,index) in scope.row.items" :key="index">
           <li>{{item.value}}</li>
         </ul>
         <span slot="reference" type="text">{{scope.row.items[0].value}}
           <i class="el-icon-arrow-down"></i>
         </span>
       </el-popover>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item label="流程类型" prop="liuchengtype" >
          <el-input v-model="temp.liuchengtype" width='100px'/>
        </el-form-item>
        <!-- <el-form-item label="流程名称" prop="liuchengname"  >
          <el-input v-model="temp.liuchengname" width='100px'/>
        </el-form-item> -->
        <el-form-item
            v-for="(item, index) in temp.items"
            :label="'流程名称' + index"
            :key="item.key"
            :prop="'items.' + index + '.value'"
            :rules="{
              required: true, message: '流程名称不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="item.value" ></el-input>
            <el-button  style="margin-left:280px;top:-35px;position: relative;" 
            @click.prevent="removeitem(item)"
            :disabled="arr<1 ? true : false"
            >删除</el-button>
          </el-form-item>
            <!-- <div v-for="(item, index) in temp.items" :key="item.key" class="add-row">
                <el-form-item :prop="'items.' + index + '.name'"
                    :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
                    <el-input v-model="item.name" size="mini" class='el-input1'></el-input>
                </el-form-item>
                <el-form-item :prop="'items.' + index + '.variable'"
                    :rules="{required: true, message: '变量值不能为空', trigger: 'blur'}">
                    <el-input v-model="item.variable" size="mini" class='el-input2'></el-input>
                </el-form-item>
                <el-button @click="removetemp(item)" class="el-icon-delete" size="mini" circle v-if="temp.items.length !== 1">
                </el-button>
                <el-button @click="addtemp" size="mini" class="el-icon-plus" circle></el-button>
            </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="additem">新增流程</el-button>
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
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Upload from '@/components/Upload/SingleImage3'

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
      arr:0,
      listQuery: {
        page: 1,
        limit: 20,
        liuchengtype: undefined,
        liuchengname: undefined,
        sort: '+id',
        id:undefined,
        items: [{
            value: '',
         }]
      },
      temp: {
        id: undefined,
        liuchengtype:undefined,
        liuchengname: undefined,
        items: [{
            value: '',
         }]
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
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // var _arr = Object.keys(this.listQuery);
      // this.arr = _arr
      // console.log(this.arr);
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // console.log(response.data.items);
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
        liuchengtype: undefined,
        liuchengname: undefined,
        items: [{
            value: '',
         }]
      }
    },
      removeitem(item) {
        this.arr--
        var index = this.temp.items.indexOf(item)
        if (index !== -1) {
          this.temp.items.splice(index, 1)
        }
      },
      additem() {
        this.arr++
        console.log(this.arr);
        this.temp.items.push({
          value: '',
          key: Date.now()
        });
      },
		// removetemp(item) {   
		// 	var index = this.temp.items.indexOf(item)
		// 	if (index !== -1) {
		// 		this.temp.items.splice(index, 1)
		// 	}    
		// },
		// addtemp() {
		// 	this.temp.items.push({
		// 		name: '',
		// 		variable: '',
		// 		key: Date.now()
		// 	});
		// },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
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
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.arr);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // var _arr = Object.keys(this.listQuery);
      // this.arr = _arr
      // console.log(this.arr);
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
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
        if (j === 'timestamp') {
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
</style>