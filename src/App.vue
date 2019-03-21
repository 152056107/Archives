<template>
  <div id="app">
    <div id="top">
        <top></top>
    </div>

    <div id="main">
        <left></left>
 
          <router-view/>

    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import Left from './components/Left'
import Content from './components/Content'

export default {
  data(){
    return{
      token:{}
    }
  },
  created(){
    this.token=JSON.parse(window.sessionStorage.getItem('archives_token'))
    console.log("页面初始化token",this.token)
  },
  mounted(){
    //console.log(window.sessionStorage.getItem('111',archives_token))
    //console.log(window.sessionStorage.getItem('222',username))
    //var token=JSON.parse(window.sessionStorage.getItem('archives_token'))
    this.$axios.post('/api/api/permission/OrdinaryAuthority/selectByUserId',{
      userId:this.token.userId
    }).then((res)=>{
      console.log(res)
      window.sessionStorage.setItem('writeable',JSON.stringify(res.data.ruleAuthorities)) 
    }).catch((err)=>{
      console.log(err)
    })
  },
  components: {
    top:Top,
    left:Left,
    mainContent:Content,
  },
  name: 'App'
}
</script>

<style scoped>
#app{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction:column;
  
}
#top{
  height: 60px;
}
#main{
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
