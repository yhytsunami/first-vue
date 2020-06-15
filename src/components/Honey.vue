<template>
  <div clas="hello">
    <el-button type="primary" @click="getInitData">展示甜心</el-button>
    <el-button type="primary" @click="fillHoney = true">录入甜心</el-button>
    <el-dialog title="登记甜心" :visible.sync="fillHoney">
      <el-form ref="form" :model="form">
        <el-form-item label="花名">
          <el-input  v-model="form.name"  />
        </el-form-item>
        <el-form-item label="价格">
          <el-input  v-model="form.price"  />
        </el-form-item>
        <el-form-item label="区域">
          <el-input  v-model="form.address"  />
        </el-form-item>
        <el-form-item label="信息">
          <el-input type="textarea"  v-model="form.info"  />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input  v-model="form.contact"  />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitHoney" >确定</el-button>
          <el-button @click="closeFill">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="信息提示" :visible.sync="showMessage">
      <span>提交成功</span>
    </el-dialog>
    <el-table v-if="showHoney" :data="tableData"
              height="250"
              border
              style="width: 100%"
    >
      <el-table-column prop="name" label="花名"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="address" label="区域"></el-table-column>
      <el-table-column prop="info" label="信息"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:"Honey",
    methods:{
      async getInitData(){
         let res = await this.$http.post(this.urls.honeyList);
          this.tableData = res.body,
            this.showHoney = true;
          console.log(res);
      },
      async submitHoney(){
        console.log(this.form);
        let res = await this.$http.post(this.urls.insert,this.form);
        debugger;
        if (res && res.body){
          this.closeFill();
          this.showMessage = true;
        }
      },
      closeFill(){
        this.form = {};
        this.fillHoney=false
      }
    },
    data (){
      return {
        tableData:[],
        showHoney:false,
        fillHoney:false,
        showMessage:false,
        form:{},
        urls:{
          honeyList:process.env.BASE_URL+"/honeyList",
          insert:process.env.BASE_URL+"/insert"
        }
      }
    }
  }
</script>

<style scoped>

</style>
