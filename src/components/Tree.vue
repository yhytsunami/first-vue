<template>
  <div class="hello">
    <h1>{{ p_msg }}</h1>
    <el-button  type="primary" @click="getInitData">展示技能树</el-button>
    <el-button type="primary" @click="addTreeType = true">增加技能树类型</el-button>
    <el-tree v-if="showtree" :data="data" :props="defaultProps"
             @node-click="handleNodeClick" :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => fillData(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="录入菜单" :visible.sync="fillTreeNode">
      <el-form ref="form" :model="form" @keyup.enter.native="submitFill">
        <el-form-item label="技能描述">
          <el-input  v-model="form.desc"  />
          <el-input v-show="false"  v-model="form.parentId"  />
          <input v-show="false"  v-model="form.data"  />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFill" >确定</el-button>
          <el-button @click="closeFill">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="增加类型" :visible.sync="addTreeType">
      <el-form ref="typeform" :model="typeform" @keyup.enter.native="submitTreeType">
        <el-form-item label="技能描述">
          <el-input  v-model="typeform.desc"  />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTreeType" >确定</el-button>
          <el-button @click="typeform = {},addTreeType=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  methods:{
    handleNodeClick(node){
      console.log(node);
    },
    closeFill(){
      this.form = {};
      this.fillTreeNode=false
    },
    async getInitData(){
      console.log("get Init data");
      //获取技能树对象 TODO
      let res = await this.$http.post(this.urls.queryTree,{});
      console.log(res);
      this.data = res.body;
      this.showtree = true;
    },
    fillData(data){
      this.closeFill();
      this.fillTreeNode = true;
      this.form.data = data;
    },
    async submitFill(){
      //入库 生成id TODO
      let label = this.form.desc;
      let submitObj = {label:label,parentId:this.form.data.id};
      let res = await this.$http.post(this.urls.insert,submitObj);
      // const newChild = { id: new Date().getTime(), label: label, children: [] };
      const newChild = res.body;
      let data = this.form.data;
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      this.form = {};
      this.fillTreeNode = false;
    },
    async submitTreeType(){
      let label = this.typeform.desc;
      let submitObj = {label:label,parentId:'0'};
      let res = await this.$http.post(this.urls.insert,submitObj);
      const newType = res.body;
      console.log(this.data);
      this.data.push(newType);
      this.typeform = {};
      this.addTreeType = false;
    },
    async remove(node,data){
      const parent = node.parent;
      let res = await this.$http.post(this.urls.delete,{id:data.id});
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      console.log("node",node,"data",data);
    }
  },
  data () {
    return {
      urls:{
        delete:process.env.BASE_URL+"/tree/delete",
        insert:process.env.BASE_URL+"/tree/insert",
        queryTree:process.env.BASE_URL+"/tree/queryTree",
      },
      showtree:false,
      fillTreeNode:false,
      form:{},
      addTreeType:false,
      typeform:{},
      p_msg: 'tree root',
      data:[{
        label: '一级 1',
        value: 'value',
        text:'text',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style scoped>

</style>
