<template>
    <div>
        <!-- 面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图-->
        <el-card>
            <!-- 搜索 -->
            <el-row>
                <el-col :span="6"> 
                    <span>用户管理</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="adduser" type="primary" @click="addEditDialog()">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData  " border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="realName"></el-table-column>
                <el-table-column label="角色" prop="userType"></el-table-column>
                <el-table-column label="电话" prop="phoneNumber"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="showEditDialog(scope.row.lastEditorID)"></el-button>
                        </el-tooltip>
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
                <el-form-item label="姓名" prop='realName'>
                    <el-input v-model="edituser.realName" ></el-input>
                </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="edituser.userType" placeholder="角色">
                    <el-option label="学生" value="学生"></el-option>
                    <el-option label="教师" value="教师"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="电话" prop='phoneNumber'>
                    <el-input v-model="edituser.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop='password'>
                    <el-input v-model="edituser.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加参数 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisble" width="50%" >
                <el-form :model="addTable" :rules="adduserRules" ref="adduserRules" label-width="70px">
                <el-form-item label="姓名" prop='realName'>
                    <el-input v-model="addTable.realName" ></el-input>
                </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="addTable.userType" placeholder="学生">
                    <el-option label="学生" value="学生"></el-option>
                    <el-option label="教师" value="教师"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="电话" prop='phoneNumber'>
                    <el-input v-model="addTable.phoneNumber" type="data"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop='password'>
                    <el-input v-model="addTable.password" type="password"></el-input>
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
         var validatephonenumber = (rule, value, callback) => {
          for(let i=0;i<this.tableData.length;++i)  
            {
                if(value ==this.tableData[i].phoneNumber)
          callback(new Error('此号码已注册'));
        }
          callback();
      };
       var validateKeyword2 = (rule, value, callback) => {
          for(let i=0;i<this.tableData.length;++i)  
            {
                if(value ==this.tableData[i].phoneNumber&&this.edituser.userID!=this.tableData[i].userID)
          callback(new Error('此号码已注册'));
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
            total:0,
            editDialogVisble:false,
            addDialogVisble:false,
            edituser:{},
            
            edituserRules:{
                realName:[{required:true,message:'请输入姓名',trigger:'blur'}],
                phoneNumber:[{ required: true, message: '请输入手机号11位', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }, 
                {required: true,pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码',trigger: 'blur'},
                { validator: validateKeyword2, trigger: 'blur' }
                ]
            },
            adduserRules:{
                realName:[{required:true,message:'请输入姓名',trigger:'blur'}],
                phoneNumber:[{ required: true, message: '请输入手机号11位', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }, 
                {required: true,pattern: /^1[3456789]\d{9}$/,message: '请输入正确的手机号码',trigger: 'blur'},
                { validator: validatephonenumber, trigger: 'blur' }],
                password:[{ required: true, message: '请输入密码', trigger: 'blur' },{ min: +6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }]
            }
        }
    },
    async created() {
        let res = await this.$http.get("/user/selectAll");
        console.log(res.data.obj);
        this.tableData = res.data.obj;
        for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].lastEditorID=i;
            if(this.tableData[i].userType==1)this.tableData[i].userType="学生";
            else if(this.tableData[i].userType==2)this.tableData[i].userType="教师";
            else if(this.tableData[i].userType==3)this.tableData[i].userType="管理员";
            else this.tableData[i].userType ="学生";
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
            if(this.edituser.userType=="学生")this.edituser.userType=1;
            else if(this.edituser.userType=="教师")this.edituser.userType=2;
            else if(this.edituser.userType=="管理员")this.edituser.userType=3;
            else this.edituser.userType=1;
            if(this.edituser.password!=null)this.edituser.password=this.$md5(this.edituser.password);
            this.$http.post("/user/updateUserInfo",this.edituser);
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
            if(this.addTable.userType=="学生")this.addTable.userType=1;
            else if(this.addTable.userType=="教师")this.addTable.userType=2;
            else if(this.addTable.userType=="管理员")this.addTable.userType=3;
            else this.addTable.userType=1;
            this.addTable.password=this.$md5(this.addTable.password);
             this.$http.put("/user/insert",this.addTable);
             console.log(this.addTable);
             this.addDialogVisble = false;
             location.reload();
             })
        },
        delp(index){
            let id = this.tableData[index].phoneNumber;
            this.$http.delete("/user/delete/"+id);
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