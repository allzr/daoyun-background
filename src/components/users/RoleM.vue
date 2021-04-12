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
            <el-row :gutter="20">
                <el-col :span="6"> 
                    <el-input placeholder="搜索">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button class="adduser" type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData  " border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色" prop="name"></el-table-column>
                <el-table-column label="权限" prop="Roles"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-tooltip  effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size ='mini' @click="showEditDialog(scope.row.id)"></el-button>
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
        <el-dialog title="修改用户" :visible.sync="editDialogVisble" width="50%" >
            <el-form :model="edituser" :rules="edituserRules" ref="edituserRef" label-width="70px">
                <el-form-item label="角色">
                    <el-input v-model="edituser.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="权限">
                <el-checkbox  el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="edituser.Roles" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
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
const cityOptions = ['用户管理 ', '课程管理 ', '参数管理 ', '菜单管理'];
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
          name: 'admin',
          tel: '123456',
          Roles: ['用户管理 ', '课程管理 ']
        }, {
          id:1,
          date: '2',
          name: 'admin1',
          tel: '123456',
          Roles: ['用户管理 ', '课程管理 ']
        }, {
          id:2,
          date: '3',
          name: 'admin2',
          tel: '123456',
          Roles: ['用户管理 ', '课程管理 ']
        }, {
          id:3,
          date: '4',
          name: 'admin3',
          tel: '123456',
          Roles: ['用户管理 ', '课程管理 ']
        }],
            total:0,
            editDialogVisble:false,
            edituser:{},
            edituserRules:{
                tel:[{required:true,message:'请输入课程号',trigger:'blur'},
                {min: 6, max: 6, message: '请输入6位课程号', trigger: 'blur'}
                ]
            },
            checkAll: false,
            checkedCities: ['上海', '广州'],
            cities: cityOptions,
            isIndeterminate: true
        }
    },
    created() {
        this.total=this.tableData.length;
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
            const confirmResult = await  this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
        handleCheckAllChange(val) {
        this.edituser.Roles = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
})
</script>
<style lang="less" scoped>
    .adduser{
        position: absolute;
        right: 20px;
    }
</style>