<template>
    <div class="nav-contain">
        <div class="wrapper">
            <div class="logo">
                <div class="logo-pic" >
                    <img src="static/imgs/logo.png" alt="" srcset=""  height="100%" >
                </div>
            </div>
            <div class="top-right">
                <ul class="ul-right">
                    <li class="li-username">
                        <div class="username"><img src="../assets/user.jpg"> <span>&nbsp;&nbsp;</span> <span id="username">{{username}}</span></div>
                    </li>
                    <li class="li-date">
                        <div class="date"><img src="../assets/month.jpg" alt=""><span>&nbsp;&nbsp;</span><span id="date">{{date}}</span></div>
                    </li>
                    <li class="li-time">
                        <div class="time"><img src="../assets/date.jpg" alt=""><span>&nbsp;&nbsp;</span><span id="time">{{time}}</span></div>
                    </li>
                </ul>
                <div class="exit" title="注销">
                    <img src="../assets/close.jpg" @click="logout" alt="">
                </div>
            </div>

        </div>


    </div>
</template>

<script>

    export default{
        name:'Header',
        data () {
            return {
                time:"",
                username:"",
                date:"",
                token:{
                    userId:17,
                    token:"7ceace472ce046909271fd0c90da2800"
                },
            }
        },
        created () { 
            //this.token=JSON.parse(window.sessionStorage.getItem('archives_token'))
            window.setInterval(()=>{
                var myDate = new Date();
                this.date = '  ' + myDate.toLocaleDateString();
                // var myDate = new Date();
                let hour = myDate.getHours();
                let minute = myDate.getMinutes();
                let second = myDate.getSeconds() + 1;
                if (hour.toString().length <= 1) {
                    hour = '0' + hour;
                }
                if (minute.toString().length <= 1) {
                    minute = '0' + minute;
                }
                if (second.toString().length <= 1) {
                    second = '0' + second;
                }
                this.time = '      ' + hour + ':' + minute + ':' + second;

            },200);
            
            // var username=window.sessionStorage.getItem("username");
            // console.log(username)

        },
        mounted(){
            this.$axios.post('/api/api/permission/user/selectRuleByUserId',{
                userId:this.token.userId
            }).then((res)=>{
                console.log("111",res)
                this.username=res.data.rule.ruleName;
            }).catch((err)=>{
                console.log(err)
            })
        },
        methods: {
            logout(){
                if (confirm("是否确定注销？")) {
                    //window.sessionStorage.removeItem("archives_token");
                    window.location.href = "http://192.168.1.131/archives/login.html";
                    return;
                }
                else {
                    return;
                }
            }   
        }
    }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}

li{
    list-style: none;
    float: left;
    margin-left: 20px;
}
li img{
    vertical-align: text-top;
}

.nav-contain{
    position: relative;
    min-width: 900px;
    height: 60px;
    background-color: #303030;
    filter: opacity(0.8);
    display: block;
    
}
.wrapper{
    margin: 0 auto;
}
.logo{
    position: absolute;
    top: 0;
    left: 15px;
    width: 300px;
    height: 60px;

}
.logo-pic{
    position: absolute;
    text-align: center;
    width: 300px;
    height: 60px;
    line-height: 60px;
    color: white;
    cursor: pointer;

}
.ul-right{
    margin: 0 auto;
    position: relative;
    line-height: 65px;
    width: 600px;
    height: 65px;
    float: right;
    color: #adadad;
}
.exit{
    width: 80px;
    position: absolute;
    right: 30px;
    top: 15px;
    border-left: 1px solid #171717;
    vertical-align: text-top;
    cursor: pointer;

}

</style>
