<template>
     <div id="mainWrapper">
        <div id="tools-bar">
            <span class="title">系统设置</span>
            
            <el-button type="info" class="close-btn" @click="backDeskClick" icon="el-icon-back" ></el-button>
        </div>
        <div class="line"></div>
        <!-- 内容 -->
        <div class="foot">
            <div class="left">
            <ul class="left-list">
                
                <li><el-button type="primary" style="width:200px" class="btn" @click="handleClick(1)" v-show="userType==1">全宗定义</el-button></li>
                <li><el-button type="primary" style="width:200px" class="btn" @click="handleClick(2)" v-show="userType==1">权限管理</el-button></li>
                <li><el-button type="primary" style="width:200px" class="btn" @click="handleClick(3)" v-show="userType==2">权限管理</el-button></li>
                
            </ul>
            
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{ 
        name:"System",
        data(){
            return{
                userType:1 
            }
        },
        created(){
            //this.userType=JSON.parse(window.sessionStorage.getItem("archives_token")).userType;
        },
        methods:{
            handleClick(val){
                switch (val) {
                    case 1:this.$router.push({path:"/systemManage/quanZong"});break;
                    case 2:this.$router.push({path:"/systemManage/permission"});break;
                    case 3:this.$router.push({path:"/systemManage/OrdinaryPermission"});break;    
                        
                
                    default:
                        break;
                }
            },
            backDeskClick(){
                this.$router.push({path:"/"});
            }
        }
    }
    
</script>

<style scoped>
.btn{
    margin: 0px auto;
    display:block;
}
 .foot{
    flex: 1;
    display: flex;
    flex-direction: row;
}
.left{
    width: 220px;
    border-right: 1px  darkgrey solid;
}
.content{
    flex: 1;
    
}
.left-list{
    width: 220px;
   
}
.left-list li{
    list-style: none;
    margin: 5px;

} 
#tools-bar{
    padding:5px 30px;
    
}
#mainWrapper{
    flex-grow: 1;
    height: 100%;;
    display: flex;
    flex-direction: column;
    
}
.line{
    height: 1px;
    background-color: darkgrey;
}
.close-btn{
    float: right;
}
.title{
    font-size: 25px;

}
#tool-bar el-button-group{
    margin-left: 50px;
}
</style>