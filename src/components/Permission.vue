<template>
    <div class="Permission">
        <div  id="rulePermission" style="border-right:1px darkgrey solid;padding:2px">
            <div>
                
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="ruleAddClick">添加角色</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="ruleUpdateClick">修改信息</el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="ruleDeleteClick">删除角色</el-button>
                </el-button-group><span style="float:right;font-size:20px;margin-right:20px">角色管理</span>
            </div>

            <v-table 
                
                style="width:100%"
                
                :is-horizontal-resize="true"
                :column-width-drag="true"
                :is-vertical-resize="true"
                odd-bg-color="#FCFCFC"
                even-bg-color="	#FDF5E6"
                :title-row-height="30"
                :row-height="25"
                title-bg-color="#87CEEB"
                row-hover-color="#1E90FF"
                row-click-color="#1E90FF"
                :columns="columnsTopRule"
                :table-data="tableDataRule"
                :select-change="selectChange"
                :row-click="rowClick"
                :select-all="selectAll"
                ></v-table>
        </div> 
        <div id="permissionContent" style="padding:2px" v-if="rowClickShow">
            
            <div id="information" style="">
                
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit" @click="infAddClick">添加信息</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="infUpdateClick">修改信息</el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="infDeleteClick">删除信息</el-button>
                </el-button-group><span style="float:right;font-size:20px;margin-right:20px">详细信息</span>
                <v-table 
                
                style="width:100%;"
                :height='400'
                :column-width-drag="true"
                odd-bg-color="#FCFCFC"
                even-bg-color="	#FDF5E6"
                :is-horizontal-resize="true"
                :title-row-height="30"
                :row-height="25"
                title-bg-color="#87CEEB"
                row-hover-color="#1E90FF"
                row-click-color="#1E90FF"
                :columns="columnsTopInformation"
                :table-data="tableDataInformation"
                :select-change="selectInfChange"
                :select-all="selectInfAll"
                ></v-table>
                
             
            </div>
            
            <div id="userPermission" style="padding:2px">
                
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit" @click="userAddClick">添加用户</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="userUpdateClick">修改密码</el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="userDeleteClick">删除用户</el-button>
                </el-button-group>  <span style="float:right;font-size:20px;margin-right:20px">用户信息</span> 
                <v-table 
                
                style="width:100%;"
                :is-vertical-resize="true"
                :vertical-resize-offset="20"
                :column-width-drag="true"
                odd-bg-color="#FCFCFC"
                even-bg-color="	#FDF5E6"
                :is-horizontal-resize="true"
                :title-row-height="30"
                :row-height="25"
                title-bg-color="#87CEEB"
                row-hover-color="#1E90FF"
                row-click-color="#1E90FF"
                :columns="columnsTopUser"
                :table-data="tableDataUser"
                :select-change="selectUserChange"
                :select-all="selectUserAll"
                ></v-table>
                
            </div>
        </div>
        <el-dialog  
            title="添加角色"
            :visible.sync="ruleDefine.addShow"
            width="40%">
            <el-form ref="form"  label-width="80px" >
                <el-form-item label="角色名称">
                    <el-input v-model="ruleDefine.ruleName"></el-input>
                </el-form-item>
                <el-form-item label="角色介绍">
                    <el-input v-model="ruleDefine.ruleDescription"></el-input>
                </el-form-item>
                
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="addRuleData">立即创建</el-button>
                    <el-button @click="ruleDefine.addShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog  
            title="修改信息"
            :visible.sync="ruleDefine.updateShow"
            width="40%"
            v-if="ruleDefine.updateShow">
            <el-form ref="form"  label-width="80px" >
                <el-form-item label="角色名称">
                    <el-input :value="ruleDefine.selectGroup[0].ruleName" id="updateName" ></el-input>
                </el-form-item>
                <el-form-item label="角色介绍">
                    <el-input :value="ruleDefine.selectGroup[0].ruleDescription" id="updateDescription" ></el-input>
                </el-form-item>
                
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="updateRuleData">立即修改</el-button>
                    <el-button @click="ruleDefine.updateShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog  
            title="添加信息"
            :visible.sync="informationDefine.addShow"
            width="35%">
                <el-form>
                    <el-form-item label="全宗选择" >
                        <el-select v-model="informationDefine.quanzong" placeholder="请选择全宗号"  >
                            <el-option :label="value.qzName" :value="value.treeId" v-for="value in informationDefine.quanzongList" :key="value.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="是否可写">
                         <el-switch v-model="informationDefine.writeable"></el-switch>
                    </el-form-item>
                    <el-form-item label="权限类型">
                        <el-select v-model="informationDefine.authorityType" placeholder="权限类型">
                            <el-option label="永久" :value="1"></el-option>
                            <el-option label="临时" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间" v-if="informationDefine.authorityType==2">
                        <el-col :span="8">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="informationDefine.startAt" style="width: 100%;"></el-date-picker>
                        </el-col>
                          
                    </el-form-item>
                    <el-form-item label="结束时间" v-if="informationDefine.authorityType==2">
                        <el-col :span="8">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="informationDefine.endAt" style="width: 100%;"></el-date-picker>
                        </el-col>
                         
                    </el-form-item> -->
                    <el-form-item style="text-align:center">
                        <el-button type="primary" @click="addInfData">立即添加</el-button>
                        <el-button @click="informationDefine.addShow=false">取消</el-button>
                    </el-form-item>
               
                </el-form>
     
        </el-dialog>
        <el-dialog  
            title="修改信息"
            :visible.sync="informationDefine.updateShow"
            width="35%">
                <el-form>
                    <el-form-item label="全宗选择" >
                        <el-select v-model="informationDefine.quanzong" placeholder="请选择全宗号"  >
                            <el-option :label="value.qzName" :value="value.treeId" v-for="value in informationDefine.quanzongList" :key="value.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="是否可写">
                         <el-switch v-model="informationDefine.writeable"></el-switch>
                    </el-form-item>
                    <el-form-item label="权限类型">
                        <el-select v-model="informationDefine.authorityType" placeholder="权限类型">
                            <el-option label="永久" :value="1"></el-option>
                            <el-option label="临时" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间" v-if="informationDefine.authorityType==2">
                        <el-col :span="8">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="informationDefine.startAt" style="width: 100%;"></el-date-picker>
                        </el-col>
                          
                    </el-form-item>
                    <el-form-item label="结束时间" v-if="informationDefine.authorityType==2">
                        <el-col :span="8">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="informationDefine.endAt" style="width: 100%;"></el-date-picker>
                        </el-col>
                         
                    </el-form-item> -->
                    <el-form-item style="text-align:center">
                        <el-button type="primary" @click="updateInfData">立即修改</el-button>
                        <el-button @click="informationDefine.updateShow=false">取消</el-button>
                    </el-form-item>
               
                </el-form>
     
        </el-dialog>
        <el-dialog  
            title="增加用户"
            :visible.sync="userDefine.addShow"
            width="35%">
            <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名称">
                    <el-input v-model="userDefine.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" >
                    <el-input type="password" v-model="userDefine.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" >
                    <el-input type="password" v-model="userDefine.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="addUserData">提交</el-button>
                    <el-button @click="userDefine.addShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog  
            title="修改密码"
            :visible.sync="userDefine.updateShow"
            width="35%">
            <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass" >
                    <el-input type="password" :value="userDefine.passwordGroup.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" >
                    <el-input type="password" :value="userDefine.passwordGroup.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="updateUserData">提交</el-button>
                    <el-button @click="userDefine.updateShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name:"Permission",
    data(){
        return{
            operation(status,text){
                var self=this;  
                self.$message({
                    type: status,
                    message: text
                })    
            },
            
            rowClickShow:false,
            ruleDefine:{
                addShow:false,
                deleteShow:false,
                updateShow:false,
                ruleName:'',
                ruleDescription:'',
                selectGroup:[],
            },
            informationDefine:{
                addShow:false,
                deleteShow:false,
                updateShow:false,
                quanzong:'',
                writeable:true,
                authorityType:1,
                startAt:'',
                endAt:'',
                ruleId:0,
                selectGroup:[],
                quanzongList:[],
            },
            userDefine:{
                updateShow:false,
                addShow:false,
                username:'',
                password:'',
                checkPass:'',
                ruleId:0,
                selectGroup:[],
                passwordGroup:{
                    password:'',
                    checkPass:'',
                },
            },
            columnsTopRule:[
                {width: 50, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                {field: 'ruleName', title:'角色名', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true},
                {field: 'ruleDescription', title:'介绍', width: 200, titleAlign: 'center',columnAlign:'center',isResize:true,},
            ],
            columnsTopInformation:[
                {width: 50, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                {field: 'quanzongChina', title:'全宗', width: 200, titleAlign: 'center',columnAlign:'center',isResize:true},
                // {field: 'writeableChina', title:'是否可写', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true},
                // {field: 'authorityTypeChina', title:'权限类型', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true,},
                // {field: 'startAtChina', title:'开始时间', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true,},
                // {field: 'endAtChina', title:'结束时间', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true,},
            ],
            columnsTopUser:[
                {width: 50, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                {field: 'username', title:'用户名', width: 200, titleAlign: 'center',columnAlign:'center'},
                
            ],
            tableDataRule:[
       
            ],
            tableDataInformation:[],
            tableDataUser:[],
        }
    },
    created(){
        
    },
    mounted(){
        this.$axios.post(
            '/api/api/permission/rule/select',
            {

            }
        
        ).then(
            (res)=>{
                console.log(res)
                this.tableDataRule=res.data.rules;
                //this.rowClickShow=true;
                
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
    },
    methods:{
        
        selectChange(selection,rowData){
            console.log('select-change',selection,rowData);
            this.ruleDefine.selectGroup=selection;        
        },
        selectAll(selection){
            this.ruleDefine.selectGroup=selection;
        },
        selectInfChange(selection,rowData){
            console.log('select-change',selection,rowData);
            this.informationDefine.selectGroup=selection;        
        },
        selectInfAll(selection){
            this.informationDefine.selectGroup=selection;
        },
        selectUserChange(selection,rowData){
            this.userDefine.selectGroup=selection;
        },
        selectUserAll(selection){
            this.userDefine.selectGroup=selection;
        },
        rowClick(rowIndex,rowData,column){
            
            this.informationDefine.ruleId=rowData.id;
            this.userDefine.ruleId=rowData.id;
            this.$axios.post(
                '/api/api/permission/qzAuthority/select',
                {
                    ruleId:this.informationDefine.ruleId,

                }
            ).then(
                (res)=>{
                    console.log(res)
                    this.$axios.get(
                        '/api/api/templetTree/qz/select'
                    ).then(
                        (res1)=>{               
                            this.informationDefine.quanzongList=res1.data.qzs; 
                            this.tableDataInformation=res.data.ruleAuthorities;
                            for(var i=0;i<this.tableDataInformation.length;i++){
                                for(var j=0;j<this.informationDefine.quanzongList.length;j++){    
                                    if(this.informationDefine.quanzongList[j].treeId==this.tableDataInformation[i].templetTreeId){
                                        this.tableDataInformation[i].quanzongChina=this.informationDefine.quanzongList[j].qzName;
                                    }
                                }
                                // if(this.tableDataInformation[i].writeable==1){
                                //     this.tableDataInformation[i].writeableChina='可写';
                                // }else{
                                //     this.tableDataInformation[i].writeableChina='不可写';
                                // }
                                // if(this.tableDataInformation[i].authorityType==1){
                                //     this.tableDataInformation[i].authorityTypeChina='永久';
                                // }else{
                                //     this.tableDataInformation[i].authorityTypeChina='临时';
                                // }
                                // if(this.tableDataInformation[i].startAt!=0){
                                //     this.tableDataInformation[i].startAtChina=this.getShowDate(this.tableDataInformation[i].startAt);
                                //     if(this.tableDataInformation[i].endAt!=0){
                                //         this.tableDataInformation[i].endAtChina=this.getShowDate(this.tableDataInformation[i].endAt);
                                //     }
                                // }else if(this.tableDataInformation[i].endAt!=0){
                                //     this.tableDataInformation[i].endAtChina=this.getShowDate(this.tableDataInformation[i].endAt);
                                //     if(this.tableDataInformation[i].startAt!=0){
                                //         this.tableDataInformation[i].startAtChina=this.getShowDate(this.tableDataInformation[i].startAt);
                                //     }
                                // }
                            }
                            this.$axios.post(
                                '/api/api/permission/user/selectAll',
                                {
                                    ruleId:this.userDefine.ruleId,
                                }
                            ).then(
                                (res2)=>{
                                    console.log(res2)
                                    this.tableDataUser=res2.data.users
                                }
                            ).catch(
                                (err2)=>{
                                    console.log(err2)
                                }
                            )      
                        })
                        .catch(function(err1){
                            console.log(err1)
                        })
         
                }
                
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
            
            this.rowClickShow=true;
            
        },
        getShowDate(data){
            let datetime = new Date(data);
            let year = datetime.getFullYear();
            let month = datetime.getMonth();
            let date = datetime.getDate();
            let hour = datetime.getHours();
            let minute = datetime.getMinutes();
            let second = datetime.getSeconds();
            let result = year + 
                        '-' + 
                        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                        '-' + 
                        ((date + 1) < 10 ? '0' + date : date) + 
                        ' ' + 
                        ((hour + 1) < 10 ? '0' + hour : hour) +
                        ':' + 
                        ((minute + 1) < 10 ? '0' + minute : minute) + 
                        ':' + 
                        ((second + 1) < 10 ? '0' + second : second);
            return result;
        },
        ruleAddClick(){
            this.ruleDefine.addShow=true;
        },
        addRuleData(){
            if((this.ruleDefine.ruleName=='')||(this.ruleDefine.ruleDescription=='')){
                this.operation('error','数据不能为空');
            }else{
                this.$axios.post(
                    '/api/api/permission/rule/add',
                    {
                        ruleName:this.ruleDefine.ruleName,
                        ruleDescription:this.ruleDefine.ruleDescription
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        this.tableDataRule.push(
                            {
                                ruleName:this.ruleDefine.ruleName,
                                ruleDescription:this.ruleDefine.ruleDescription,
                                id:res.data.id
                            }
                        )
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
            }
            
            
        },
        
        ruleUpdateClick(){
            if(this.ruleDefine.selectGroup.length==0){
                this.operation('error','请选择一条数据');
            }else if(this.ruleDefine.selectGroup.length>1){
                this.operation('error','请不要选择多条数据');
            }else{
                this.ruleDefine.updateShow=true;
            }
        },
        updateRuleData(){
            var name = document.getElementById("updateName");
            var description = document.getElementById("updateDescription");
            if((this.ruleDefine.ruleName=='')||(this.ruleDefine.ruleDescription=='')){
                this.operation('error','数据不能为空');
            }else{
                this.$axios.post(
                    '/api/api/permission/rule/update',
                    {
                        rule:{
                            ruleName:name.value,
                            ruleDescription:description.value,
                            id:this.ruleDefine.selectGroup[0].id
                            
                        }
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        if(res.data.updated!=0){
                            
                            for(var i=0;i<this.tableDataRule.length;i++){
                                if(this.ruleDefine.selectGroup[0].id==this.tableDataRule[i].id){
                                    this.tableDataRule[i].ruleName=name.value;
                                    this.tableDataRule[i].ruleDescription=description.value;
                                }
                            }
                            this.operation('success','成功更新'+res.data.updated+'条');
                            this.ruleDefine.updateShow=false;
                        }else{
                            this.operation('error','更新失败')
                        }

                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
            }
            
        },
        ruleDeleteClick(){
            if(this.ruleDefine.selectGroup.length==0){
                this.operation('error','请选择一条数据');
            }else{
                let ids=[];
                for(var i=0;i<this.ruleDefine.selectGroup.length;i++){
                    ids.push(this.ruleDefine.selectGroup[i].id)
                }
                console.log(this.ruleDefine.selectGroup)
                console.log(ids)
                
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    this.$axios.post(
                        '/api/api/permission/rule/delete',
                        {
                            ids:ids
                        }
                    ).then(
                        (res)=>{
                            for(var j=0;j<this.tableDataRule.length;j++){
                                for(var k=0;k<this.ruleDefine.selectGroup.length;k++){
                                    if(this.ruleDefine.selectGroup[k].id==this.tableDataRule[j].id){
                                        this.tableDataRule.splice(j,1);
                                        continue;
                                    }
                                }
                            }
                            this.operation('success','成功删除'+res.data.deleted+'条');
                            console.log(res)
                            
                        }
                    ).catch(
                        (err)=>{
                            console.log(err)
                        }
                    )
                }).catch(
                    () => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
            }
            
        },
        infAddClick(){
            this.informationDefine.quanzong='',
            // this.informationDefine.writeable=true,
            // this.informationDefine.authorityType=1,
            // this.informationDefine.startAt='',
            // this.informationDefine.endAt='',
            this.informationDefine.addShow=true;
        },
        addInfData(){
            console.log(this.informationDefine)
            // if((this.informationDefine.startAt=='')&&(this.informationDefine.endAt!='')){
            //     this.operation('error','请选择开始日期')
            // }else if((this.informationDefine.startAt!='')&&(this.informationDefine.endAt=='')){
            //     this.operation('error','请选择结束日期')
            // }else if((this.informationDefine.startAt=='')&&(this.informationDefine.endAt=='')){
                // if(this.informationDefine.authorityType==2){
                //     this.operation('error','请填写日期')
                // }else{
                    if(this.informationDefine.quanzong==''){
                        this.operation('error','全宗数据不能为空');
                    }else{
                        this.$axios.post(
                        '/api/api/permission/qzAuthority/add',
                            {
                                ruleId:this.informationDefine.ruleId,
                                treeId:this.informationDefine.quanzong,
                                // writeable:this.informationDefine.writeable?1:0,
                                // authorityType:this.informationDefine.authorityType,
                                // startAt:0,
                                // endAt:0,

                            }
                        ).then(
                            (res)=>{
                                console.log(res)
                                // var writeableChina='';
                                // var authorityTypeChina='';
                                var quanzongChina='';
                                // if(this.informationDefine.writeable==true){
                                //     this.informationDefine.writeable==1
                                //     var writeableChina='可写';
                                // }else{
                                //     this.informationDefine.writeable==0
                                //     var writeableChina='不可写';
                                // }
                                // if(this.informationDefine.authorityType==1){
                                //     var authorityTypeChina='永久'
                                // }else if(this.informationDefine.authorityType==2){
                                //     var authorityTypeChina='临时'
                                // }
                                for(var i=0;i<this.informationDefine.quanzongList.length;i++){
                                    if(this.informationDefine.quanzongList[i].treeId==this.informationDefine.quanzong){
                                        console.log('00')
                                        var quanzongChina=this.informationDefine.quanzongList[i].qzName
                                        console.log(quanzongChina);
                                    }
                                }
                                console.log(quanzongChina)
                                this.tableDataInformation.push(
                                    {
                                        id:res.data.id,
                                        ruleId:this.informationDefine.ruleId,
                                        templetTreeId:this.informationDefine.quanzong,
                                        quanzongChina:quanzongChina,
                                        // authorityType:this.informationDefine.authorityType,
                                        // authorityTypeChina:authorityTypeChina,
                                        // writeable:this.informationDefine.writeable,
                                        // writeableChina:writeableChina,
                                        // startAt:0,
                                        // startAtChina:'',
                                        // endAt:0,
                                        // endAtChina:'',

                                    }
                                )
                                this.operation('success','成功添加');
                            }
                        ).catch(
                            (err)=>{
                                console.log(err)
                            }
                        )
                    }
                    
                //}
                
            // }else{
            //     if(this.informationDefine.startAt.getTime()>this.informationDefine.endAt.getTime()){
            //         this.operation('error','日期不标准')
            //     }else{
                    
            //         this.$axios.post(
            //             '/api/api/permission/qzAuthority/add',
            //             {
            //                 ruleId:this.informationDefine.ruleId,
            //                 treeId:this.informationDefine.quanzong,
            //                 writeable:this.informationDefine.writeable?1:0,
            //                 authorityType:this.informationDefine.authorityType,
            //                 startAt:this.informationDefine.startAt.getTime(),
            //                 endAt:this.informationDefine.endAt.getTime(),

            //             }
            //         ).then(
            //             (res)=>{
            //                 console.log(res)
            //                 var writeableChina='';
            //                 var authorityTypeChina='';
            //                 var quanzongChina='';
            //                 if(this.informationDefine.writeable==true){
            //                     this.informationDefine.writeable==1
            //                     var writeableChina='可写';
            //                 }else{
            //                     this.informationDefine.writeable==0
            //                     var writeableChina='不可写';
            //                 }
            //                 if(this.informationDefine.authorityType==1){
            //                     var authorityTypeChina='永久'
            //                 }else if(this.informationDefine.authorityType==2){
            //                     var authorityTypeChina='临时'
            //                 }
            //                 for(var i=0;i<this.informationDefine.quanzongList.length;i++){
            //                     if(this.informationDefine.quanzongList[i].treeId==this.informationDefine.quanzong){
            //                         console.log('00')
            //                         var quanzongChina=this.informationDefine.quanzongList[i].qzName
            //                         console.log(quanzongChina);
            //                     }
            //                 }
            //                 console.log(quanzongChina)
            //                 this.tableDataInformation.push(
            //                     {
            //                         id:res.data.id,
            //                         ruleId:this.informationDefine.ruleId,
            //                         templetTreeId:this.informationDefine.quanzong,
            //                         quanzongChina:quanzongChina,
            //                         authorityType:this.informationDefine.authorityType,
            //                         authorityTypeChina:authorityTypeChina,
            //                         writeable:this.informationDefine.writeable,
            //                         writeableChina:writeableChina,
            //                         startAt:this.informationDefine.startAt.getTime(),
            //                         startAtChina:this.getShowDate(this.informationDefine.startAt.getTime()),
            //                         endAt:this.informationDefine.endAt.getTime(),
            //                         endAtChina:this.getShowDate(this.informationDefine.endAt.getTime()),

            //                     }
            //                 )
            //                 this.operation('success','成功添加');
            //             }
            //         ).catch(
            //             (err)=>{
            //                 console.log(err)
            //             }
            //         )
            //     }           
                
            // }
            
            
        },
        infUpdateClick(){
            if(this.informationDefine.selectGroup.length==0){
                this.operation('error','请选择一条数据');
            }else if(this.informationDefine.selectGroup.length>1){
                this.operation('error','请不要选择多条数据');
            }else{
                this.informationDefine.quanzong='',
                // this.informationDefine.writeable=true,
                // this.informationDefine.authorityType=1,
                // this.informationDefine.startAt='',
                // this.informationDefine.endAt='',
                this.informationDefine.updateShow=true;
            }
            
        },
        updateInfData(){
            // if((this.informationDefine.startAt=='')&&(this.informationDefine.endAt!='')){
            //     this.operation('error','请选择开始日期')
            // }else if((this.informationDefine.startAt!='')&&(this.informationDefine.endAt=='')){
            //     this.operation('error','请选择结束日期')
            // }else if((this.informationDefine.startAt=='')&&(this.informationDefine.endAt=='')){
            //     var arr={
            //                 id:this.informationDefine.selectGroup[0].id,
            //                 ruleId:this.informationDefine.selectGroup[0].ruleId,
            //                 templetTreeId:this.informationDefine.quanzong,
            //                 writeable:this.informationDefine.writeable?1:0,
            //                 authorityType:this.informationDefine.authorityType,
            //                 startAt:0,
            //                 endAt:0,

            //             }
            //     if(this.informationDefine.authorityType==2){
            //         this.operation('error','请填写日期')
            //     }else{
            //         if(this.informationDefine.quanzong==''){
            //             this.operation('error','全宗数据不能为空');
            //         }else{
            //             this.$axios.post(
            //             '/api/api/permission/qzAuthority/update',
            //                 {
            //                     ruleAuthority:arr

            //                 }
            //             ).then(
            //                 (res)=>{
            //                     console.log(res)
            //                     var writeableChina='';
            //                     var authorityTypeChina='';
            //                     var quanzongChina='';
            //                     if(this.informationDefine.writeable==true){
            //                         this.informationDefine.writeable==1
            //                         var writeableChina='可写';
            //                     }else{
            //                         this.informationDefine.writeable==0
            //                         var writeableChina='不可写';
            //                     }
            //                     if(this.informationDefine.authorityType==1){
            //                         var authorityTypeChina='永久'
            //                     }else if(this.informationDefine.authorityType==2){
            //                         var authorityTypeChina='临时'
            //                     }
            //                     for(var i=0;i<this.informationDefine.quanzongList.length;i++){
            //                         if(this.informationDefine.quanzongList[i].treeId==this.informationDefine.quanzong){
            //                             var quanzongChina=this.informationDefine.quanzongList[i].qzName    
            //                         }
            //                     }
            //                     for(var i=0;i<this.tableDataInformation.length;i++){
            //                         console.log('000')
            //                         console.log(quanzongChina)
            //                         if(this.informationDefine.selectGroup[0].id==this.tableDataInformation[i].id){
            //                             console.log('111')
            //                             this.tableDataInformation.splice(i,1,{
            //                                 id:this.informationDefine.selectGroup[0].id,
            //                                 ruleId:this.informationDefine.ruleId,
            //                                 templetTreeId:this.informationDefine.quanzong,
            //                                 quanzongChina:quanzongChina,
            //                                 authorityType:this.informationDefine.authorityType,
            //                                 authorityTypeChina:authorityTypeChina,
            //                                 writeable:this.informationDefine.writeable,
            //                                 writeableChina:writeableChina,
            //                                 startAt:0,
            //                                 startAtChina:'',
            //                                 endAt:0,
            //                                 endAtChina:'',
            //                             });
                                        
            //                         }
            //                     }
                                
            //                     this.operation('success','成功修改');
            //                     this.informationDefine.updateShow=false;
            //                     this.informationDefine.selectGroup=[];
            //                 }
            //             ).catch(
            //                 (err)=>{
            //                     console.log(err)
            //                 }
            //             )
            //         }
                    
            //     }
                
            // }else{
                var arr={
                            id:this.informationDefine.selectGroup[0].id,
                            ruleId:this.informationDefine.selectGroup[0].ruleId,
                            templetTreeId:this.informationDefine.quanzong,
                            // writeable:this.informationDefine.writeable?1:0,
                            // authorityType:this.informationDefine.authorityType,
                            // startAt:this.informationDefine.startAt.getTime(),
                            // endAt:this.informationDefine.endAt.getTime(),

                        }
                // if(this.informationDefine.startAt.getTime()>this.informationDefine.endAt.getTime()){
                //     this.operation('error','日期不标准')
                // }else{
                    if(this.informationDefine.quanzong==''){
                        this.operation('error','全宗数据不能为空');
                    }else{
                        this.$axios.post(
                            '/api/api/permission/qzAuthority/update',
                            {
                                ruleAuthority:arr
                            }
                        ).then(
                            (res)=>{
                                console.log(res)
                                // var writeableChina='';
                                // var authorityTypeChina='';
                                var quanzongChina='';
                                // if(this.informationDefine.writeable==true){
                                //     this.informationDefine.writeable==1
                                //     var writeableChina='可写';
                                // }else{
                                //     this.informationDefine.writeable==0
                                //     var writeableChina='不可写';
                                // }
                                // if(this.informationDefine.authorityType==1){
                                //     var authorityTypeChina='永久'
                                // }else if(this.informationDefine.authorityType==2){
                                //     var authorityTypeChina='临时'
                                // }
                                for(var i=0;i<this.informationDefine.quanzongList.length;i++){
                                    if(this.informationDefine.quanzongList[i].treeId==this.informationDefine.quanzong){
                                        var quanzongChina=this.informationDefine.quanzongList[i].qzName
                                    }
                                }
                                for(var i=0;i<this.tableDataInformation.length;i++){
                                    if(this.informationDefine.selectGroup[0].id==this.tableDataInformation[i].id){
                                        this.tableDataInformation.splice(i,1,{
                                            id:this.informationDefine.selectGroup[0].id,
                                            ruleId:this.informationDefine.ruleId,
                                            templetTreeId:this.informationDefine.quanzong,
                                            quanzongChina:quanzongChina,
                                            // authorityType:this.informationDefine.authorityType,
                                            // authorityTypeChina:authorityTypeChina,
                                            // writeable:this.informationDefine.writeable,
                                            // writeableChina:writeableChina,
                                            // startAt:0,
                                            // startAtChina:this.getShowDate(this.informationDefine.startAt.getTime()),
                                            // endAt:0,
                                            // endAtChina:this.getShowDate(this.informationDefine.endAt.getTime()),
                                        });
                                    }
                                }
                                this.operation('success','成功修改');
                                this.informationDefine.updateShow=false;
                                this.informationDefine.selectGroup=[];
                            }
                        ).catch(
                            (err)=>{
                                console.log(err)
                            }
                        )
                    }
                    
                    
                //}           
                
            //}
        },
        infDeleteClick(){
            var ruleAuthorityIds=[];
            for(var i = 0;i<this.informationDefine.selectGroup.length;i++){
                ruleAuthorityIds.push(this.informationDefine.selectGroup[i].id)
            }
            if(this.informationDefine.selectGroup==[]){
                this.operation('error','请选择至少一条数据')
            }else{
                this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    this.$axios.post(
                '/api/api/permission/qzAuthority/delete',
                    {
                        ruleAuthorityIds:ruleAuthorityIds
                        
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        for(var i=0;i<this.tableDataInformation.length;i++){
                            for(var j=0;j<ruleAuthorityIds.length;j++){
                                if(this.tableDataInformation[i].id==ruleAuthorityIds[j]){
                                    this.tableDataInformation.splice(i,1);
                                }
                            }   
                        }
                        this.operation('success','成功删除')

                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
                }).catch(
                    () => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    }
                );
            }      
            this.informationDefine.selectGroup==[];
        },
        userAddClick(){
            this.userDefine.username='';
            this.userDefine.password='';
            this.userDefine.checkPass='';
            this.userDefine.addShow=true
        },
        addUserData(){
            if(this.userDefine.username==''){
                this.operation('error','用户名不能为空');
            }else{
                if(this.userDefine.password.length<8){
                    this.operation('error','密码长度最少8位，请重新输入')
                }else{
                    if(this.userDefine.password!=this.userDefine.checkPass){
                        this.operation('error','两次密码不一致，请重新输入')     
                    }else{
                        this.$axios.post(
                            '/api/api/permission/user/add',
                            {
                                user:this.userDefine
                            }
                        ).then(
                            (res)=>{
                                console.log(res)
                                if(res.data.success!=1){
                                    this.operation('error',res.data.msg);
                                }else{
                                    this.tableDataUser.push(
                                        {
                                            id:res.data.id,
                                            ruleId:this.userDefine.ruleId,
                                            username:this.userDefine.username,
                                            password:this.userDefine.password,
                                        }
                                    )
                                    this.operation('success',"添加成功");
                                    this.userDefine.addShow=false;
                                }
                            }
                        ).catch(
                            (err)=>{
                                console.log(err)
                            }
                        )
                    }
                }
            }
            
            
        },
        userUpdateClick(){
            if(this.userDefine.selectGroup.length!=1){
                this.operation('error','请选择一条数据');
            }else{
                this.userDefine.passwordGroup.password='';
                this.userDefine.passwordGroup.checkPass='';
                this.userDefine.updateShow=true;
            }
            
        },
        updateUserData(){
            if(this.userDefine.password.length<8){
                this.operation('error','密码长度最少8位，请重新输入')
            }else{
                if(this.userDefine.password!=this.userDefine.checkPass){
                    this.operation('error','两次密码不一致，重新输入')
                    
                }else{
                    this.$axios.post(
                        '/api/api/permission/user/update',
                        {
                            id:this.userDefine.selectGroup[0].id,
                            password:this.userDefine.passwordGroup.password
                        }
                    ).then(
                        (res)=>{
                            console.log(res)
                            if(res.data.updated==1){
                            this.operation('success','修改成功') 
                            this.userDefine.updateShow=false;
                            }
                        }
                    ).catch(
                        (err)=>{
                            console.log(err)
                        }
                    )
                }
            }
            
            
        },
        userDeleteClick(){
            var ids=[];
            for(var i = 0;i<this.userDefine.selectGroup.length;i++){
                ids.push(this.userDefine.selectGroup[i].id)
            }
            if(this.userDefine.selectGroup==[]){
                this.operation('error','请选择至少一条数据')
            }else{
                this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    this.$axios.post(
                '/api/api/permission/user/delete',
                    {
                        ids:ids
                        
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        for(var i=0;i<this.tableDataUser.length;i++){
                            for(var j=0;j<ids.length;j++){
                                if(this.tableDataUser[i].id==ids[j]){
                                    this.tableDataUser.splice(i,1);
                                }
                            }   
                        }
                        this.operation('success','成功删除')

                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
                }).catch(
                    () => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    }
                );
            }      
            this.userDefine.selectGroup==[];
        },
    },
    
}
</script>

<style scoped>
.Permission{
    width: 100%;
    height: 100%;
    display: flex;
    overflow:auto;
    
}
.Permission div{
    /* overflow:auto; */
    
}
#rulePermission{
    width: 30%;
    height: 100%;
    
}
#permissionContent{
    height: 100%;
    width: 70%;
    
}
#information{
    height: 50%;
    width: 100%;
}
#userPermission{
     height: 50%;
    width: 100%;
}
.input-group-item label{
    width: 60px;
}

</style>


