




<template>
    <div class="dashboard-container"  >

  <div  class="settings">
    <el-row class="configitems">
        <el-select type="primary" placeholder="按用户组查看">创建用户组</el-select>
      <el-button type="primary">创建用户组</el-button>
    </el-row>
    
    <el-row>
        <el-col :span="20"
                :offset="2">
      <el-table 
     
      :data="tableData"
       
       border style="width: 100%;overflow:auto">
       
        <el-table-column fixed prop="authority" label="所属用户组"></el-table-column>
        <el-table-column prop="name" label="名称" ></el-table-column>
        <el-table-column prop="additionalInfo" label="描述" ></el-table-column>
        <el-table-column prop="email" label="联系方式" ></el-table-column>
        <el-table-column align="right"  >
          <template slot="header"
                        slot-scope="scope">
                <el-input v-model="search"
                 style="width: 100%"
                          size="max"
                          placeholder="输入关键字搜索" />
              </template>
          <template slot-scope="scope">
            <el-button
              @click="deleteRow(scope.$index, scope.row)"
              type="danger"
               size="mini"
            >删除</el-button>
            <el-button type="warning" size="small"  @click="open(scope.$index, scope.row)">禁用</el-button>
            <el-button
              @click="actRow(scope.$index, scope.row)"
              type="warning"
               size="mini"
            >激活链接</el-button>
            <!-- @click.native.prevent="actRow(scope.$index, scope.row)" -->
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="使用该链接激活用户 :" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="success" @click="handlesubmit()">确 定</el-button>
        </div>
      </el-dialog>
        </el-col>
    </el-row>
    <!-- <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div> -->
  </div>
    </div>
</template>

<script>
import {getCustomerUsers,deleteUser,setUserCredentialsEnabled,getActivationLink}from "@/api/user" ;
export default {
  data() {
    return {
      // id:this.$router.query.id,
      id:0,
      count:3,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      search:'',
      value:'',
      // tableData: [{
      //   authority:"1",
      //   name:"1",
      //   additionalInfo:"1",
      //   email:"1",

      // }],
      tableData: [],
            dialogFormVisible: false,
      form: {
         name: "",
      },
      formLabelWidth: "150px",
    };
  },
  created() {
    this.test();
  },
  methods: {
    test(){
      console.log("this.$route.params.num");
      if(this.id==0){
         var id=this.$route.query.id;
      this.id=id;
      console.log("id");
      console.log(this.id);
      }
     console.log(this.tableData);
     if(true)
     { getCustomerUsers(this.id,this.count).then((res) => {
      console.log(res.data);
      if(res.data!=null){this.tableData=res.data;}
      
      console.log(this.tableData);
      if(res.hasNext==true)
      {
        this.count++;
      }
      
      });}
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteRow(index, rows) {
            console.log(rows.id.id);

      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
       deleteUser(rows.id.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
              this.count--;
              this.test();
          });
    
       })
       .catch(() => {});
    
     
     
      
     
     
    },
    actRow(index, rows) {
            console.log(rows.id.id);

     
       getActivationLink(rows.id.id).then((res) => {
         this.dialogFormVisible=true;
         this.form.name=res;
              this.test();
          });
    
       
    
     
     
      
     
     
    },
    open(index, rows) {
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
                      console.log("okokokok");
       setUserCredentialsEnabled(rows.id.id).then((res) => {
            this.$message({
              type: "success",
              message: "禁用成功!",
            });
            console.log("okokokok");
              this.test();
          });
    
       })
       .catch(() => {});
    
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.settings {
  margin: 35px 55px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &-i {
    font-size: 50px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>