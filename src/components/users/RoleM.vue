<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图-->
        <el-card>
            <!-- 搜索 -->
            <el-row>
                <el-col :span="6"> 
                    <span>角色管理</span>
                </el-col>
            </el-row>
            <el-table :data="tableData  " border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色" prop="username"></el-table-column>
                <el-table-column label="角色id" prop="userID"></el-table-column>
                <el-table-column label="权限" prop="right"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="showEditDialog(scope.row.lastEditorID)"></el-button>
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
        <!-- 修改参数-->
        <el-dialog title="修改参数" :visible.sync="editDialogVisble" width="50%" >
            <el-form :model="edituser" :rules="edituserRules" ref="edituserRef" label-width="70px">
                <el-form-item label="用户管理">
                    <el-select v-model="edituser.userManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程管理">
                    <el-select v-model="edituser.courseManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色管理">
                    <el-select v-model="edituser.roleManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字典管理">
                    <el-select v-model="edituser.dicManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参数管理">
                    <el-select v-model="edituser.systemManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单管理">
                    <el-select v-model="edituser.manuManage">
                    <el-option label="是" value="true"></el-option>
                    <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加参数 -->
        <el-dialog title="添加参数" :visible.sync="addDialogVisble" width="50%" >
            <el-form :model="addTable" :rules="adduserRules" ref="adduserRules" label-width="70px">
                <el-form-item label="参数名" prop='chineseKey'>
                    <el-input v-model="addTable.chineseKey" ></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop='englishKey'>
                    <el-input v-model="addTable.englishKey"></el-input>
                </el-form-item>
                <el-form-item label="值" prop='value'>
                    <el-input v-model="addTable.value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="saveAddTable()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default({
    data()  {
        var validateKeyword = (rule, value, callback) => {
          for(let i=0;i<this.tableData.length;++i)  
            {
                if(value ==this.tableData[i].englishKey)
          callback(new Error('关键字重复'));
        }
          callback();
      };
      var validateKeyword2 = (rule, value, callback) => {
          for(let i=0;i<this.tableData.length;++i)  
            {
                if(value ==this.tableData[i].englishKey&&this.edituser.sysParameterID!=this.tableData[i].sysParameterID)
          callback(new Error('关键字重复'));
        }
          callback();
      };
        return{
            quertInof:{
                query:'',
                pagenum:1,
                pagesize:1
            },
            tableData: [],
            editTable:{},
            addTable:{},
            editT:{},
            total:0,
            editDialogVisble:false,
            addDialogVisble:false,
            edituser:{},
            
            edituserRules:{
                chineseKey:[{required:true,message:'请输入参数名',trigger:'blur'}],
                englishKey:[{required:true,message:'请输入参数英文名',trigger:'blur'},{ validator: validateKeyword2, trigger: 'blur' }],
                value:[{required:true,message:'请输入参数值',trigger:'blur'},{required: true,pattern: /^(0|[1-9][0-9]*)$/,message: '参数值为数字',trigger: 'blur'}]
            },
            adduserRules:{
                chineseKey:[{required:true,message:'请输入参数名',trigger:'blur'}],
                englishKey:[{required:true,message:'请输入参数英文名',trigger:'blur'},{ validator: validateKeyword, trigger: 'blur' }],
                value:[{required:true,message:'请输入参数值',trigger:'blur'},{required: true,pattern: /^(0|[1-9][0-9]*)$/,message: '参数值为数字',trigger: 'blur'}]
            }
        }
    },
    async created() {
        let res = await this.$http.get("/userright/selectAll");
        console.log(res.data.obj);
        this.tableData = res.data.obj;
        for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].lastEditorID=i;
            this.tableData[i].right="";
            if(this.tableData[i].userManage=="true")this.tableData[i].right =this.tableData[i].right+"用户管理"+" ";
            if(this.tableData[i].courseManage=="true")this.tableData[i].right =this.tableData[i].right+"课程管理"+" ";
            if(this.tableData[i].roleManage=="true")this.tableData[i].right =this.tableData[i].right+"角色管理"+" ";
            if(this.tableData[i].dicManage=="true")this.tableData[i].right =this.tableData[i].right+"字典管理"+" ";
            if(this.tableData[i].systemManage=="true")this.tableData[i].right =this.tableData[i].right+"参数管理"+" ";
            if(this.tableData[i].manuManage=="true")this.tableData[i].right =this.tableData[i].right+"菜单管理"+" ";
            }
        this.total = this.tableData.length;
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
        async removeUser(index){
            const confirmResult = await  this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if(confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
        }
        else{
            this.delp(index)
            return this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        },
        showEditDialog(index){
            var objString = JSON.stringify(this.tableData[index]);
            this.edituser=JSON.parse(objString);
            console.log(this.edituser);
            this.editDialogVisble=true;
            
        },
        saveEdit(){
            this.$refs.edituserRef.validate(async valid=>{
            if(!valid)return;
            var objString = JSON.stringify(this.edituser);
            this.editT=JSON.parse(objString);
            if(this.edituser.userManage=="true")this.editT.userManage=true;
            else this.editT.userManage=false;
            if(this.edituser.courseManage=="true")this.editT.courseManage=true;
            else this.editT.courseManage=false;
            if(this.edituser.roleManage=="true")this.editT.roleManage=true;
            else this.editT.roleManage=false;
            if(this.edituser.dicManage=="true")this.editT.dicManage=true;
            else this.editT.dicManage=false;
            if(this.edituser.systemManage=="true")this.editT.systemManage=true;
            else this.editT.systemManage=false;
            if(this.edituser.manuManage=="true")this.editT.manuManage=true;
            else this.editT.manuManage=false;
            this.$http.put("/userright/updateUserRight/user/"+this.editT.userID,this.editT);
            console.log(this.editT);
            this.editDialogVisble = false;
            location.reload();
            })

        },
        addEditDialog(){
            this.addDialogVisble=true;
        },
        saveAddTable(){
            this.$refs.adduserRules.validate(async valid=>{
            if(!valid)return;
             this.$http.post("/Sysparameter/insertSysParameter",this.addTable);
             console.log(this.addTable);
             this.addDialogVisble = false;
             location.reload();
             })
        },
        delp(index){
            let id = this.tableData[index].sysParameterID;
            this.$http.delete("/Sysparameter/deleteSysParameterById/"+id);
            location.reload();
        }
    }
})
</script>
<style lang="less" scoped>
    .adduser{
        position: absolute;
        right: 20px;
        top :-10px;
    }
</style>