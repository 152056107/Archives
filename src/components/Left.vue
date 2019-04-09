<template>
        <div class="left-menu">
            <ul class="ul-function">
                <li class="li-template" :class="{'choose':currentMenu == 0}" @click="changeMenu(0)"><img v-if="currentMenu == 0" src="../assets/3_hover.jpg" alt="" title="档案模板" class="menu-pic"><img v-if="currentMenu != 0" src="../assets/3.jpg" alt="" title="档案模板" class="menu-pic"></li>
                <li class="li-library " :class="{'choose':currentMenu == 1}" @click="changeMenu(1)"><img v-if="currentMenu == 1" src="../assets/1_hover.jpg" title="档案著录" alt="" class="menu-pic"><img v-if="currentMenu != 1" src="../assets/1.jpg" title="档案库" alt="" class="menu-pic"></li>
                <li v-show="userType==1||userType==2" class="li-record " :class="{'choose':currentMenu == 2}" @click="changeMenu(2)"><img v-if="currentMenu == 2" src="../assets/2_hover.jpg" title="系统设置" alt="" class="menu-pic"><img v-if="currentMenu != 2" src="../assets/2.jpg" title="档案库" alt="" class="menu-pic"></li>
                
            </ul>
            <div :class="{'hide':!treeShow,'show':treeShow}" @click="hideTree" >

            </div>
        </div>
    

</template>

<script>
    export default{
        name:"Left",
        data () {
            return {
                currentMenu:-1,
                treeShow:true,
                userType:1,
                token:{
                    toke:"7ceace472ce046909271fd0c90da2800"
                }
            }
        },
        computed: {

        },
        created(){

            // this.token=JSON.parse(window.sessionStorage.getItem('archives_token'))
            if(this.token==null){
                alert("您没有权限,请重新登陆");
                window.location.href = "http://192.168.1.131:8080/archives/index.html"
            }else{
                
                //this.userType=this.token.userType;
            }
            
        },
        methods: {
            changeMenu(index){
                this.currentMenu = index;
                //切换路由
                if(index == 0){
                    this.$router.push({path:"/templetManage"})
                }
                if(index == 1){
                    this.$router.push({path:"/archivesManage"})
                }
                if(index == 2){
                    this.$router.push({path:"/systemManage"});
                }
                
            },
            hideTree(){
                console.log(1);
                this.treeShow = !this.treeShow;

                //隐藏树节点
            }

        }
    }
</script>

<style scoped>
/* #left-menu{
    width: 60px;
    height: 100%;;
    background: #044599;

} */
*{
    margin: 0;
    padding: 0;
}
.ul-function{
    list-style: none;
    float: right;
    margin-top: 50px;
    

}
.ul-function li{
    margin-top: 20px;
    cursor: pointer;
    width: 60px;
    height: 50px;
    text-align: center;
    
}
li img{
  margin-top: 10px;
}
.left-menu{
    width: 60px;
    background-color: #044599;
    height: 100%;
        filter: opacity(0.7)
}
.choose{
    background-color: white;
   
}
.show{
    width: 55px;
    height: 59px;
    position: absolute;
    bottom: 0;
    text-align: center;
    cursor: pointer;
    background-image: url('../assets/nav_hide.png');
    background-repeat: no-repeat;
    background-position: center;
}
.hide{
    width: 55px;
    height: 59px;
    position: absolute;
    bottom: 0;
    text-align: center;
    cursor: pointer;
    background-image: url('../assets/nav_show.png');
    background-repeat: no-repeat;
    background-position: center;
}  
</style>
