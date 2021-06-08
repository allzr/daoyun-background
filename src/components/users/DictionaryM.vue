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
                    <el-button class="adduser" type="primary" @click="addTableVisble = true">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="名称" prop="dataChineseKey"></el-table-column>
                <el-table-column label="关键字" prop="dataEnglishKey"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="showEditDialog(scope.row.lastEditorID)"></el-button>
                        </el-tooltip>
                        <el-tooltip  effect="dark" content="子表" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-zoom-in" size ='mini' @click="showSubtable(scope.row.lastEditorID)"></el-button>
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
                    <el-button class="adduser" type="primary" @click="openNewSubDialog()">新增</el-button>
                </el-col>
            </el-row>
            <el-table :data="subtable" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="值" prop="dataRank"></el-table-column>
                <el-table-column label="文本" prop="dataValue"></el-table-column>
                <el-table-column label="默认值" prop="defaultValue"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="ShoweditSub(scope.row.lastEditorID)"></el-button>
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
            <el-form :model="edituser"  :rules="editFormRules" label-width="70px">
                <el-form-item label="名称" prop="dataChineseKey">
                    <el-input v-model="edituser.dataChineseKey" ></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop='dataEnglishKey'>
                    <el-input v-model="edituser.dataEnglishKey"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="editTable()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改子表窗口-->
        <el-dialog title="修改子表" :visible.sync="editSubtable" width="50%" >
            <el-form :model="subtableA"  label-width="70px">
                <el-form-item label="值" prop="dataRank">
                    <el-input v-model="subtableA.dataRank" ></el-input>
                </el-form-item>
                <el-form-item label="文本" prop='dataValue'>
                    <el-input v-model="subtableA.dataValue"></el-input>
                </el-form-item>
                <el-form-item label="默认值" prop='defaultValue'>
                    <el-input v-model="subtableA.defaultValue"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="SaveEditSub()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加主表-->
        <el-dialog title="修改主表" :visible.sync="addTableVisble" width="50%" >
            <el-form :model="addTable"  :rules="editFormRules" label-width="70px">
                <el-form-item label="名称" prop="dataChineseKey">
                    <el-input v-model="addTable.dataChineseKey" ></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop='dataEnglishKey'>
                    <el-input v-model="addTable.dataEnglishKey"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="addTableClick()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增子表 -->
        <el-dialog title="修改子表" :visible.sync="newsubTableVisble" width="50%" >
            <el-form :model="newsubTable"  label-width="70px">
                <el-form-item label="值" prop="dataRank">
                    <el-input v-model="newsubTable.dataRank" ></el-input>
                </el-form-item>
                <el-form-item label="文本" prop='dataValue'>
                    <el-input v-model="newsubTable.dataValue"></el-input>
                </el-form-item>
                <el-form-item label="默认值" prop='defaultValue'>
                    <el-input v-model="newsubTable.defaultValue"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="saveNewSubtable()">确 定</el-button>
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
            tableData: [],
            total:0,
            editDialogVisble:false,
            editSubtable:false,
            addTableVisble:false,
            edituser:{},
            subtable:[],
            subtableA:{},
            addTable:{
                dataChineseKey:'',
                dataEnglishKey:''
            },
            editFormRules:{
                dataChineseKey:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                dataEnglishKey:[{ required: true, message: '请输入关键字', trigger: 'blur' }]
            },
            editID:0,
            newsubTable:{},//新增子表
            newsubTableVisble:false,//子表可视化参数
        }
    },
    async created() {
        let res = {};
        res = await this.$http.get("/dataDic/selectDicAll");
        console.log(res.data.obj);
        this.tableData = res.data.obj;
        for (let i=0; i<this.tableData.length; i++){
            this.tableData[i].lastEditorID=i;
        }
        //let res2 ={};
        //let id = String(this.tableData[0].dataDicID);
        //res2 = await this.$http.get("/datadicdetail/selectDicDetailAllById/"+id);
        //console.log(res2.data.obj);
        this.total=this.tableData.length;
        //this.subtable=res2.data.obj;
        //for(let i=0;i<this.subtable.length;i++)this.subtable[i].lastEditorID=i;
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
            const confirmResult = await this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
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
            console.log(index);
            this.edituser=this.tableData[index];
            this.editID=this.tableData[index].dataDicID;
            console.log(this.edituser);
            this.editDialogVisble=true;
            
        },
        async editTable(){
            this.$http.put("/dataDic/updateDic",this.edituser);
            this.editDialogVisble = false;
            let res = await this.$http.get("/dataDic/selectDicAll");
            console.log(res.data.obj);
            this.tableData = res.data.obj;
            // for (let i=0; i<this.tableData.length; i++){
            //     this.tableData[i].lastEditorID=i;
            // }
            location.reload();
        },
        async showSubtable(index){
            let res2 ={};
            this.editID = this.tableData[index].dataDicID;
            let id = String(this.tableData[index].dataDicID);
            res2 = await this.$http.get("/datadicdetail/selectDicDetailAllById/"+id);
            console.log(res2.data.obj);
            this.total=this.tableData.length;
            this.subtable=res2.data.obj;
            for(let i=0;i<this.subtable.length;i++)this.subtable[i].lastEditorID=i;
        },
        //打开修改子表表格
        ShoweditSub(index){
            this.subtableA=this.subtable[index];
            //console.log(this.subtable);
            this.editSubtable=true;
        },
        //保存修改子表
        SaveEditSub(){
            this.$http.post("/datadicdetail/updateDicDetail",this.subtableA)
            console.log(this.subtableA);
            this.editSubtable = false;
            location.reload();
        },
        async addTableClick(){
            this.$http.post("/dataDic/insertDic",this.addTable);
            console.log(this.addTable);
            this.addTableVisble = false;
            let res = await this.$http.get("/dataDic/selectDicAll");
            this.tableData = res.data.obj;
            location.reload();
        },
        //打开子表
        openNewSubDialog(){
            this.newsubTableVisble=true;
        },
        //保持新增子表
        saveNewSubtable(){
            this.newsubTableVisble=false;
            this.newsubTable.dataDicID=this.editID;
            console.log(this.editID);
            this.$http.post("/datadicdetail/insertDicDetail",this.newsubTable);
            location.reload();
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