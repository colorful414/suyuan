<template>
  <!-- 动态从后台获取数据渲染form表单，表单的label不固定，label和label对应的值均从后台获取 -->
  <!-- 为了展示效果，省略了向后台发送请求获取数据部分，直接给数据赋值 -->
  <!-- 功能：1.动态渲染form数据、2.动态添加属性和值，3.动态删除属性 -->
  <div>
    <el-button type="primary" size="mini" @click="edit">编辑数据</el-button>
    <el-dialog
      class="formDialog"
      title="编辑数据"
      :visible.sync="dialogVisible"
      width="600px"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" size="mini" label-width="100px">
        <!-- 1. 动态渲染form数据-->
        <el-form-item v-for="keyItem in Object.keys(form)" :key="keyItem">
          <span slot="label">{{keyItem}}</span>
          <el-input v-model="form[keyItem]" v-bind:disabled="keyItem=='id'"></el-input>
          <!-- 2.动态删除属性 -->
          <el-button
            class="delete-btn"
            v-show="keyItem!=='id' && keyItem!='name'"
            size="mini"
            icon="el-icon-delete"
            type="danger"
            plain
            @click="removeKey(keyItem)"
          ></el-button>
        </el-form-item>
      </el-form>
      <!-- 3.动态添加属性和值-->
      <div v-for="(item,index) in attrList" :key="index" class="add-row">
        <span class="label-span">key</span>
        <el-input v-model="item.attrKey" size="mini" />
        <span class="label-span">value</span>
        <el-input v-model="item.attrValue" size="mini" />
        <el-button
          class="delete-btn"
          v-if="attrList.length >= 1"
          size="mini"
          icon="el-icon-delete"
          type="danger"
          plain
          @click="removeRow(index)"
        ></el-button>
      </div>
      <div class="footer-btn">
        <el-button type="warning" size="mini" @click="addRow">新增属性</el-button>
        <el-button type="danger" @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="success" size="mini" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      attrList: [
        {
          attrKey: "",
          attrValue: ""
        }
      ],
      // 对话框相关属性
      dialogVisible: false,
      form: {}
    };
  },
  methods: {
    //打开编辑数据对话框
    edit() {
      this.attrList = [];
      this.dialogVisible = true;
      // axios从后台获取this.form数据，这里模拟仅直接赋值
      this.form = {
        id: 1,
        name: "maidu_xbd",
        hobby: "dance",
        job: "IT"
      };
    },
 
    //关闭对话框
    closeDialog() {
      this.form = {};
    },
    // 增加行
    addRow() {
      var attrLength = this.attrList.length;
      if (attrLength != 0) {
        if (
          (this.attrList[attrLength - 1].attrKey == "") |
          (this.attrList[attrLength - 1].attrValue == "")
        ) {
          this.$message.warning("请填写上一属性完整后再新增");
        } else {
          this.pushData();
        }
      } else {
        this.pushData();
      }
    },
    pushData() {
      this.$nextTick(() => {
        this.attrList.push({
          attrKey: "",
          attrValue: ""
        });
      });
      this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
    },
    // 删除已有属性
    removeKey(label) {
      console.log(label);
      this.$confirm("此操作将永该, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "正在删除,请稍等",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.6)"
          });
          // 下面写向后台发送删除属性请求，请求后重新向后台查询form数据
          // 此处不写请求，用setTimeout模拟效果
          setTimeout(() => {
            loading.close();
            this.$message.success("删除成功");
          }, 2000);
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    // 删除行
    removeRow(index) {
      this.attrList.splice(index, 1);
    },
    // 提交更新节点或边
    submitForm() {
      if (this.attrList.length != 0) {
        // ==========1.添加新的属性则先处理数据，再向后台发送请求
        // 首先判断input输入框是否填写完整
        if (
          this.attrList[this.attrList.length - 1].attrKey != "" &&
          this.attrList[this.attrList.length - 1].attrValue != ""
        ) {
          for (var i = 0; i < this.attrList.length; i++) {
            let key = this.attrList[i]["attrKey"];
            let value = this.attrList[i]["attrValue"];
            this.form[key] = value;
          }
          // 模拟发送请求
          this.requestUpdate();
        } else {
          this.$message.warning("请填写完整后提交");
        }
      } else {
        // ======2.没有添加新的属性则直接向后台发送请求
        // 模拟发送请求
        this.requestUpdate();
      }
    },
    // 模拟发送请求
    requestUpdate() {
      this.$message.success("信息更新成功");
      this.dialogVisible = false;
    }
  }
};
</script>
 <style lang="less">
//  对话框样式
.formDialog {
  .el-dialog__header {
    font-weight: 600;
    border-bottom: 1px solid #d5dada;
  }
  .el-dialog__body {
    padding: 20px;
    margin-right: 30px;
  }
  .el-form-item__content {
    display: flex;
  }
  // 动态添加属性和值
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
}
</style>
 