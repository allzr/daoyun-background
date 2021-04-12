<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>字典管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图-->
        <el-row class="cardbox">
            <el-col>
                <el-card class="card1">
                    <el-row :gutter="20">
                <el-col :span="6"> 
                    <el-input placeholder="搜索">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button class="adduser" type="primary">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="中文" prop="CName"></el-table-column>
                <el-table-column label="英文" prop="EName"></el-table-column>
                <el-table-column label="描述" prop="TName"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="子表" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-zoom-in" size ='mini' @click="showSubtable(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size='mini' @click="removeUser"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="quertInof.pagenum" :page-sizes="[50,100,200]" :page-size="quertInof.pagesize" 
            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
                </el-card>
            </el-col>
            <!-- 子表-->
            <el-col>
                <el-card class="card1">
                    <el-row :gutter="20">
                <el-col :span="6"> 
                    <el-input placeholder="搜索">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button class="adduser" type="primary">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="subtable" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="值" prop="value"></el-table-column>
                <el-table-column label="文本" prop="textin"></el-table-column>
                <el-table-column label="默认值" prop="isdefalut"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="editSub(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size='mini' @click="removeUser"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="quertInof.pagenum" :page-sizes="[50,100,200]" :page-size="quertInof.pagesize" 
            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
                </el-card>
            </el-col>
        </el-row>
        <!-- 修改主表窗口-->
        <el-dialog title="修改主表" :visible.sync="editDialogVisble" width="50%" >
            <el-form :model="edituser"  label-width="70px">
                <el-form-item label="中文" prop="CName">
                    <el-input v-model="edituser.CName" ></el-input>
                </el-form-item>
                <el-form-item label="英文" prop='EName'>
                    <el-input v-model="edituser.EName"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop='TName'>
                    <el-input v-model="edituser.TName"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="editDialogVisble = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改子表窗口-->
        <el-dialog title="修改子表" :visible.sync="editSubtable" width="50%" >
            <el-form :model="subtableA"  label-width="70px">
                <el-form-item label="值" prop="value">
                    <el-input v-model="subtableA.value" ></el-input>
                </el-form-item>
                <el-form-item label="文本" prop='textin'>
                    <el-input v-model="subtableA.textin"></el-input>
                </el-form-item>
                <el-form-item label="默认值" prop='isdefalut'>
                    <el-input v-model="subtableA.isdefalut"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="editDialogVisble = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default({
    data()  {
        return{
            quertInof:{
                query:'',
                pagenum:1,
                pagesize:1
            },
            tableData: [{
          id:0,
          date: '1',
          CName: '性别',
          EName: 'gender',
          TName: '用户性别',
          subtable:[
              {
                  id:0,
                  value:1,
                  textin:'男',
                  isdefalut:'true'
              },
                            {
                  id:1,
                  value:2,
                  textin:'女',
                  isdefalut:'false'
              }
          ]
        },{
          id:1,
          date: '2',
          CName: '学历',
          EName: 'education background',
          TName: '用户学历',
          subtable:[
              {
                  id:0,
                  value:1,
                  textin:'本科',
                  isdefalut:'true'
              },
            {
                  id:1,
                  value:2,
                  textin:'研究生',
                  isdefalut:'false'
              }
          ]
        }],
            total:0,
            editDialogVisble:false,
            editSubtable:false,
            edituser:{},
            subtable:{},
            subtableA:{},
        }
    },
    created() {
        this.total=this.tableData.length;
        this.subtable=this.tableData[0].subtable;
    },
    methods:{
        getlist(){
          console.log(this.total);  
        },
        handleSizeChange(newSize){
            console.log(newSize);
            this.quertInof.pagesize = newSize;
            this.getlist();
        },
        handleCurrentChange(newPage){
            console.log(newPage);
            this.getlist();
        },
        async removeUser(){
            const confirmResult = await  this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if(confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
        }
        else{
            return this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        },
        showEditDialog(index){
            this.edituser=this.tableData[index];
            console.log(this.edituser);
            this.editDialogVisble=true;
            
        },
        showSubtable(index){
            this.subtable=this.tableData[index].subtable;
            console.log(this.subtable);
        },
        editSub(index){
            this.subtableA=this.subtable[index];
            console.log(this.subtable);
            this.editSubtable=true;
        }
    }
})
</script>
<style lang="less" scoped>
    .adduser{
        position: absolute;
        right: 20px;
    }
    .cardbox{
        //display: flex;
        //justify-content: space-between;
        align-items: center;
    }
</style>