
<template>
  <div class="dashboard-container">
    <div class="settings">
       <el-row class="configitems">
        <el-divider content-position="left"><i class="el-icon-s-grid ">&nbsp;&nbsp;用户组管理</i></el-divider>
      </el-row>
    <!-- <div style="float: left;"> -->
      <el-row>
      <el-col :span="10"
                :offset="21">
      <el-button type="primary" @click="open1()">创建用户组</el-button>
      </el-col>
      </el-row>
     <!-- </div> -->
     <!-- <div style="float: right;">
      <el-row>
     
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
         
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
     </div> -->
     <el-row>
        <el-col :span="20"
                :offset="2">
      <el-table 
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        v-el-table-infinite-scroll="load"
         height="400"
         :default-sort="{prop: 'date', order: 'descending'}"
       border style="width: 100%;overflow:auto"
       >
       
        <el-table-column fixed prop="name" label="名称" ></el-table-column>
        <el-table-column prop="additionalInfo" label="描述"></el-table-column>
        <el-table-column prop="country" label="国家" ></el-table-column>
        <el-table-column prop="city" label="城市" ></el-table-column>
        <el-table-column prop="state" label="邮政编码" ></el-table-column>
        <!-- <el-table-column prop="province" label="地址" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column prop="address2" label="地址2" ></el-table-column>
        <el-table-column prop="phone" label="手机" width="120" ></el-table-column>
        <el-table-column prop="email" label="邮箱" width="130" ></el-table-column>
        <el-table-column align="right" width="350">
              <template slot="header"
                        slot-scope="scope">
                <el-input v-model="search"
                 style="width: 100%"
                          size="max"
                          placeholder="输入关键字搜索" />
              </template>
        
        <!-- <el-table-column label="操作" width="390"> -->
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="warning"
               size="mini"
            >删除</el-button>
            <el-button type="warning" size="mini" @click="open(scope.$index, scope.row)">编辑</el-button>
            <el-button
              @click.native.prevent="mangerRow(scope.$index, scope.row)"
              type="warning"
               size="mini"
            >管理用户</el-button>
             <el-button
              @click.native.prevent="manRow(scope.$index, scope.row)"
              type="warning"
               size="mini"
            >管理设备</el-button>
            <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
          </template>
        <!-- </el-table-column> -->
        </el-table-column>
      </el-table>
     
        </el-col>
     </el-row>
    </div>
    <el-dialog title :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="名称 :" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="描述 :" :label-width="formLabelWidth">
            <el-select v-model="form.additionalInfo" placeholder="请选择设备类型">
              <el-option v-model="form.additionalInfo"></el-option>
              <el-option v-model="form.additionalInfo"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="描述 :" :label-width="formLabelWidth">
            <el-input v-model="form.additionalInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址 :" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          
            <el-form-item label="手机 :" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="地址 :" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="地址2 :" :label-width="formLabelWidth">
            <el-input v-model="form.address2" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="城市 :" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="国家 :" :label-width="formLabelWidth">
            <el-input v-model="form.country" autocomplete="off"></el-input>
          </el-form-item>
          
            <el-form-item label="邮箱 :" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          
            <el-form-item label="邮政编码 :" :label-width="formLabelWidth">
            <el-input v-model="form.state" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="success" @click="handlesubmit()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title :visible.sync="dialogFormVisible1" center>
        <el-form :model="form">
          <el-form-item label="名称 :" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="描述 :" :label-width="formLabelWidth">
            <el-select v-model="form.additionalInfo" placeholder="请选择设备类型">
              <el-option v-model="form.additionalInfo"></el-option>
              <el-option v-model="form.additionalInfo"></el-option>
            </el-select>
          </el-form-item> -->
          
          <el-form-item label="描述 :" :label-width="formLabelWidth">
            <el-input v-model="form.additionalInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机 :" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址 :" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="地址2 :" :label-width="formLabelWidth">
            <el-input v-model="form.address2" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="城市 :" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="国家 :" :label-width="formLabelWidth">
            <el-input v-model="form.country" autocomplete="off"></el-input>
          </el-form-item>
          
            <el-form-item label="邮箱 :" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          
            <el-form-item label="邮政编码 :" :label-width="formLabelWidth">
            <el-input v-model="form.state" autocomplete="off"></el-input>
          </el-form-item>
         
            
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="success" @click="handlesubmit()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getpage} from "@/api/page";
import {getCustomers,deleteCustomers,saveCustomer,getTenantCustomer,getCustomerDevices}  from"@/api/custom";
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import userManageVue from './userManage.vue';
export default {
   directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data() {
    return {
      save:0,
      id:"",
      search: "",
      count:3,
      count1:3,
      totalDate:0 ,
      pageSize:0 ,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
      {}
      ],
      dialogFormVisible1: false,
       dialogFormVisible: false,
      form: {
         name: "",
         additionalInfo: "",
        address: "",
        zip: "",
       address2: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        state: "",
        title: "",
      },
      formLabelWidth: "120px",
    };
  },
   created() {
    this.updatepage();
    // this.load();
  },
  methods: {
     updatepage() {
    //  getpage().then((res) => {
    //   console.log(res.pageCount);
    //    this.address=res.pageCount;
    //     this.totalDate=res.pageCount;
    //     this.pageSize=res.pageSize;
    //   });

     },
     manRow(index, rows){
       getCustomerDevices(rows.id.id,this.count1).then((res) => {
      console.log(rows.id.id);
      // console.log(res.data);
      // this.tableData=res.data;
      // if(res.hasNext==true)
      // {
      //   this.count++;
      // }
      this.$router.push({path:'deviceManage', query:{ val:res } })
      
      });
     },
     load(){
       getCustomers(this.count).then((res) => {
      console.log("res.data");
      console.log(res.data);
      this.tableData=res.data;
      if(res.hasNext==true)
      {
        this.count++;
      }
      
      });

     },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteRow(index, rows) {
       this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
      deleteCustomers(rows.id.id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
              this.count--;
              this.load();
          });
    
       })
       .catch(() => {});
    },
    mangerRow(index, rows){
      // console.log("12345");
      // console.log("rows");
      this.$router.push({path:'./userManage',query:{id:rows.id.id}})
    },
    open(index, rows) {
         this.dialogFormVisible = true;
          this.form.name= rows.name;
         this.form.additionalInfo= rows.additionalInfo;
        this.form.address= rows.address;
        this.form.zip= rows.zip;
       this.form. address2= rows.address2;
        this.form.city= rows.city;
        this.form.country= rows.country;
        this.form.email= rows.email;
        this.form.phone= rows.phone;
        this.form.state= rows.state;
        this.form.title= rows.title;
        this.id=rows.id.id;
          

    },
    open1() {
         this.dialogFormVisible1 = true;
          this.form.name= "";
         this.form.additionalInfo= "";
        this.form.address= "";
        this.form.zip= "";
       this.form. address2= "";
        this.form.city= "";
        this.form.country= "";
        this.form.email= "";
        this.form.phone= "";
        this.form.state= "";
        this.form.title= "";
        this.save=1;


    },
     handlesubmit() {
       var flag=0;
       console.log("this.form");
      console.log(this.form);
      // var formData = new FormData();
      // formData.append("name", this.form.name);
      // formData.append("type", this.form.type);
      // formData.append("label", this.form.label);
      // formData.append("additionalInfo", this.form.additionalInfo);

      this.form.title=this.form.name;
      if(this.save==0)
       {  try{
         getTenantCustomer(this.form.title).then((res) => {
      console.log("this.form");
        console.log(res);
      if(res!=null){
        flag=1;
         this.$confirm("此操作使用重复的名称，请重新输入", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      });        
       

      }
      
      });}catch( e){

      }finally{
        deleteCustomers(this.id);
       saveCustomer(this.form).then((res) => {
        this.dialogFormVisible = false;
        this.count--;
        this.load();
      });
      }
      
      }
      console.log(this.save);
      if(flag==0)
     { 
       saveCustomer(this.form).then((res) => {
        this.dialogFormVisible = false;
        this.count--;
        this.load();
      });}
        
      
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