<template>
    <div id="mainWrapper">
            <div id="tools-bar">
                <span class="title">档案著录</span>
                
                <el-button type="info" class="close-btn" icon="el-icon-error" ></el-button>
            </div>
            <div class="line"></div>
            <div id="mainContent">
                <div id="treeWrapper">
                    <ul id="templeteTree" class="ztree"></ul>
                </div>
                <div id="workSpace">
                    <div id="menu-bar">
                        <el-button-group>
                            <el-button type="primary" plain icon="el-icon-arrow-left">上一页</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">下一页</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">编辑</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">录入</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">检索</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">删除</el-button>
                            <el-button type="primary" plain icon="el-icon-arrow-left">原文显示</el-button>
                        </el-button-group>
                    </div>
                    <div id="tableContainer" style="width:100%;height:500px;background-color:red;">
                        <table id="list4" >
                        </table> 
                    </div>


                    
                </div>
            </div>
    </div>
                
</template>

<script>
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'
import '../../static/jqgrid/css/ui.jqgrid.css'
import '../../static/jqgrid/css/css/flick/jquery-ui-1.8.16.custom.css'
import '../../static/jqgrid/js/jquery.jqGrid.src.js'

export default {
    name:"Test",
    data () {
        return {
            znodeData: [
                    {"id":1, "pId":0, "name":"test1"},
                    {"id":11, "pId":1, "name":"test11"},
                    {"id":12, "pId":1, "name":"test12"},
                    {"id":111, "pId":11, "name":"test111"}
            ],
            setting:{
                view: {
                    showLine: false,
                    txtSelectedEnable: false,
                },
                data: {
                    simpleData: {
                        enable:true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: 0
                    }
                },
            },
            columns:[
                {width: 10, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
                {field: 'document', title:'原文', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true},
                {field: 'qz', title:'全宗', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'dh', title:'档号', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'lmh', title:'类目号', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'ajh', title:'案卷号', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'ajtm', title:'案卷题名', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'bgqx', title:'保管期限', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
                {field: 'bz', title:'备注', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true,isEdit:true},
            ],
            tableData:[
                {qz:"TYSDAG",dh:"TYSDAG-1·1-001",lmh:"1·1",ajh:"001",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-002",lmh:"1·1",ajh:"002",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-003",lmh:"1·1",ajh:"003",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-004",lmh:"1·1",ajh:"004",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-005",lmh:"1·1",ajh:"005",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-006",lmh:"1·1",ajh:"006",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-007",lmh:"1·1",ajh:"007",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-008",lmh:"1·1",ajh:"008",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-009",lmh:"1·1",ajh:"009",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-010",lmh:"1·1",ajh:"010",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-011",lmh:"1·1",ajh:"011",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-012",lmh:"1·1",ajh:"012",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-013",lmh:"1·1",ajh:"013",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-014",lmh:"1·1",ajh:"014",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-015",lmh:"1·1",ajh:"015",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-016",lmh:"1·1",ajh:"016",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-017",lmh:"1·1",ajh:"017",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-018",lmh:"1·1",ajh:"018",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-019",lmh:"1·1",ajh:"019",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-020",lmh:"1·1",ajh:"020",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-021",lmh:"1·1",ajh:"021",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-022",lmh:"1·1",ajh:"022",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
            ],
            jqGridOptions:{
				//url : '../../static/data/JSONData.json',//组件创建完成之后请求数据的url
				datatype : "local",//请求数据返回的类型。可选json,xml,txt
				colNames : [ '原文', '全宗号', '档号', '类目号', '案卷号','案卷题名',"保管期限",'备注' ],//jqGrid的列显示名字
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'wy',width : 20,align : "center",resizable:true}, 
				             {name : 'qzh',width : 30,align : "center",resizable:true}, 
				             {name : 'dh',width : 50,align : "center",resizable:true}, 
				             {name : 'lmh',width : 40,align : "center",resizable:true}, 
				             {name : 'ajh',width : 30,align : "center",resizable:true}, 
				             {name : 'ajtm',width : 150,align : "center",resizable:true}, 
                             {name : 'bgqx',width : 140,sortable : false,resizable:true} ,
                             {name : 'bz',width : 30,sortable : false,resizable:true} 
                           ],
                // autowidth:true,
                multiselect:true,
				rowNum : 10,//一页显示多少条
				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				viewrecords : true,
				caption : "JSON Example"//表格的标题名字
            },
            jqData:[ 
                {qz:"TYSDAG",dh:"TYSDAG-1·1-001",lmh:"1·1",ajh:"001",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-002",lmh:"1·1",ajh:"002",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-003",lmh:"1·1",ajh:"003",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-004",lmh:"1·1",ajh:"004",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-005",lmh:"1·1",ajh:"005",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-006",lmh:"1·1",ajh:"006",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-007",lmh:"1·1",ajh:"007",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-008",lmh:"1·1",ajh:"008",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-009",lmh:"1·1",ajh:"009",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-010",lmh:"1·1",ajh:"010",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-011",lmh:"1·1",ajh:"011",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-012",lmh:"1·1",ajh:"012",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-013",lmh:"1·1",ajh:"013",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-014",lmh:"1·1",ajh:"014",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-015",lmh:"1·1",ajh:"015",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-016",lmh:"1·1",ajh:"016",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-017",lmh:"1·1",ajh:"017",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-018",lmh:"1·1",ajh:"018",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-019",lmh:"1·1",ajh:"019",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-020",lmh:"1·1",ajh:"020",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-021",lmh:"1·1",ajh:"021",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-022",lmh:"1·1",ajh:"022",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-018",lmh:"1·1",ajh:"018",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-019",lmh:"1·1",ajh:"019",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-020",lmh:"1·1",ajh:"020",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-021",lmh:"1·1",ajh:"021",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-022",lmh:"1·1",ajh:"022",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-018",lmh:"1·1",ajh:"018",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-019",lmh:"1·1",ajh:"019",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-020",lmh:"1·1",ajh:"020",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-021",lmh:"1·1",ajh:"021",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-022",lmh:"1·1",ajh:"022",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-018",lmh:"1·1",ajh:"018",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-019",lmh:"1·1",ajh:"019",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-020",lmh:"1·1",ajh:"020",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-021",lmh:"1·1",ajh:"021",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
                {qz:"TYSDAG",dh:"TYSDAG-1·1-022",lmh:"1·1",ajh:"022",ajtm:"山西国新天然气利用有限公司审计报告及财务报表2017年度",bgqx:"10年",bz:""},
            ]
        }
    },
    created(){
        console.log('created');
    },
    mounted () {
        console.log("高度："+$("#tableContainer").height());
        console.log("宽度："+$("#tableContainer").width());
        $.fn.zTree.init($("#templeteTree"), this.setting, this.znodeData);
        $("#list4").jqGrid(this.jqGridOptions);
        //$("#list4").setGridHeight($("#tableContainer").height()-60);　　
        $("#list4").setGridWidth($("#tableContainer").width());　
        for ( var i = 0; i <= this.jqData.length; i++){
            $("#list4").jqGrid('addRowData', i + 1, this.jqData[i]);
        }
        $(window).resize(function(){　
            $("#list4").setGridHeight($("#tableContainer").height()-60);　　
            $("#list4").setGridWidth($("#tableContainer").width());
         });　　
    },
    methods: {

    }
}
</script>
<style scoped>
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
#mainContent{
    flex-grow: 1;
    width: 100%;
    height: auto;
    display:  flex;
    flex-direction: row;
}
#treeWrapper{
    width: 250px;
    border-right:darkgrey solid 1px;

}
#workSpace{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
#menu-bar{
    padding: 5px 10px;
    background-color:rgb(245, 247, 250);
}
#aj-table{
    background-color: lawngreen;
    height: 50%;
}
.jn-table{
    background-color: aqua;
    height: 50%;
}
</style>

