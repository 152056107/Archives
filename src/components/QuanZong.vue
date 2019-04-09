<template>

    <div class="main">
        <div class="top">
            全宗号：<input type="text" v-model="quanZong.qzNumber" >
            单位名称：<input type="text" v-model="quanZong.qzName" >
            <el-button   class="btn" @click="addClick" v-show="showBtn" :disabled="disabled">添加</el-button>
            <el-button   class="btn" @click="updataClick" v-show="!showBtn" :disabled="updisabled">修改</el-button>
            <el-button   class="btn" @click="updata"  :disabled="savedisabled">保存</el-button>
            <el-button   class="btn" @click="deleteClick"  :disabled="deletedisabled">删除</el-button>
            <span class='todoInf todoSucc'  v-if='toDo'>操作成功</span>
            <span class='todoInf todoErr' v-if='todoErr' :err='err'>操作失败:{{err}}</span>

        </div>
        <div class="list">

             <v-table
                style="width:100%"
                :columns="columns"
                :table-data="tableData"
                :show-vertical-border="true"
                :is-horizontal-resize="true"
                :is-vertical-resize="true"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                :select-change="selectChange"
                title-bg-color="#87CEEB"
                odd-bg-color="#FCFCFC"
                even-bg-color="	#FDF5E6"
            
             ></v-table>

        </div>
        
    </div>    
</template>

<script>
export default {
    name:'QuanZong',
    data(){
        return{
            toDo:false,
            todoErr:false,
            err:'',
            disabled:"disabled",
            updisabled:"disabled",
            savedisabled:"disabled",
            deletedisabled:'disabled',
            showBtn:true,
            
            quanZong:{
                    id:'',
                    qzName:'',
                    qzNumber:'',

            },
            selectGrop:[

            ],
            tableData: [
                // {id: 4, qzName: "三晋兰台01", qzNumber: "01", treeId: "a33f9dce86e8407abbf86e38b1491895"},
                // {id: 5, qzName: "太原工业学院02", qzNumber: "02", treeId: "657c9dee80464f2daa928cc079a355af"}       
            ],
            columns: [
                {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                {field: 'qzNumber', title:'全宗号', width: 100, titleAlign: 'center',columnAlign:'center',isResize:'true'},
                {field: 'qzName', title: '单位名称', width: 260, titleAlign: 'center',columnAlign:'center',isResize:'true'}, 
            ]
        }
    },
    created(){
        var self=this;
        this.$axios.get(
            '/api/api/templetTree/qz/select'
        ).then(function(res){
          console.log(res);
          self.tableData=res.data.qzs;
        })
        .catch(function(err){
          console.log(err)
        })
    },
    watch:{
        quanZong:{
            handler(newQuanZong,oldQuanZong){
            console.log(newQuanZong);
            if(newQuanZong.qzName.length>0){
                this.disabled=false;
                this.updisabled=false;
                
                // this.deletedisabled=false;
                
            }else{
                this.disabled="disabled";
                this.updisabled="disabled";
                // this.deletedisabled="disabled";
            }
            },
            deep:true
            
        }
    },

    methods:{
        
        addClick(){
            var self=this;        
            this.$axios.post(
                '/api/api/templetTree/qz/add',
                {
                    qzName:this.quanZong.qzName, 
                    qzNumber:this.quanZong.qzNumber
                }
            ).then(function(res){
                console.log(res);
                self.$axios.get(
                    '/api/api/templetTree/qz/select'
                ).then(function(res){
                    console.log(res);
                    self.tableData=res.data.qzs;
                })
                .catch(function(err){
                    console.log(err)
                })
                self.quanZong.qzName='';
                self.quanZong.qzNumber='';

            }).catch(function(err){
                console.log(err);
            })
            
            
            
        },
        deleteData(index){
            let self = this;
            this.$axios.post(
                '/api/api/templetTree/qz/delete',
                {"qzId":self.selectGrop[index++].id}
            ).then(function(res){
                console.log(res);
                if(res.data.success==1){
                    if(index < self.selectGrop.length){
                        self.deleteData(index);
                    }else{
                        self.$axios.get(
                            '/api/api/templetTree/qz/select'
                        ).then(function(res1){
                            console.log(res1);
                            self.tableData=res1.data.qzs;
                            self.quanZong.qzName='';
                            self.quanZong.qzNumber='';
                            self.deletedisabled='disabled';
                            self.showBtn=true;
                        })
                        .catch(function(err){
                            console.log(err)
                        })
                    }
                }else{
                    console.log(res);
                }
                    
            }).catch(function(err){
                    console.log(err)
            })
               
        },
        deleteClick(){
            this.deleteData(0);
            // var self=this;
            // var b=0;
            // for(var a=0;a<self.selectGrop.length;a++){
            //     this.$axios.post(
            //     '/api/api/templetTree/qz/delete',
            //     {"qzId":this.selectGrop[a].id}
            // ).then(function(res){
            //         console.log(res);
                    
            //         if(res.data.success==1){
                        
            //         }     
            // }).catch(function(err){
            //         console.log(err)
            // })   
            // }
            
            // if(b==self.selectGrop.length){
            //     self.$axios.get(
            //         '/api/api/templetTree/qz/select'
            //     ).then(function(res){
            //         console.log(res);
            //         self.tableData=res.data.qzs;
            //         self.quanZong.qzName='';
            //         self.quanZong.qzNumber='';
            //         self.deletedisabled='disabled';
            //         self.showBtn=true;
                    
            //     })
            //     .catch(function(err){
            //         console.log(err)
            //     })
            // }
            
                
                
            
            // while(i<this.selectGrop.length){

            // }
            // self.$axios.post(
            //     '/api/api/templetTree/qz/delete',
            //     {"qzId":this.quanZong.id}
            //     ).then(function(res){
            //         console.log(res);
            //     self.$axios.get(
            //         '/api/api/templetTree/qz/select'
            //     ).then(function(res){
            //         console.log(res);
            //         self.tableData=res.data.qzs;
            //     })
            //     .catch(function(err){
            //         console.log(err)
            //     })
            //     self.quanZong.qzName='';
            //     self.quanZong.qzNumber='';
            //     }).catch(function(err){
            //         console.log(err);
            //     })
            //     this.isShow=!this.isShow;
            //     this.deletedisabled='disabled';
            //     this.showBtn=true;
        },
        updataClick(){
            var num='';
            for(var i=0;i<this.tableData.length;i++){
                if(this.tableData[i].id==this.quanZong.id){
                    this.tableData[i].qzName=this.quanZong.qzName;
                    this.tableData[i].qzNumber=this.quanZong.qzNumber;
            }
            }
            this.isShow=!this.isShow;
            this.savedisabled=false;
            this.deletedisabled='disabled';
            
        },

        updata(){
            var self=this;
            this.$axios.post(
                '/api/api/templetTree/qz/update',
                {qzId:self.quanZong.id,qzNumber:self.quanZong.qzNumber,qzName:self.quanZong.qzName}
                ).then(function(res){
                    console.log(res);
                    self.$axios.get(
                    '/api/api/templetTree/qz/select'
                ).then(function(res){
                    console.log(res);
                    self.tableData=res.data.qzs;
                })
                .catch(function(err){
                    console.log(err)
                })
                self.quanZong.qzName='';
                self.quanZong.qzNumber='';

                }).catch(function(err){
                    console.log(err);
                })
            this.isShow=!this.isShow;
            this.savedisabled='disabled';
            this.showBtn=true;
        },
        selectChange(selection,rowData){
            console.log('select-change',selection,rowData);
            this.selectGrop=selection;
            if(selection.length==1){
                console.log(selection[0].qzName);
                this.quanZong.qzName=selection[0].qzName;
                this.quanZong.qzNumber=selection[0].qzNumber;
                this.showBtn=false;
                this.quanZong.id=selection[0].id;
                this.deletedisabled=false;
            }else if(selection.length==0){
                this.deletedisabled='disabled';
                this.quanZong.qzName='';
                this.quanZong.qzNumber='';
                this.showBtn=true;            }
            else{
                this.quanZong.qzName='';
                this.quanZong.qzNumber='';
                this.showBtn=true;
                this.updisabled='disabled';
            }

        },
    }
}
</script>

<style scoped>
    .todoInf{
        margin-left:100px;
        
        
    }
    .todoSucc{
        color: rgb(11, 197, 11);
    }
    .todoErr{
        color:firebrick;
    }
    .main{
       
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .top{
        padding-top: 10px;
        padding-left: 10px;
        height: 50px;
        border-bottom: 1px darkgrey solid;

    }
    .list{
        
        flex-grow: 1;
    }
    .btn{
        
        margin-left: 10px;
        
    }
</style>


