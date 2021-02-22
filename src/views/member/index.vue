<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px">
      <el-input
        v-model="listQuery.username"
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="角色"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in userTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >新建</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95" type="index">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column align="center" label="企业编码" width="95">
        <template slot-scope="scope">{{ scope.row.firmid }}</template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="155">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="角色" width="130" align="center">
        <template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
      </el-table-column>
      <el-table-column label="备注" width="230" align="center">
        <template slot-scope="scope"><span>{{ scope.row.remark }}</span></template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row,$index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 20"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <!-- 弹出对话框，用于新建用户 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px margin-left:50px"
      >
        <el-form-item label="企业编码" prop="firmid">
         <el-col :span="8">
          <el-input v-model="temp.firmid" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
         <el-col :span="8">
          <el-input v-model="temp.username" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="账号" prop="account">
         <el-col :span="8">
          <el-input v-model="temp.account" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
         <el-col :span="8">
          <el-input v-model="temp.password" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="重复密码" prop="respassword">
         <el-col :span="8">
          <el-input v-model="temp.respassword" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="connect">
         <el-col :span="8">
          <el-input v-model="temp.connect" size="mini"/>
          </el-col>
        </el-form-item>
        <el-form-item label="类型" prop="type">
         <el-col :span="8">
          <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="请选择角色"
          ><el-option v-for="item in userTypeOptions" :key="item" :label="item" :value="item" /></el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
         <el-col :span="8">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="输入工作描述"
          />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出对话框，用于新建用户 end-->
  </div>
</template>

<script>
import { fetchList, fetchPv, createMember, updateMember } from '@/api/member'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = { published: 'success', draft: 'gray', deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  },
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
                callback(new Error('请输入密码'));
        } else {
          if (this.temp.password !== '') {
              this.$refs.dataForm.validateField('respassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.temp.respassword) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: { 
      page: 1, 
      limit: 20, 
      memberid: undefined, 
      username: undefined, 
      type: undefined, 
      sort: '+id',
      account: undefined,
      connect: '',
      firmid: undefined,        
      },
      userTypeOptions:['企业负责人', '种植员', '检验员','加工包装员','物流负责人','分销商'],
      sortOptions: [{label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }
      ],
      temp:{ 
      memberid: undefined,
      remark: '',
      username: '',     
      password: '',     
      type: '',
      account: undefined,
      respassword: '',
      connect: '',
      firmid: undefined,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: { update: '编辑管理员', create: '新建管理员' },
      // 编辑用户信息-表单验证
        dataForm: {
          password: '',
          respassword:''
        },
      rules: {
        username: [{required: true, message: 'username is required', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        respassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur', required: true }
        ],
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        account: [{ required: true, message: 'account is required', trigger: 'change' }],
        connect: [{ required: true, message: 'connect is required', trigger: 'change' }],
        firmid: [{ required: true, message: 'firmid is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // get memebers list
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => { this.listLoading = false }, 500)
      })
    },
    handleFilter() {
      console.log('search', this.listQuery.username)
      this.listQuery.page = 1
      this.fetchData()
    },
    // open the dialog
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // add a memeber
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createMember(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000 })
          })
        }
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateMember(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
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
    resetTemp() {
      this.temp = { 
        id: undefined, 
        remark: '',
        // timestamp: new Date(),
        title: '',
        type: '',
        account: undefined,
        password: '',
        respassword: '',
        connect: '',
        firmid: undefined,
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>