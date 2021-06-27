<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图-->
        <el-card>
            <!-- 搜索 -->
            <el-row>
                <el-col :span="6"> 
                    <span>课程管理</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="adduser" type="primary" @click="addEditDialog()">添加课程</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData  " border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="班课号" prop="classID"></el-table-column>
                <el-table-column label="班课" prop="cName"></el-table-column>
                <el-table-column label="学校" prop="uName"></el-table-column>
                <el-table-column label="班课" prop="ccName"></el-table-column>
                <el-table-column label="教师" prop="teacherName"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size='mini' @click="removeUser(scope.row.lastEditorID)"></el-button>
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
                <el-form-item label="参数名" prop='chineseKey'>
                    <el-input v-model="edituser.chineseKey" ></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop='englishKey'>
                    <el-input v-model="edituser.englishKey"></el-input>
                </el-form-item>
                <el-form-item label="值" prop='value'>
                    <el-input v-model="edituser.value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加参数 -->
        <el-dialog title="添加班课" :visible.sync="addDialogVisble" width="50%" >
            <el-form :model="addTable" :rules="adduserRules" ref="adduserRules" label-width="70px">
                <el-form-item label="班课" prop='cName'>
                    <el-input v-model="addTable.cName" ></el-input>
                </el-form-item>
                <el-form-item label="学校" prop='uName'>
                    <el-input v-model="addTable.uName"></el-input>
                </el-form-item>
                <el-form-item label="学院" prop='ccName'>
                    <el-input v-model="addTable.ccName"></el-input>
                </el-form-item>
                <el-form-item label="教师" prop='teacherName'>
                    <el-input v-model="addTable.teacherName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop='phoneNumber'>
                    <el-input v-model="addTable.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="开学年份" prop='openYear'>
                    <el-input v-model="addTable.openYear"></el-input>
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
        return{
            quertInof:{
                query:'',
                pagenum:1,
                pagesize:1
            },
            tableData: [],
            editTable:{},
            addTable:{},
            addT:{
                course:{},
                openYear:""
            },
            total:0,
            phoneNumber:"",
            editDialogVisble:false,
            addDialogVisble:false,
            edituser:{},
            
            edituserRules:{
                chineseKey:[{required:true,message:'请输入参数名',trigger:'blur'}],
                englishKey:[{required:true,message:'请输入参数英文名',trigger:'blur'}],
                value:[{required:true,message:'请输入参数值',trigger:'blur'},{required: true,pattern: /^(0|[1-9][0-9]*)$/,message: '参数值为数字',trigger: 'blur'}]
            },
            adduserRules:{
                cName:[{required:true,message:'请输入班课名',trigger:'blur'}],
                uName:[{required:true,message:'请输入学校名',trigger:'blur'}],
                ccName:[{required:true,message:'请输入学院名',trigger:'blur'}],
                teacherName:[{required:true,message:'请输入教师名字',trigger:'blur'}],
                phoneNumber:[{required:true,message:'请输入教师手机号',trigger:'blur'}],
                openYear:[{required:true,message:'请输入教师手机号',trigger:'blur'}],
            }
        }
    },
    async created() {
        let res = await this.$http.get("/teachercourse/selectAll");
        console.log(res.data.obj);
        this.tableData = res.data.obj;
        for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].lastEditorID=i;
            let md=this.tableData[i].className.split("-");
            this.tableData[i].cName=md[0];
            this.tableData[i].uName=md[1];
            this.tableData[i].ccName=md[2];
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
            this.$http.post("/Sysparameter/updateSysParameterByKey",this.edituser);
            console.log(this.edituser);
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
            this.addTable.name=this.addTable.cName+"-"+this.addTable.uName+"-"+this.addTable.ccName;
            this.phoneNumber=this.addTable.phoneNumber;
            this.addT.course=this.addTable;
            this.addT.openYear=this.addTable.openYear;
             this.$http.post("/course/insert/"+this.phoneNumber,this.addT);
             console.log(this.addT);
             this.addDialogVisble = false;
             location.reload();
             })
        },
        delp(index){
            let id = this.tableData[index].id;
            this.$http.delete("/teachercourse/delete/"+id);
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