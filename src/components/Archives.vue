<template>
    <div id="mainWrapper">
            <div id="tools-bar">
                <span class="title">档案著录</span>
                
                <el-button type="info" class="close-btn" icon="el-icon-back" @click="backDeskClick"></el-button>
            </div>
            <div class="line"></div>
            <div id="mainContent">
                <div id="treeWrapper" >
                    <div style="position:fixed" >
                        <el-button-group >
                            <el-button type="primary" @click="showAddTreeNodeDialog" icon="el-icon-plus">增加节点</el-button>
                            <el-button type="primary" @click="deleteTreeNode" icon="el-icon-delete">删除节点</el-button>
                            <el-button type="primary" icon="el-icon-sort" >结构复制</el-button>
                        </el-button-group>
                        <ul id="templeteTree" class="ztree" style="margin-top:1px"></ul>
                    </div>
                    
                </div>
                <div id="workSpace" v-if="showMenuOne" >
                    <div id="menu-bar">
                        <el-button-group >
                            <el-button type="primary" plain icon="el-icon-plus" @click="archives.addRowDialogVisiable = true" v-if="writeable==1">录入</el-button>
                            <el-button type="primary" plain icon="el-icon-edit" @click="updateData" v-if="writeable==1">修改</el-button>
                            <el-button type="primary" plain icon="el-icon-search" @click="selectClick" v-if="false">检索</el-button>
                            <el-button type="primary" plain icon="el-icon-upload2" @click="uploadClick" v-if="writeable==1">数据导入</el-button>
                            <el-button type="primary" plain icon="el-icon-download" @click="downloadClick">数据导出</el-button>
                            <!-- <el-button type="primary" plain icon="el-icon-sort" @click="mountClick" v-if="writeable==1">挂接</el-button> -->
                            <el-button type="primary" plain icon="el-icon-delete" @click="deleteRowData" v-if="writeable==1">删除</el-button>
                            <el-button type="primary" plain icon="el-icon-search" @click="archives.conditionDialogVisiable = true">筛选</el-button>
                            <el-button type="primary" plain icon="el-icon-edit-outline" @click="archives.conditionUpdateDialogVisiable = true" v-if="writeable==1">批量修改</el-button>
                            <el-button type="primary" plain icon="el-icon-upload" @click="bigMount" v-if="writeable==1">批量挂接</el-button>
                            <!-- <el-dropdown @command="handleCommand">
                            <el-button type="primary" plain>
                                一键生成<i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command='QZH'>一键生成全宗号</el-dropdown-item>
                                <el-dropdown-item command='DH'>一键生成档号</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown> -->
                            <!-- <el-button type="primary" plain icon="el-icon-error" @click="removeFilePath" v-if="writeable==1">删除原文</el-button> -->
                            <el-button type="primary" plain icon="el-icon-refresh" @click="refresh">刷新</el-button>
                            <!-- <el-button type="primary" plain icon="el-icon-view" :disabled='canShowPdf' @click="showPdf">原文显示</el-button> -->
                            <el-select v-model="value2" placeholder="查看原文">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-button-group>
                    </div>
                    <v-table
                            style="width:100%;"
                            :multiple-sort="true"
                            :is-vertical-resize="true"
                            :column-width-drag="true"
                            odd-bg-color="#FCFCFC"
                            even-bg-color="	#FDF5E6"
                            :is-horizontal-resize="true"
                            :vertical-resize-offset="20"
                            :title-row-height="30"
                            :row-height="20"
                            :row-click="rowWjClick"
                            title-bg-color="#87CEEB"
                            row-hover-color="#1E90FF"
                            row-click-color="#1E90FF"
                            :columns="columnsAnJuan"
                            :table-data="tableDataOne"
                            :select-change="selectChange"
                            :select-all="selectAll"
                            


                        ></v-table>
                        <div style="height:20px">
                            <span>共{{footerStatus.Wj.total}}行，选中{{footerStatus.Wj.selectCount}}行，当前选中第{{footerStatus.Wj.ClickCount}}行</span>
                        </div>                 
                </div>
                <div id="workSpace" v-if="showMenuTwo">
                    <div id="menu-bar">
                        <el-button-group >
                            <el-button type="primary" plain icon="el-icon-plus" @click="archives.addRowDialogVisiable = true" v-if="writeable==1">录入</el-button>
                            <el-button type="primary" plain icon="el-icon-edit" @click="updateData" v-if="writeable==1">修改</el-button>
                            <el-button type="primary" plain icon="el-icon-search" @click="selectClick" v-if="false">检索</el-button>
                            <el-button type="primary" plain icon="el-icon-upload2" @click="uploadClick" v-if="writeable==1">数据导入</el-button>
                            <el-button type="primary" plain icon="el-icon-download" @click="downloadClick">数据导出</el-button>
                            <!-- <el-button type="primary" plain icon="el-icon-sort" @click="mountClick" v-if="writeable==1">挂接</el-button> -->
                            <el-button type="primary" plain icon="el-icon-delete" @click="deleteRowData" v-if="writeable==1">删除</el-button>
                            <el-button type="primary" plain icon="el-icon-search" @click="archives.conditionDialogVisiable = true">筛选</el-button>
                            <el-button type="primary" plain icon="el-icon-edit-outline" @click="archives.conditionUpdateDialogVisiable = true" v-if="writeable==1">批量修改</el-button>
                            <el-button type="primary" plain icon="el-icon-refresh" @click="refresh">刷新</el-button>
                            <!-- <el-dropdown @command="handleCommand"  >
                            <el-button type="primary" plain > 一键生成<i class="el-icon-arrow-down"></i></el-button>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command='QZH'>一键生成全宗号</el-dropdown-item>
                                <el-dropdown-item command='DH'>一键生成档号</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown> -->
                            <!-- <el-button type="primary" plain icon="el-icon-view" :disabled='canShowPdf' @click="showPdf">原文显示</el-button> -->
                            <el-select v-model="value2" placeholder="查看原文">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-button-group>

                    </div>
                    <v-table
                            style="width:100%;"
                            :height='400'
                            :multiple-sort="true"
                            :column-width-drag="true"
                            odd-bg-color="#FCFCFC"
                            even-bg-color="	#FDF5E6"
                            :is-horizontal-resize="true"
                            :title-row-height="30"
                            :row-height="20"
                            title-bg-color="#87CEEB"
                            row-hover-color="#1E90FF"
                            row-click-color="#1E90FF"
                            :columns="columnsAnJuan"
                            :table-data="tableDataOne"
                            :select-change="selectChange"
                            :select-all="selectAll"
                            :row-click="rowClick"

                        ></v-table>
                         <v-table
                            style="width:100%;"
                            :multiple-sort="true"
                            :is-vertical-resize="true"
                            :vertical-resize-offset="20"
                            :column-width-drag="true"
                            odd-bg-color="#FCFCFC"
                            even-bg-color="	#FDF5E6"
                            :is-horizontal-resize="true"
                            :title-row-height="30"
                            :row-height="20"
                            title-bg-color="#87CEEB"
                            row-hover-color="#1E90FF"
                            row-click-color="#1E90FF"
                            :columns="columnsAnJian"
                            :table-data="tableDataTwo"
                            :row-click="rowWjClick"

                        ></v-table>  
                        <div>
                            <div style="height:20px;" >
                                <span style="width:50%;float:left" >当前案卷共{{footerStatus.Wj.total}}行，选中{{footerStatus.Wj.selectCount}}行，当前选中第{{footerStatus.Aj.ClickCount}}行</span>
                            
                            
                                <span style="width:50%;float:left">选中案卷卷内文件共{{footerStatus.Aj.total}}行，当前选中第{{footerStatus.Wj.ClickCount}}行</span>
                            </div>
                        </div>
                        
                </div>
            </div>
        <!-- 录入 -->
        <el-dialog  
            title="档案录入"
            :visible.sync="archives.addRowDialogVisiable"
            width="40%">
            <div  class="input-group">
                <div v-for="(column,index) in columnsAnJuan" :key="column.field" class="input-group-item" v-if="index>0&&column.title!='文件数量'" >
                    <label :for="column.field">{{column.title}}</label> <input type="text" :name="column.field" class="input-item-add" id=""/>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commitRowData(1)">继续录入</el-button>
                <el-button @click="archives.addRowDialogVisiable = false">取 消</el-button>
                <el-button type="primary" @click="commitRowData(0)">保存并关闭</el-button>
            </span>
        </el-dialog>
        <!-- 条目修改 -->
        <el-dialog title="条目修改" 
            :visible.sync="archives.updateRowDialogVisiable" width="40%" :before-close="handleCloseUpdate" v-if='updateShow'>
            <div  class="input-group">
                <div v-for="(column,index) in columnsAnJuan" :key="column.field" class="input-group-item" v-if="index>0&&column.title!='文件数量'">
                    <label :for="column.field">{{column.title}}</label> <input :value="archives.aj.selectedGroup[0][column.field]" type="text" :name="column.field" class="input-item-update" id=""/>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="unupdateData">取 消</el-button>
                <el-button type="primary" @click="updateRowData">修改</el-button>
            </span>
        </el-dialog>
        <!-- 数据导入 -->
        <el-dialog title="数据导入" :visible.sync="archives.aj.importDataDialogVisiable" width="40%" v-if="showUpload">
            <div>
                <div>
                    <input type="file" @change="upload" />
                </div>
                <div >
                    <v-table 
                        v-loading="loading"
                        style="width:100%;"
                        :height="400"
                        :column-width-drag="true"
                        :is-vertical-resize="true"
                        odd-bg-color="#FCFCFC"
                        even-bg-color="	#FDF5E6"
                        :is-horizontal-resize="true"
                        :title-row-height="30"
                        :row-height="20"
                        title-bg-color="#87CEEB"
                        row-hover-color="#1E90FF"
                        row-click-color="#1E90FF"
                        :columns="columnsUpload"
                        :table-data="tableDataUpload"
                        
                    ></v-table>
                </div>
                
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="unupload">取 消</el-button>
                <el-button type="primary" @click="uploadData">导入</el-button>
            </span>
        </el-dialog>
        <!-- 挂接 -->
        <el-dialog title="电子文件挂接" :visible.sync="archives.aj.mountDataDialogVisiable" :before-close="mountHandleClose" width="40%">
            <div>
                <el-upload
                    class="upload-demo"
                    action="/api/api/archives/data/fileUpload"
                    :on-preview="handlePreview"
                    :on-success="handleSuccess"
                    :on-error="handleErr"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :data="mountData"
                    :file-list="fileList"
                    multiple
                    :accept="fileTyepAccept"
                    :on-exceed="handleExceed"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div style="margin-top:10px" slot="tip" class="el-upload__tip">每张不超过2G，总共不超过10G</div>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="unmount">取 消</el-button>
                
            </span>
        </el-dialog>
        <!-- 增加子节点 -->
        <el-dialog  
            title="添加子节点"
            :visible.sync="addTreeNodeDialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-input v-model="childeProps.nodeName" placeholder="请输入节点名称"></el-input>
            <h3>节点类型</h3><br/>
                <el-radio v-model="childeProps.nodeType" label="6">分类节点</el-radio>
                <el-radio  v-model="childeProps.nodeType" label="5">档案库节点</el-radio>  
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTreeNodeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addChildNode">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 档案检索 -->
        <el-dialog  
            title="档案检索"
            :visible.sync="archives.selectShow"
            width="70%"
            v-if="showSelect">
            <div>
                <div style="margin-top: 15px;margin-bottom: 30px; width:100%; text-align:center">
                    <el-input placeholder="请输入内容"  class="input-with-select" style="width:50%">
                        <el-select v-model="archives.select" slot="prepend" placeholder="请选择" style="width:105px">
                            <el-option label="本库检索" value="1"></el-option>
                            <el-option label="跨库检索" value="2"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="selectData(archives.select)"></el-button>
                    </el-input>
                </div>
                <div style="margin-top:10px" v-if="archives.selectDataShow">
                    <v-table 
                        v-loading="loading"
                        style="width:100%;"
                        :height="400"
                        :column-width-drag="true"
                        :is-vertical-resize="true"
                        odd-bg-color="#FCFCFC"
                        even-bg-color="	#FDF5E6"
                        :is-horizontal-resize="true"
                        :title-row-height="30"
                        :row-height="20"
                        title-bg-color="#87CEEB"
                        row-hover-color="#1E90FF"
                        row-click-color="#1E90FF"
                        :columns="columnsUpload"
                        :table-data="tableDataUpload"
                        
                    ></v-table>
                </div>
                
            </div>

            
        </el-dialog>
        <el-dialog  
            title="条件删除"
            :visible.sync="archives.someUpdate==2"
            width="70%"
            v-if="showSelect">
            <div>
                <div style="margin-top: 15px;margin-bottom: 30px; width:100%; text-align:center">
                    <el-input placeholder="请输入内容"  class="input-with-select" style="width:50%">
                        <el-select v-model="archives.select" slot="prepend" placeholder="请选择字段" style="width:105px">
                            <el-option label="本库检索" value="1"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="selectData(archives.select)"></el-button>
                    </el-input>
                </div>
                <div style="margin-top:10px" v-if="archives.selectDataShow">
                    <v-table 
                        v-loading="loading"
                        style="width:100%;"
                        :height="400"
                        :column-width-drag="true"
                        :is-vertical-resize="true"
                        odd-bg-color="#FCFCFC"
                        even-bg-color="#FDF5E6"
                        :is-horizontal-resize="true"
                        :title-row-height="30"
                        :row-height="20"
                        title-bg-color="#87CEEB"
                        row-hover-color="#1E90FF"
                        row-click-color="#1E90FF"
                        :columns="columnsUpload"
                        :table-data="tableDataUpload"
                        
                    ></v-table>
                </div>
                
            </div>

            
        </el-dialog>
        <el-dialog  
            title="条件修改"
            :visible.sync="archives.someUpdate==1"
            width="70%"
            v-if="showSelect">
            <div>
                <div style="margin-top: 15px;margin-bottom: 30px; width:100%; text-align:center">
                    <el-input placeholder="请输入内容"  class="input-with-select" style="width:50%">
                        <el-select v-model="archives.select" slot="prepend" placeholder="请选择字段" style="width:105px">
                            <el-option label="本库检索" value="1"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="selectData(archives.select)"></el-button>
                    </el-input>
                </div>
                <div style="margin-top:10px" v-if="archives.selectDataShow">
                    <v-table 
                        v-loading="loading"
                        style="width:100%;"
                        :height="400"
                        :column-width-drag="true"
                        :is-vertical-resize="true"
                        odd-bg-color="#FCFCFC"
                        even-bg-color="	#FDF5E6"
                        :is-horizontal-resize="true"
                        :title-row-height="30"
                        :row-height="20"
                        title-bg-color="#87CEEB"
                        row-hover-color="#1E90FF"
                        row-click-color="#1E90FF"
                        :columns="columnsUpload"
                        :table-data="tableDataUpload"
                        
                    ></v-table>
                </div>
                
            </div>

            
        </el-dialog>
        <!-- 设置筛选条件 -->
        <el-dialog
            title="设置筛选条件"
            :visible.sync="archives.conditionDialogVisiable"
            width="55%">
            <el-form :inline="true"  class="demo-form-inline">

                <el-form-item label="筛选字段">
                    <el-select v-model="archives.conditionExample.column"  placeholder="选择字段">
                        <el-option v-for="(column,index) in columnsAnJuan" :key="column.field" v-if="index>0&&column.title!='文件数量'" :label="column.title" :value="column.field"></el-option>
                        
                    </el-select>    
                </el-form-item>
                <el-form-item label="筛选条件">
                    <el-select v-model="archives.conditionExample.condition" placeholder="选择条件">
                        <el-option label="包含" value="contains"></el-option>
                        <el-option label="等于" value="equals"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="archives.conditionExample.keyword" placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addCondition">添加</el-button>
                </el-form-item>
            </el-form>
                <el-tag
                    v-for="(item,index) in archives.conditions"
                    :key="index"
                    closable
                    type="success"
                    @close="removeCondition(index)">
                    {{item.column+"  "+item.condition+"  "+item.keyword}}
                </el-tag>
            <span slot="footer" class="dialog-footer">
                <el-button @click="archives.conditionDialogVisiable = false">取 消</el-button>
                <el-button type="primary" @click="selectByCondition">查找</el-button>
            </span>
        </el-dialog>
        <!-- 批量修改 -->
        <el-dialog
            title="批量修改"
            :visible.sync="archives.conditionUpdateDialogVisiable"
            width="55%">
            <el-form :inline="true"  class="demo-form-inline">

                <el-form-item label="修改字段">
                    <el-select v-model="archives.conditionExample.column"  placeholder="选择字段">
                        <el-option v-for="(column,index) in columnsAnJuan" :key="column.field" v-if="index>0&&column.title!='文件数量'" :label="column.title" :value="column.field"></el-option>
                        
                    </el-select>    
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-select v-model="archives.conditionExample.operator" placeholder="选择操作类型">
                        <el-option label="内容替换" value="set"></el-option>
                        <el-option label="前面补充" value="insert"></el-option>
                        <el-option label="后面追加" value="append"></el-option>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="修改内容">
                    <el-input v-model="archives.conditionExample.value" placeholder="输入修改内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUpdateMsg">添加</el-button>
                </el-form-item>
            </el-form>
                <el-tag
                    v-for="(item,index) in archives.updateMsg"
                    :key="index"
                    closable
                    type="success"
                    @close="removeUpdateMsg(index)">
                    {{item.column+"  "+item.operator+"  "+item.value}}
                </el-tag>
            <span slot="footer" class="dialog-footer">
                <el-button @click="archives.conditionUpdateDialogVisiable = false">取 消</el-button>
                <el-button type="primary" @click="updateByCondition">修改选中行</el-button>
            </span>
        </el-dialog>
        <el-dialog title="原文查看" :visible.sync="dialogTableVisible" :before-close="beforeDialogTableVisible">
            <el-table 
                :data="gridData"
                height="250"
                border
                stripe
                style="width: 100%">
                <el-table-column property="fileName" label="文件名" width="500"></el-table-column>
                <el-table-column property="filePath" label="路径" width="300" v-if="false"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="showData(scope.$index, gridData)"
                        type="text"
                        size="small">
                        查看
                        </el-button>
                        <el-button
                        @click.native.prevent="downloadData(scope.$index, gridData)"
                        type="text"
                        size="small">
                        下载
                        </el-button>
                        <el-button
                        @click.native.prevent="deleteData(scope.$index, gridData)"
                        type="text"
                        size="small"
                        v-if="writeable==1">
                        删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                
                <el-button  type="primary" @click="mountClick" v-if="writeable==1">挂接原文</el-button>
                <el-button @click=" dialogTableVisibleClick">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="视频文件预览" :visible.sync="showVideo" :before-close="showVideoClose" align="center" >
            <div>
                
                    <el-button style="float:left" icon="el-icon-arrow-left" @click='lastVid'>上一页</el-button>
                    
                    <el-button style="float:right" @click='nextVid'>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                
            </div>
            <div>
                <h4>{{videoName}}</h4>
            </div>
            <video height="400px" :src="videoSrc" controls style="margin:0px auto"></video>
        </el-dialog>
        <el-dialog title="音频文件预览" :visible.sync="showAudio" :before-close="showAudioClose" align="center">
            <div>
                
                    <el-button style="float:left" icon="el-icon-arrow-left" @click='lastAudio'>上一页</el-button>
                    
                    <el-button style="float:right" @click='nextAudio'>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                
            </div>
            <div>
                <h4>{{audioName}}</h4>
            </div>
            <audio height="400px" :src="audioSrc" controls="controls"></audio>
        </el-dialog>
        <el-dialog title="图片文件预览" :visible.sync="showPicture" :before-close="showPictureClose" align="center" v-loading="picloading">
            <div>
                
                    <el-button style="float:left" icon="el-icon-arrow-left" @click='lastPic'>上一页</el-button>
                    
                    <el-button style="float:right" @click='nextPic'>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                
            </div>
            <div>
                <h4>{{picName}}</h4>
            </div>
            
            <div style="margin-top:15px">
                <img width="400px"  :src="pictureSrc" controls style="margin:0px auto" @load='onloadeddata' >
            </div>
            
            
        </el-dialog>
    </div>
                
</template>

<script>
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'
const XLSX = require("xlsx");

export default {
    name:"Archives",
    data () {
        return {
            brotherNodeId:'',
            fileList:[],
            gridData: [],
            videoSrc:'',
            videoName:'',

            audioSrc:'',
            audioName:'',

            pictureSrc:'',
            picIndex:'',
            picName:'',
            fileTyepAccept:"",
            dialogTableVisible:false,
            showVideo:false,
            showAudio:false,
            showPicture:false,
            options2: [{
            value: 1,
            label: '图片',
            disabled: true
            },{
            value: 2,
            label: '音频',
            disabled: true
            }, {
            value: 3,
            label: '视频',
            disabled: true
            }, {
            value: 4,
            label: '文档',
            disabled: true
            },{
            value: 5,
            label: '其他',
            disabled: true
            },
            ],
            mountData:{
                tableId:'',
                rowId:'',
                fileType: '',
            },
            value2:'',
            writeable:1,
            pdfDefine:{
                filePath:''
            },
            showSelect:false,
            canShowPdf:true,
            updateShow:false,
            showUpload:false,
            showMenuOne:false,
            showMenuTwo:false,
            childeProps:{
                nodeName:"",
                nodeType:"",
                templateType:[],
                
            },
            archives:{
                addRowDialogVisiable:false,
                updateRowDialogVisiable:false,
                conditionDialogVisiable:false,
                conditionUpdateDialogVisiable:false,
                selectShow:false,
                selectDataShow:false,
                someUpdate:'',
                select:'',
                conditionExample:{
                    column:"",
                    condition:"",
                    operator:'',
                    keyword:"",
                    value:""
                },
                conditions:[

                ],
                updateMsg:[

                ],
                aj:{
                    imgDialogVisiable:false,
                    mountDataDialogVisiable:false,
                    importDataDialogVisiable:false,
                    lastCheckedRowData:{},
                    selectedGroup:[],
                    ajImportFile:[]
                },
                jn:{
                    lastCheckedRowData:{},
                    selectedGroup:[],
                },
                currentTempletNode:{

                },
                yijianshengcheng:{
                    DH:'',
                    QZH:'',
                }
            },
            znodeData: [

                    // {"id":1, "pId":0, "name":"test1"},
                    // {"id":11, "pId":1, "name":"test11"},
                    // {"id":12, "pId":1, "name":"test12"},
                    // {"id":111, "pId":11, "name":"test111"}
            ],
            setting:{
                view: {
                    showLine: false,
                    txtSelectedEnable: false,
                },
                data: {
                    key:{
                        name:"nodeName"
                    },
                    simpleData: {
                        enable:true,
                        idKey: "id",
                        pIdKey: "parentNodeId",
                        rootPId: undefined,
                        addV:`<h1>123123</h1>`
                    }
                },
                callback: {
                    
                    onClick: (event,treeId,treeNode)=>{
                        this.writeable=1;
                        this.archives.aj.selectedGroup=[];
                        this.tableDataOne=[];
                        this.tableDataTwo=[];
                        this.archives.aj.selectedGroup=[];
                        this.rowClickData.rowIndex=null;
                        this.rowWjClickData.rowIndex=null;
                        this.canShowPdf=true;
                        this.showMenuOne=false;
                        this.showMenuTwo=false;
                        for(var a=0;a<5;a++){
                            this.options2[a].disabled=true;
                        }
                        this.value2='';
                        
                        this.mountData.tableId=treeNode.id;
                        var rootid=treeNode.rootId;
                        console.log('treeNode',treeNode);
                        
                        
                        if((treeNode.writeable==undefined)||(treeNode.writeable==0)){
                            this.writeable=0;
                        }
                        if(treeNode.tableName != undefined){
                            var parentNode=treeNode.getParentNode();
                            
                            var filter=parentNode.children.filter(
                                (item,index)=>{
                                    return item.tableName.indexOf('文件级')!=-1;
                                }
                            )
                            if(treeNode.tableName.indexOf('案卷级')!=-1){
                                
                                for(var i=0;i<treeNode.getParentNode().children.length;i++){
                                    if(treeNode.getParentNode().children[i].nodeName.indexOf('文件级'!=-1)){
                                        this.brotherNodeId=treeNode.getParentNode().children[i].id
                                        this.mountData.tableId=this.brotherNodeId
                                    }
                                }
                                
                                
                                this.$axios.all(
                                    [
                                        this.$axios.post(
                                            '/api/api/archives/column/select',
                                            {
                                                templetId:treeNode.templetId
                                            }
                                        ),
                                        this.$axios.post(
                                            '/api/api/archives/column/select',
                                            {
                                                templetId:filter[0].templetId
                                            }
                                        ),
                                        this.$axios.post(
                                            '/api/api/archives/data/selectAll',
                                            {
                                                tableId:treeNode.id
                                            }
                                        ),
                                        this.$axios.post(
                                            '/api/api/archives/data/selectAll',
                                            {
                                                tableId:filter[0].id
                                            }
                                        ),

                                    ]
                                    
                                ).then(this.$axios.spread(
                                    (tableTopAnJuan,tableTopAnJian,tableDateAnJuan,tableDataAnJian)=>{
                                        console.log(tableTopAnJuan);
                                        console.log(tableTopAnJian);
                                        console.log(tableDateAnJuan);
                                        console.log(tableDataAnJian);
                                        
                                        //添加案卷表头
                                        this.columnsAnJuan=tableTopAnJuan.data.columns.map(
                                            item=>{

                                                item.field=item.abcName;
                                                item.title=item.columnName;
                                                item.width=item.columnLength;
                                                item.titleAlign='center';
                                                item.columnAlign='center';
                                                item.isResize=true;
                                                if(item.sortType == 1){
                                                    item.orderBy="asc"
                                                }else if(item.sortType == -1){
                                                    item.orderBy ="desc"
                                                }

                                                return item;
                                            }
                                        );
                                        
                                        // console.log(this.columnsAnJuan);
                                        this.columnsAnJuan.unshift(
                                            {
                                                width: 10, 
                                                titleAlign: 'center',
                                                columnAlign:'center',
                                                type: 'selection',
                                                isResize:true
                                            }
                                        );

                                        
                                        //添加案卷数据
                                        this.tableDataOne=tableDateAnJuan.data.rows.map(
                                            item=>{
                                                item.id=item._id;
                                                return item;
                                            }
                                        );

                                        console.log(this.tableDataOne)
                                        

                                        //添加案件表头
                                        this.columnsAnJian=tableTopAnJian.data.columns.map(
                                            item=>{
                                                item.field=item.abcName;
                                                item.title=item.columnName;
                                                item.width=30;
                                                item.titleAlign='center';
                                                item.columnAlign='center';
                                                item.isResize=true;
                                                if(item.sortType == 1){
                                                    item.orderBy="asc"
                                                }else if(item.sortType == -1){
                                                    item.orderBy ="desc"
                                                }
                                                return item;
                                            }
                                        );
                                        this.columnsAnJian.unshift(
                                            {
                                                field: 'fileCount', 
                                                title:'文件数量', 
                                                width: 15, 
                                                titleAlign: 'center',
                                                columnAlign:'center',
                                                isResize:true
                                            }
                                        )
                                        
                                        //添加案件数据
                                        
                                        this.tableDataTwo=tableDataAnJian.data.rows.map(
                                            item=>{
                                                item.id=item._id;
                                                if(item.fileCount==undefined){
                                                    item.fileCount=0;
                                                }
                                                return item;

                                            }
                                        );

                                        console.log(this.tableDataTwo)
                                        this.showMenuOne=false;
                                        this.showMenuTwo=true;
                                    })).catch(
                                        (err)=>{
                                            console.log("请求出错");
                                            console.log(err)
                                        }
                                    )              
                            }else if(treeNode.tableName.indexOf('文件级')!=-1){
                                this.brotherNodeId='';
                                this.$axios.post(
                                    '/api/api/archives/column/select',
                                    {
                                        templetId:treeNode.templetId
                                    }
                                ).then(
                                    (res)=>{
                                        console.log('111',res)
                                        this.$axios.post(
                                            '/api/api/archives/data/selectAll',
                                            {
                                                tableId:treeNode.id
                                            }
                                        ).then(
                                            (res1)=>{
                                                console.log('222',res1)
                                                
                                                this.columnsAnJuan=res.data.columns.map(
                                                    item=>{
                                                        item.field=item.abcName;
                                                        item.title=item.columnName;
                                                        item.width=30;
                                                        item.titleAlign='center';
                                                        item.columnAlign='center';
                                                        item.isResize=true;
                                                        if(item.sortType == 1){
                                                            item.orderBy="asc"
                                                        }else if(item.sortType == -1){
                                                            item.orderBy ="desc"
                                                        }                                                        
                                                        return item
                                                    }
                                                );
                                                this.columnsAnJuan.unshift(
                                                    {
                                                        field: 'fileCount', 
                                                        title:'文件数量', 
                                                        width: 15, 
                                                        titleAlign: 'center',
                                                        columnAlign:'center',
                                                        isResize:true
                                                    }
                                                )
                                                this.columnsAnJuan.unshift(
                                                    {
                                                        width: 10, 
                                                        titleAlign: 'center',
                                                        columnAlign:'center',
                                                        type: 'selection',
                                                        isResize:true
                                                    }
                                                )
                                
                                                this.showMenuTwo=false;
                                                this.showMenuOne=true;
                                                
                                                this.tableDataOne=res1.data.rows.map(
                                                    item=>{
                                                        item.id=item._id;
                                                        if(item.fileCount==undefined){
                                                            item.fileCount=0;
                                                        }
                                                        return item;
                                                    }
                                                );
                                                
                                            }
                                        ).catch(
                                            (err1)=>{
                                                console.log(err1)
                                            }
                                        )
                                        
                                    }
                                ).catch(
                                    (err)=>{
                                        console.log(err)
                                    }
                                )
                            }else if(treeNode.tableName.indexOf('件盒级')!=-1){
                                this.brotherNodeId='';
                                this.$axios.post(
                                    '/api/api/archives/column/select',
                                    {
                                        templetId:treeNode.templetId
                                    }
                                ).then(
                                    (res)=>{
                                        console.log('111',res)
                                        this.$axios.post(
                                            '/api/api/archives/data/selectAll',
                                            {
                                                tableId:treeNode.id
                                            }
                                        ).then(
                                            (res1)=>{
                                                console.log('222',res1)
                                                this.columnsAnJuan=res.data.columns.map(
                                                    item=>{
                                                        item.field=item.abcName;
                                                        item.title=item.columnName;
                                                        item.width=30;
                                                        item.titleAlign='center';
                                                        item.columnAlign='center';
                                                        item.isResize=true;
                                                        if(item.sortType == 1){
                                                            item.orderBy="asc"
                                                        }else if(item.sortType == -1){
                                                            item.orderBy ="desc"
                                                        }
                                                        return item
                                                    }
                                                );
                                                
                                                console.log('1',this.columnsUpload)
                                                this.columnsAnJuan.unshift(
                                                    {
                                                        field: 'fileCount', 
                                                        title:'文件数量', 
                                                        width: 15, 
                                                        titleAlign: 'center',
                                                        columnAlign:'center',
                                                        isResize:true
                                                    }
                                                )
                                                this.columnsAnJuan.unshift(
                                                    {
                                                        width: 10, 
                                                        titleAlign: 'center',
                                                        columnAlign:'center',
                                                        type: 'selection',
                                                        isResize:true
                                                    }
                                                )
                                                console.log('2',this.columnsUpload)
                                                console.log('success',this.columnsAnJuan)
                                                
                                            
                                                this.showMenuTwo=false;
                                                this.showMenuOne=true;
                                                
                                                this.tableDataOne=res1.data.rows.map(
                                                    item=>{
                                                        item.id=item._id;
                                                        if(item.fileCount==undefined){
                                                            item.fileCount=0;
                                                        }
                                                        return item;
                                                    }
                                                );
                                                
                                            }
                                        ).catch(
                                            (err1)=>{
                                                console.log(err1)
                                            }
                                        )
                                        
                                    }
                                ).catch(
                                    (err)=>{
                                        console.log(err)
                                    }
                                )

                            }
                        }else{
                            this.showMenuOne=false;
                        }
                        
                        
                        
                        
                    },
                    onNodeCreated:(event, treeId, treeNode)=>{
                        // switch(treeNode.nodeType){
                        //     case 0:
                        //         console.log("全宗节点");
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/quanzong.png')+") 0 0 no-repeat");
                        //         break;
                        //     case 1:
                        //         console.log("分类节点");
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/fenlei.png')+") 0 0 no-repeat");
                        //         break;

                        //     case 2:
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/hezi.png')+") 0 0 no-repeat");
                        //         break;
                        //     case 3:
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/hezi.png')+") 0 0 no-repeat");
                        //         break;
                        //     case 4:
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/hezi.png')+") 0 0 no-repeat");
                        //         break;
                        //     case 5:
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/tablehezi.png')+") 0 0 no-repeat");
                        //         break;
                        //     case 6:
                        //         $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/fenlei.png')+") 0 0 no-repeat");
                        //         break;
                        //     default:break;
                        // }
                        // if(treeNode.tableName!=undefined){
                        //     $('#'+treeNode.tId+'_ico').css("background","url("+require('../../static/icon/table.png')+") 0 0 no-repeat");
                        // }

                    }
                }

            },
            columnsAnJuan:[

                // {width: 10, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
                // {field: 'document', title:'原文', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true},
                // {field: 'QZH', title:'全宗', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true,},
                // {field: 'DH', title:'档号', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true,},
                // {field: 'LMH', title:'类目号', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true },
                // {field: 'AJH', title:'案卷号', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true },
                // {field: 'AJTM', title:'案卷题名', width: 100, titleAlign: 'center',columnAlign:'center',isResize:true },
                // {field: 'BGQX', title:'保管期限', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true },
                // {field: 'BZ', title:'备注', width: 30, titleAlign: 'center',columnAlign:'center',isResize:true },
            ],
            columnsUpload:[

            ],
            loading:false,
            picloading:false,
            tableDataUpload:[

            ],
            columnsAnJian:[

            ],
            tableDataOne:[
                // {QZH:"TYSDAG",DH:"TYSDAG-1·1-001",LMH:"1·1",AJH:"001",AJTM:"山西国新天然气利用有限公司审计报告及财务报表2017年度",BGQX:"10年",BZ:""},
                // {QZH:"TYSDAG",DH:"TYSDAG-1·1-001",LMH:"1·1",AJH:"001",AJTM:"山西国新天然气利用有限公司审计报告及财务报表2017年度",BGQX:"10年",BZ:""},
               
            ],
            tableDataTwo:[

            ],
            rowWjClickData:{
                
                rowIndex:null,
                rowData:{

                }
            },
            rowClickData:{
                
                rowIndex:null,
                rowData:{

                }
            },
            footerStatus:{
                Aj:{
                    total:0,
                    selectCount:0,
                    ClickCount:0,
                },
                Wj:{
                    total:0,
                    selectCount:0,
                    ClickCount:0,
                },
            },       
            addTreeNodeDialogVisible:false,
        }
    },

    mounted () {
        //var writeableList=JSON.parse(window.sessionStorage.getItem('writeable'))
        this.$axios.post(
            '/api/api/archives/repertory/selectAll',
            {

            }
        ).then(
            (res)=>{
                console.log(res)  
                
                
                for(var j=0;j<res.data.nodes.length;j++){
                    res.data.nodes[j].writeable=1;
                    // for(var k=0;k<writeableList.length;k++){
                    //     if(writeableList[k].templetTreeId==res.data.nodes[j].id){
                    //         res.data.nodes[j].writeable=writeableList[k].writeable
                    //     }
                    // }
                    
                    switch(res.data.nodes[j].nodeType){
                        case 0:res.data.nodes[j].icon = './static/icon/quanzong.png';break;
                        case 1:res.data.nodes[j].icon = './static/icon/fenlei.png';break;
                        case 2:res.data.nodes[j].icon = './static/icon/hezi.png';break;
                        case 3:res.data.nodes[j].icon = './static/icon/hezi.png';break;
                        case 4:res.data.nodes[j].icon = './static/icon/hezi.png';break;
                        case 5:res.data.nodes[j].icon = './static/icon/tablehezi.png';break;
                        case 6:res.data.nodes[j].icon = './static/icon/fenlei.png';break;
                        default: break;
                    }
                }        
                // this.znodeData=res.data.nodes;
                for(var i=0;i<res.data.tables.length;i++){      
                    //  for(var l=0;l<writeableList.length;l++){
                    //     if(writeableList[l].templetTreeId==res.data.tables[i].id){
                    //         res.data.tables[i].writeable=writeableList[l].writeable
                    //     }
                    // }             
                    res.data.tables[i].nodeName=res.data.tables[i].tableName;
                    res.data.tables[i].parentNodeId=res.data.tables[i].parentId;
                    res.data.tables[i].icon="./static/icon/table.png";
                    res.data.tables[i].writeable=1;
                }
                this.znodeData=res.data.nodes.concat(res.data.tables)
                $.fn.zTree.init($("#templeteTree"), this.setting, this.znodeData);
                var treeObj = $.fn.zTree.getZTreeObj("templeteTree");
                var nodes = treeObj.getNodesByParam("writeable", 0, null);
                // var b=self.findParentNodes("7a04ea149eec48a783ed66f850fb450d")
                console.log(nodes)
                for(var x=0;x<nodes.length;x++){

                    this.findParentNodes(nodes[x].id)
                }
                // console.log(this.znodeData)
            }

        ).catch(
            (err)=>{
                console.log(err)
            }
        )
        

    },
    watch:{
        "tableDataOne":function(newTableDataOne,oldTableDataOne){
            this.footerStatus.Wj.total=newTableDataOne.length;
        },
        "tableDataTwo":function(newtableDataTwo,oldtableDataTwo){
            this.footerStatus.Aj.total=newtableDataTwo.length;
        },
        "rowWjClickData.rowIndex":function(newrowWjIndex,oldrowWjIndex){
            this.footerStatus.Wj.ClickCount=newrowWjIndex+1;
        },
        "rowClickData.rowIndex":function(newrowAjIndex,oldrowAjIndex){
            this.footerStatus.Aj.ClickCount=newrowAjIndex+1;
        },
        "archives.aj.selectedGroup":function(newselectedGroup,oldselectedGroup){
            this.footerStatus.Wj.selectCount=newselectedGroup.length;
        },
        "value2":function(newVal,oidVal){
            this.mountData.fileType=newVal;
            switch (newVal) {
                case 1:
                    this.fileTyepAccept='image/*';
                    break;
                case 2:
                    this.fileTyepAccept='audio/*';
                    break;
                case 3:
                    this.fileTyepAccept='video/*';
                    break;
                case 4:
                    this.fileTyepAccept='application/pdf';
                    break;
                case 5:
                    this.fileTyepAccept='*';
                    break;
                default:
                    break;
            }
            
            if((newVal!="")&&(this.brotherNodeId=='')){
                console.log("++++++++++++++++++++++++++++")
                console.log(this.mountData.tableId)
                console.log(this.mountData.rowId)
                console.log(newVal)   
                this.$axios.post(
                    '/api/api/archives/data/getFileList',
                    {
                        tableId:this.mountData.tableId,
                        rowId:this.mountData.rowId,
                        
                        fileType:newVal,
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        if('errorMsg' in res.data==false){
                            this.dialogTableVisible=true;
                            this.gridData=res.data.fileList;
                        }else{
                            this.operation('error',res.data.errorMsg)
                        }
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }

                )
                
            }else if((newVal!="")&&(this.brotherNodeId!='')){
                this.$axios.post(
                    '/api/api/archives/data/getFileList',
                    {
                        tableId:this.brotherNodeId,
                        rowId:this.mountData.rowId,
                        
                        fileType:newVal,
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        if('errorMsg' in res.data==false){
                            this.dialogTableVisible=true;
                            this.gridData=res.data.fileList;
                        }else{
                            this.operation('error',res.data.errorMsg)
                        }
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }

                )
            }else{
                this.dialogTableVisible=false;
            }
        },
        // "dialogTableVisible":function(newFile,oidFile){
        //     if(newFile==false){
        //         this.refresh()
        //     }
        // }

    },
    methods: {
        sortBy(attr,rev){
            //第二个参数没有传递 默认升序排列
            if(rev ==  undefined){
                rev = 1;
            }else{
                rev = (rev) ? 1 : -1;
            }
        
            return function(a,b){
                a = a[attr];
                b = b[attr];
                if(a < b){
                    return rev * -1;
                }
                if(a > b){
                    return rev * 1;
                }
                return 0;
            }
        },
        findParentNodes(id){
            
            var treeObj = $.fn.zTree.getZTreeObj("templeteTree");
            var nodes = treeObj.getNodesByParam("id", id, null);
            if((nodes.length==1)&&(nodes[0].children!=undefined)){
                var childNodes= nodes[0].children
                for(var y=0;y<childNodes.length;y++){
                    childNodes[y].writeable=0;
                    this.findParentNodes(childNodes[y].id)
                }
            }
            
        },
        tableDataOneSortChange(column){
            // this.tableDataOne.sort(sortBy())
            
            console.log("排序字段",column);
            console.log(column.prop,column.order)
        },
        tableDataTwoSortChange(params){
            console.log("排序字段",params);
        },
        operation(status,text){
            var self=this;  
            self.$message({
                type: status,
                message: text
            })  
        },
        //添加节点显示与否条件
        showAddTreeNodeDialog(){
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes();
            console.log(selectedNode)
            if((selectedNode[0].writeable==undefined)||(selectedNode[0].writeable==0)){
                this.operation('warning','您没有该节点的权限，详情请咨询管理员');
            }else{
                if(selectedNode.length==0){
                    console.log('null')
                    this.addTreeNodeDialogVisible=false;
                    this.$alert('请先选中节点', '提示', {
                        confirmButtonText: '确定', 
                        callback:action=>{

                        }         
                    });
                }else if((selectedNode[0].nodeType==0)||(selectedNode[0].nodeType==1)){
                    this.addTreeNodeDialogVisible=false;
                    this.$alert('该节点无档案模板，请重新选择', '提示', {
                        confirmButtonText: '确定', 
                        callback:action=>{

                        }         
                    });
                }else if((selectedNode[0].nodeType==5)||(selectedNode[0].tableName!=undefined)){
                    this.addTreeNodeDialogVisible=false;
                    this.$alert('该节点为数据节点，无法创建节点，请重新选择', '提示', {
                        confirmButtonText: '确定', 
                        callback:action=>{

                        }         
                    });
                }
                else{
                    
                    console.log('yes')
                    this.addTreeNodeDialogVisible=true;
                    
                }
            }
            
        },
        //删除节点条件
        deleteTreeNode(){
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            if((selectedNode.writeable==undefined)||(selectedNode.writeable==0)){
                this.operation('warning','您没有该节点的权限，详情请咨询管理员')
            }else{
                if((selectedNode.nodeType!=5)&&(selectedNode.nodeType!=6)){
                    this.$alert('该节点无法删除', '安全提示', {
                            confirmButtonText: '确定',      
                            callback:action=>{

                            } 
                        });
                }else{
                    this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => { 
                        this.$axios.post(
                            '/api/api/archives/repertory/delete',
                            {
                                nodeId:selectedNode.id
                            }
                        ).then(
                            (res)=>{
                                console.log(res)
                                if(res.data.deleted==1){
                                    tree.removeNode(selectedNode);
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: '删除失败!'
                                    });
                                }
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
            }
        },
        //弹出框关闭
        handleClose(done){
            
            if(this.addTreeNodeDialogVisible==true){
                this.addTreeNodeDialogVisible = false;
            }
            
            
            done();
            
        },
        showVideoClose(done){
            this.showVideo=false;
            this.videoSrc='';
            done();
        },
        showAudioClose(done){
            this.showAudio=false;
            this.audioSrc='';
            done();
        },
        showPictureClose(done){
            this.showPicture=false;
            this.pictureSrc='';
            done();
        },
        mountHandleClose(done){
            this.value2='';
            done();
        },
        handleCloseUpdate(done){            
                this.archives.aj.updateRowDialogVisiable = false;
                this.updateShow=false;
                this.archives.aj.selectedGroup=[];

            done();
        },
        handleCloseUpload(done){            
            this.archives.aj.importDataDialogVisiable=false;
            this.showUpload=false;
            this.columnsUpload=[];

            done();
        },
        // handleFileClose(done){
        //     this.refresh();
        //     done();
        // },
        //添加子节点
        addChildNode(){
            if((this.childeProps.nodeName=='')||(this.childeProps.nodeType=='')){
                this.operation('error','操作有误，数据不全');
            }else{
                var tree = $.fn.zTree.getZTreeObj("templeteTree");
                var selectedNode = tree.getSelectedNodes()[0];
                if(this.childeProps.nodeType==6){
                    this.$axios.post(
                    '/api//api/archives/directory/add',
                    {
                        "nodeName":this.childeProps.nodeName,
                        "parentId":selectedNode.id,
                        "rootId":selectedNode.rootId,
                        
                    }
                ).then(
                    (res)=>{
                        console.log('nodename'+this.childeProps.nodeName)
                        console.log(res);
                        this.operation('success','添加成功');
                        res.data.newNode.parentNodeId=res.data.newNode.parentId
                        res.data.newNode.writeable=1;
                        res.data.newNode.icon='./static/icon/fenlei.png'
                        tree.addNodes(selectedNode, res.data.newNode);
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                )
                }else if(this.childeProps.nodeType==5){
                    this.$axios.post(
                    '/api/api/archives/repertory/add',
                    {
                        "repertoryName":this.childeProps.nodeName,
                        "parentNodeId":selectedNode.id,
                        "rootId":selectedNode.rootId,
                        
                    }
                ).then(
                    (res)=>{
                        console.log(res);
                        this.operation('success','添加成功');
                        
                        res.data.newRepertory.icon='./static/icon/tablehezi.png';
                        res.data.newRepertory.writeable=1;
                        tree.addNodes(selectedNode, res.data.newRepertory);
                        var parentNode=tree.getNodesByParam('id',res.data.newRepertory.id,null)[0];
                        for(var k=0;k<res.data.tables.length;k++){
                            res.data.tables[k].nodeName=res.data.tables[k].tableName
                            res.data.tables[k].parentNodeId=res.data.tables[k].repertoryId
                            res.data.tables[k].icon='./static/icon/table.png';
                            res.data.tables[k].writeable=1;
                            tree.addNodes(parentNode, res.data.tables[k]);
                            }
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                )
                }
                
            }
        },
        
        
        rowWjClick(rowIndex, rowData, column){
            this.value2='';
            console.log('1',rowData)
            console.log('2',rowIndex) 
            console.log('3',column)
            this.mountData.rowId=rowData.id;
            this.rowWjClickData.rowIndex=rowIndex;
            this.rowWjClickData.rowData=rowData;
            for(var a=0;a<5;a++){
                this.options2[a].disabled=false;
            }
            if(rowData.fileCount!=0){
                console.log('2',111)
                this.canShowPdf=false;
                
                //alert(this.value2) 
                this.pdfDefine.filePath=rowData.filePath;
            }else{
                this.canShowPdf=true;
                this.pdfDefine.filePath='';
                
                this.value2='';
            }
        },
        rowClick(rowIndex, rowData, column){
            this.value2='';
            for(var a=0;a<5;a++){
                this.options2[a].disabled=true;
            }
            this.value2='';
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            this.rowClickData.rowIndex=rowIndex;
            this.rowClickData.rowData=rowData;
            console.log('2',rowData) 
            console.log('3',column)
            this.$axios.post(
                '/api/api/archives/data/selectByDh',
                {
                    DH:rowData.DH,
                    tableId:selectedNode.id
                }
            ).then(
                (res)=>{
                    console.log("点击之后")
                    console.log(res.data);
                    this.tableDataTwo=res.data.rows.map(
                        item=>{
                            item.id=item._id;
                            if(item.fileCount==undefined){
                                item.fileCount=0;
                            }
                            return item;

                        }
                    );
                    // this.tableDataTwo=res.data.rows;
                }
            ).catch(
                (err)=>{

                }
            )
            
        },
        showAddDialog(){
            //this.archives.addRowDialogVisiable = true;

        },
        // 单元格编辑回调
        cellEditDone(newValue,oldValue,rowIndex,rowData,field){

            this.tableData[rowIndex][field] = newValue;

            // 接下来处理你的业务逻辑，数据持久化等...
        },
        commitRowData(val){
            var data={};
            var dataArr=[];
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            var items = document.getElementsByClassName("input-item-add");
            for(var i = 0 ;i < items.length;i++){
                var a=items[i].name;
                var b=items[i].value;
                data[a]=b;
                
            };
            
            dataArr.push(data)
            this.$axios.post(
                '/api/api/archives/data/add',
                {
                    tableId:selectedNode.id,
                    data:dataArr

                }
            ).then(
                (res)=>{
                    console.log(res)
                    let arr=JSON.parse(res.data.rows[0]);
                    arr.fileCount=0;
                    this.tableDataOne.push(arr)
                    this.operation('success','添加成功')
                    if(val==0){
                        for(var i = 0 ;i < items.length;i++){
                            
                            items[i].value='';
                        };
                        this.archives.addRowDialogVisiable=false;
                    }
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
            console.log("提交条目信息");
        },
        uploadClick(){
            this.tableDataUpload=[];
            this.columnsUpload=[];
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            if(selectedNode.tableName.indexOf('案卷级')!=-1){
                var i=1
            }else{
                var i=2
            }
            
            for(;i<this.columnsAnJuan.length;i++){
                this.columnsUpload.push(this.columnsAnJuan[i])
            }
            console.log(this.columnsUpload);
            // this.columnsUpload=this.columnsAnJuan.concat();
            this.archives.aj.importDataDialogVisiable=true;
            this.showUpload=true;
        },
        unupload(){
            this.archives.aj.importDataDialogVisiable=false;
            this.showUpload=false;
            this.columnsUpload=[];
        },
        updateData(){
            if(this.archives.aj.selectedGroup.length==0){
                this.$alert('请选择要修改的数据', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // this.$message({
                        // type: 'info',
                        // message:" "
                        // });
                    }       
                });
            }
            else{
                if(this.archives.aj.selectedGroup.length>1){
                    this.$alert('请不要选择多组数据', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // this.$message({
                            // type: 'info',
                            // message:" "
                            // });
                        }       
                    });
                }else{
                    this.updateShow=true;
                    this.archives.updateRowDialogVisiable=true;
                }
                
            }
        },
        unupdateData(){
            this.updateShow=false;
            this.archives.aj.updateRowDialogVisiable=false
            this.archives.aj.selectedGroup=[];
        },
        updateRowData(){
            //提交跟新条目信息
            var data={};
            var dataArr=[];
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            var items = document.getElementsByClassName("input-item-update");
            for(var i = 0 ;i < items.length;i++){
                var a=items[i].name;
                var b=items[i].value;
                data[a]=b;
                
            };
            data.id=this.archives.aj.selectedGroup[0].id;
            dataArr.push(data)
            this.$axios.post(
                '/api/api/archives/data/update',
                {
                    tableId:selectedNode.id,
                    
                    data:dataArr[0]

                }
            ).then(
                (res)=>{
                    console.log(res)
                    if(res.data.success==1){
                        for(var i=0; i<this.tableDataOne.length;i++){
                            if(this.tableDataOne[i].id==dataArr[0].id){
                                console.log('222222222222')
                                for(var x in this.tableDataOne[i]){
                                    if(x!='id'){
                                        this.tableDataOne[i][x]=dataArr[0][x]
                                    }                  
                                }                   
                                
                            }
                        }
                        this.updateShow=false;
                        this.archives.aj.updateRowDialogVisiable=false;
                        this.operation('success','修改成功')
                        this.archives.aj.selectedGroup=[];                  
                    }
                }
            ).catch(
                (err)=>{
                    console.log(err)
                }
            )
            console.log("修改");
        },
        selectChange(selection,rowData){
            console.log('select-change',selection,rowData);
            this.archives.aj.selectedGroup=selection;        
        },
        selectAll(selection){
            this.archives.aj.selectedGroup=selection;
        },
        
        deleteRowData(){
            //提交删除条目信息
            var ids=[];
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            console.log(this.archives.aj.selectedGroup);
            for(var i=0;i<this.archives.aj.selectedGroup.length;i++){
                ids.push(this.archives.aj.selectedGroup[i].id)
            }
            
            console.log('111',ids)
                this.$axios.post(
                    '/api/api/archives/data/delete',
                    {
                        tableId:selectedNode.id,
                        ids:ids
                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        if(res.data.success==1);
                        this.operation('success',"成功删除"+res.data.deleted+'条')
                        this.$axios.post(
                            '/api/api/archives/data/selectAll',
                            {
                                tableId:selectedNode.id
                            }
                        ).then(
                            (res1)=>{
                                console.log(res1)
                                this.tableDataOne=res1.data.rows.map(
                                    item=>{
                                        item.id=item._id;
                                        return item;
                                    }
                                );
                            }
                        ).catch(
                            (err1)=>{

                            }
                        )
                        
                        
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
            
            
        },
        upload(event){
            var self=this;
            
            var sheetArr=[];
            var files = event.target.files;
            var zzexcel;
            if(!files) {
                return;
            }
            var f = files[0];
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function(e) {
                //console.log(XLSX);
                var data = e.target.result;
                    zzexcel = XLSX.read(data, {
                        type: 'binary'
                    });
                
                sheetArr=XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]]);
                console.log(zzexcel.SheetNames[0],XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]]));
                // for(var i=0;i<zzexcel.SheetNames.length;i++){
                //     console.log(zzexcel.SheetNames[0],XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]]));

                // }
                console.log('999',self.columnsUpload)
                console.log(sheetArr)
                for(var i=0; i<sheetArr.length ; i++){
                    for(var x in sheetArr[i]){
                        
                        for(var j=0; j<self.columnsUpload.length;j++){
                            if(x==self.columnsUpload[j].title){
                                sheetArr[i][self.columnsUpload[j].field]=sheetArr[i][x];
                                delete sheetArr[i][x];
                            }
                        }                    
                    }  
                }
                console.log(sheetArr)
                self.tableDataUpload=self.tableDataUpload.concat(sheetArr)
            
            }
            
        },
        uploadData(){
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            if(this.tableDataUpload==''){
                this.$alert('内容为空，请重新选择', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // this.$message({
                        // type: 'info',
                        // message:" "
                        // });
                    }       
                });
            }else{
                this.loading=true;
                this.$axios.post(
                    '/api/api/archives/data/add',
                    {
                        tableId:selectedNode.id,
                        data:this.tableDataUpload

                    }
                ).then(
                    (res)=>{
                        console.log(res)
                        this.operation('success','成功上传'+res.data.rows.length+'条')
                        // console.log(JSON.stringify(res.data.rows[0]))
                        for(var i=0;i<res.data.rows.length;i++){
                            this.tableDataOne.push(JSON.parse(res.data.rows[i]))
                        }
                        this.loading=false;
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                    }
                )
            }
            
            
        },
        downloadClick(){
            // console.log(this.tableDataOne)
            // //console.log(this.archives.aj.selectedGroup)
            // this.tablesToExcel(this.tableDataOne,1,1);
            //this.tablesToExcel(this.archives.aj.selectedGroup,"2","2");
            var blob = new Blob([res.data])
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = selectedNode.tableName+'.xlsx'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象  
            var formData = new FormData();
            
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            formData.append('tableId',selectedNode.id)
            this.$axios.post(
                '/api/api/archives/data/export',
                formData,
                {     
                    responseType:'blob',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                },
                
                
            ).then(
                (res)=>{
                    console.log(res)
                    var blob = new Blob([res.data])
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = selectedNode.tableName+'.xlsx'; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象                 
                } 
            ).catch(
                (err)=>{
                    console.log(err)
                } 
            )
            
        },
        // 把页面的表格转化为excel下载下来
        tablesToExcel(table, name, filename) {

            var uri = "data:application/vnd.ms-excel;base64,"
                ,
                template = "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>"
                , templateend = "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>"
                , body = "<body>"
                , tablevar = "<table>{table"
                , tablevarend = "}</table>"
                , bodyend = "</body></html>"
                , worksheet = "<x:ExcelWorksheet><x:Name>"
                , worksheetend = "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
                , worksheetvar = "{worksheet"
                , worksheetvarend = "}"
                , base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)));
                }
                , format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    });
                }
                , wstemplate = ""
                , tabletemplate = "";

            var tables = table;

            for (var i = 0; i < tables.length; ++i) {
                wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
                /*
                *  addd <td></td> let two table arrange left and right
                */
                if (tables.length > 1) {
                    tabletemplate += "<td>" + tablevar + i + tablevarend + "</td>";
                } else {
                    tabletemplate += tablevar + i + tablevarend;
                }
            }

            /*
            * add <table><tr> and </table></tr> to Conbime left_tab and right_tab to one table
            */
            if (tables.length > 1) {
                tabletemplate = "<table><tr>" + tabletemplate + "</table></tr>";
            }

            var allTemplate = template + wstemplate + templateend;
            var allWorksheet = body + tabletemplate + bodyend;
            var allOfIt = allTemplate + allWorksheet;

            var ctx = {};
            for (var j = 0; j < tables.length; ++j) {
                ctx["worksheet" + j] = name[j];
            }

            for (var k = 0; k < tables.length; ++k) {
                var exceltable;
                if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
                ctx["table" + k] = exceltable.innerHTML;
            }

            window.location.href = uri + base64(format(allOfIt, ctx));
        },
        downloadFile(fileName,filePath){
            var formData = new FormData();
            formData.append('filePath',filePath)
            this.$axios.post(
                '/api/api/archives/data/fileDownload',
                formData,
                {     
                    responseType:'blob',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                },
                
                
            ).then(
                (res)=>{
                    console.log(res)
                    var blob = new Blob([res.data])
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = fileName; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象                 
                } 
            ).catch(
                (err)=>{
                    console.log(err)
                } 
            )
            
        },

        mountClick(){
            // if(this.archives.aj.selectedGroup.length==0){
            //     this.operation('error','请选择一行数据')
            // }else if(this.archives.aj.selectedGroup.length>1){
            //     this.operation('error','请选择一行数据')
            // }else{
                this.archives.aj.mountDataDialogVisiable=true;
            // }         


        },
        unmount(){
            this.archives.aj.mountDataDialogVisiable=false;
            this.value2='';
        },
        // mountData(event){
            
        //     var formData = new FormData();
        //     var tree = $.fn.zTree.getZTreeObj("templeteTree");
        //     var selectedNode = tree.getSelectedNodes()[0];
        //     var files = event.target.files;
            
        //     console.log('id',selectedNode.id)
        //     console.log('files',files);
        //     console.log('id',this.archives.aj.selectedGroup[0].id)
        //     // files.forEach(file => {
        //     //     formData.append('files',file)
        //     // });
        //     formData.append('tableId',selectedNode.id);
        //     formData.append('rowId',this.archives.aj.selectedGroup[0].id)
        //     formData.append('fileType',this.value3)
        //     formData.append('files',files[0]);
            
        //         this.$axios.post(
        //         '/api/api/archives/data/fileUpload',
        //         formData,
        //         {     
        //             headers:{
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         },      
        //     ).then(
        //         (res)=>{
        //             console.log(res)
        //             if(res.data.success==1){
        //                 this.operation('success','挂接成功')
        //                 console.log(this.tableDataOne)
        //                 for(var i=0;i<this.tableDataOne.length;i++){
        //                     if(this.tableDataOne[i].id==this.archives.aj.selectedGroup[0].id){
        //                         this.tableDataOne[i]['fileCount']=res.data.fileCount;
        //                         this.tableDataOne[i]['filePath']=res.data.filePath;
        //                     }
        //                 }
        //                 this.archives.aj.selectedGroup=[];
        //             }else{

        //                 this.operation('error','挂接失败,'+res.data.errorMsg)
        //             }
        //             this.archives.aj.mountDataDialogVisiable=false;
        //             this.value3='';
        //         }
        //     ).catch(
        //         (err)=>{
        //             console.log(err)
        //         }
        //     )      
            
            
        // },
        
        showPdf(filePath){
        //创建form表单
            var temp_form = document.createElement("form");
            temp_form.action = "/api/api/archives/data/showPdf";
            //如需打开新窗口，form的target属性要设置为'_blank'
            temp_form.target = "_blank";
            temp_form.method = "post";
            temp_form.style.display = "none";
            var opt = document.createElement("textarea");
            opt.name = "filePath";
            opt.value = filePath
            temp_form.appendChild(opt);
            document.body.appendChild(temp_form);
            //提交数据
            temp_form.submit();
        },
        showOther(filePath){
        //创建form表单
            var temp_form = document.createElement("form");
            temp_form.action = "/api/api/archives/data/showPdf";
            //如需打开新窗口，form的target属性要设置为'_blank'
            temp_form.target = "_blank";
            temp_form.method = "post";
            temp_form.style.display = "none";
            var opt = document.createElement("textarea");
            opt.name = "filePath";
            opt.value = filePath
            temp_form.appendChild(opt);
            document.body.appendChild(temp_form);
            //提交数据
            temp_form.submit();
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },  
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        backDeskClick(){
            this.$router.push({path:"/"});
        },
        selectClick(){
            this.tableDataUpload=[];
            this.columnsUpload=[];
            var tree = $.fn.zTree.getZTreeObj("templeteTree");
            var selectedNode = tree.getSelectedNodes()[0];
            if(selectedNode.tableName.indexOf('案卷级')!=-1){
                var i=1
            }else{
                var i=2
            }
            
            for(;i<this.columnsAnJuan.length;i++){
                this.columnsUpload.push(this.columnsAnJuan[i])
            }
            console.log(this.columnsUpload);
            // this.columnsUpload=this.columnsAnJuan.concat();
            this.archives.selectShow=true;
            this.showSelect=true;
        },
        
        selectData(value){

        },
        selectByCondition(){
            this.$axios.post(
                "/api/api/archives/data/conditionQuery",
                {
                    tableId:$.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].id,
                    conditions:this.archives.conditions,
                }).then((res)=>{
                    console.log("条件查询结果",res);
                    if($.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].nodeName.indexOf("\(案卷级\)") != -1){
                        console.log("案卷级",this.tableDataTwo);
                        this.tableDataOne=res.data.rows.map(
                            item=>{
                                item.id=item._id;
                                return item;
                            }
                        );
                    }else{
                        //添加文件
                        console.log("文件级",this.tableDataOne);
                        this.tableDataOne=res.data.rows.map(
                            item=>{
                                item.id=item._id;
                                if(item.fileCount==undefined){
                                    item.fileCount=0;
                                }
                                return item;

                            }
                        );
                    }
                    
                }).catch((err)=>{
                    console.log("条件查询出错",err);
                })
        },
        addCondition(){
            this.archives.conditions.push({
                column:this.archives.conditionExample.column,
                condition:this.archives.conditionExample.condition,
                keyword:this.archives.conditionExample.keyword,
            });
            this.archives.conditionExample.column = "";
            this.archives.conditionExample.condition = "";
            this.archives.conditionExample.keyword = "";
        },
        addUpdateMsg(){
            this.archives.updateMsg.push({
                column:this.archives.conditionExample.column,
                operator:this.archives.conditionExample.operator,
                value:this.archives.conditionExample.value,
            });
            this.archives.conditionExample.column = "";
            this.archives.conditionExample.operator = "";
            this.archives.conditionExample.value = "";
        },
        removeCondition(index){
            this.archives.conditions.splice(index,1);
        },
        removeUpdateMsg(index){
            this.archives.updateMsg.splice(index,1);
        },
        //异步提交更新
        updateByCondition(){
            this.$axios.post("/api/api/archives/data/conditionUpdate",{
                tableId:$.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].id,
                rowIds:this.getSelectedRowIds(),
                updateMsg:this.archives.updateMsg
                 
            }).then(res=>{
                if(res.data.success == 0){
                    alert(res.data.msg)
                }else{
                    this.operation("success","修改成功");
                    if($.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].nodeName.indexOf("\(案卷级\)") != -1){
                        console.log("案卷级",this.tableDataTwo);
                        this.tableDataOne=res.data.rows.map(
                            item=>{
                                item.id=item._id;
                                return item;
                            }
                        );
                    }else{
                        //添加文件
                        console.log("文件级",this.tableDataOne);
                        this.tableDataOne=res.data.rows.map(
                            item=>{
                                item.id=item._id;
                                if(item.fileCount==undefined){
                                    item.fileCount=0;
                                }
                                return item;

                            }
                        );
                    }
                }
            }).catch(err=>{
                
            })
        },
        //获取要更新的行的id
        getSelectedRowIds(){
            let tem = this.archives.aj.selectedGroup;
            let result = [];
            for(let i = 0;i<tem.length;i++){
                console.log(tem[i]["_id"]);
                //result[i]=tem[i]["_id"];
                result.push(tem[i]["_id"])
            }
            return result;

        },
        //批量挂接
        bigMount(){
            this.$confirm('请确保文件已经上传到服务器', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let tableId = $.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].id;
                this.$axios.post('/api/api/archives/data/bigMount',{
                    tableId:tableId
                }).then(res=>{ 
                    console.log("批量挂接返回值：",res);
                    if(res.data.success == 0){
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });                        
                    }else{
                        this.$message({
                            type: 'success',
                            message: '挂接成功!'
                        });
                        this.refresh();
                    }

                }).catch(err=>{
                    alert(err);
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        removeFilePath(){
            this.$axios.post("/api/api/archives/data/removeFilePath",{
                rowIds:this.getSelectedRowIds(),
                tableId:$.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0].id,
            }).then(res=>{
                console.log('000',res);
                if(res.data.success == 0){
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    });
                }else if(res.data.success == 1){
                    //alert("删除"+res.data.removed);
                    this.$message({
                        type:"success",
                        message:"成功删除"+res.data.removed+"处原文"
                    });
                    this.refresh();
                }
            }).catch(err=>{
                console.log(err);
                alert("请求出错")
                
            })
        },
        showData(index,val){
            this.picIndex=index;
            for(var i=0;i<this.gridData.length;i++){
                if(i==index){
                    switch (this.mountData.fileType) {
                        case 1:
                            this.picloading=true;
                            this.picName=this.gridData[i].fileName
                            this.showPicture=true
                            this.pictureSrc='/api/api/archives/data/showImage?filePath='+encodeURIComponent(this.gridData[i].filePath)
                            break;
                        case 2:
                            this.audioName=this.gridData[i].fileName
                            this.showAudio=true
                            this.audioSrc='/api/api/archives/data/showAudio?filePath='+encodeURIComponent(this.gridData[i].filePath)
                            break;
                        case 3:
                            this.videoName=this.gridData[i].fileName
                            this.showVideo=true
                            this.videoSrc='/api/api/archives/data/showVideo?filePath='+encodeURIComponent(this.gridData[i].filePath)
                            break;
                        case 4:
                            this.showPdf(this.gridData[i].filePath)
                            break;
                        case 5:
                            this.downloadFile(this.gridData[i].fileName,this.gridData[i].filePath)
                            break;
                        default:
                            break;
                    }
                    
                }
            }
        },
        downloadData(index,val){
            for(var i=0;i<this.gridData.length;i++){
                if(i==index){
                    this.downloadFile(this.gridData[i].fileName,this.gridData[i].filePath)
                    
                }
            }

        },
        deleteData(index,val){
            for(var i=0;i<this.gridData.length;i++){
                if(i==index){
                    this.$axios.post(
                        '/api/api/archives/data/removeFile',
                        {
                            tableId:this.mountData.tableId,
                            rowId:this.mountData.rowId,
                            filePath:this.gridData[i].filePath
                        }
                    ).then(
                        (res)=>{
                            console.log(res)
                            if(res.data.success==1){
                                this.operation('success','成功移除1条')
                                val.splice(index, 1);
                            }else if(res.data.errorMsg!=undefined){
                                this.operation('error',res.data.errorMsg)
                            }else{
                                this.operation('error','删除失败')
                            }
                            
                            //this.refresh();
                        }
                    ).catch(
                        (err)=>{
                            console.log(err)
                        }
                    )
                }
            }
            
            
        },
        handleSuccess(response, file, fileList){
            console.log("-------------",response)
            console.log(file)
            console.log(fileList)
            this.fileList=[];
            this.operation("success","上传成功")
            this.archives.aj.mountDataDialogVisiable=false

            this.refresh();
        },
        handleErr(err, file, fileList){
            console.log("++++++++++++",err)
            console.log(file)
            console.log(fileList)
            this.fileList=[];
            this.operation("error","上传失败")
            this.refresh();
            this.archives.aj.mountDataDialogVisiable=false
        },
        //模块刷新
        refresh(){
            let selectedNode = $.fn.zTree.getZTreeObj("templeteTree").getSelectedNodes()[0];
            $("#"+selectedNode.tId+"_a").click(); // 点击节点
        },
        handleCommand(command){
            console.log(command)
        },
        dialogTableVisibleClick(){
            this.dialogTableVisible=false;
            this.value2='';
        },
        beforeDialogTableVisible(done){
            this.dialogTableVisible=false;
            this.value2='';
            done();
        },
        lastPic(){
            this.picloading=true;
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
    
            if(this.picIndex!=0){
                this.showPicture=true
                this.picName=this.gridData[this.picIndex-1].fileName
                this.pictureSrc='/api/api/archives/data/showImage?filePath='+encodeURIComponent(this.gridData[this.picIndex-1].filePath)
                this.picIndex-=1;
                //this.picloading=false
            }else if(this.picIndex==0){
                this.showPicture=true
                this.picName=this.gridData[this.gridData.length-1].fileName
                this.pictureSrc='/api/api/archives/data/showImage?filePath='+encodeURIComponent(this.gridData[this.gridData.length-1].filePath)
                this.picIndex=this.gridData.length-1;
                //this.picloading=false
            }
            
            
        },
        nextPic(){
            this.picloading=true;
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
            
            if(this.picIndex!=this.gridData.length-1){
                this.showPicture=true
                this.picName=this.gridData[this.picIndex+1].fileName
                this.pictureSrc='/api/api/archives/data/showImage?filePath='+encodeURIComponent(this.gridData[this.picIndex+1].filePath)
                this.picIndex+=1;
                //this.picloading=false;
            }else if(this.picIndex==this.gridData.length-1){
                this.showPicture=true
                this.picName=this.gridData[0].fileName
                this.pictureSrc='/api/api/archives/data/showImage?filePath='+encodeURIComponent(this.gridData[0].filePath)
                this.picIndex=0;
                //this.picloading=false
            }
            

        },
        lastVid(){
            
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
    
            if(this.picIndex!=0){
                this.showVideo=true
                this.videoName=this.gridData[this.picIndex-1].fileName
                this.videoSrc='/api/api/archives/data/showVideo?filePath='+encodeURIComponent(this.gridData[this.picIndex-1].filePath)
                this.picIndex-=1;
                //this.picloading=false
            }else if(this.picIndex==0){
                this.showVideo=true
                this.videoName=this.gridData[this.gridData.length-1].fileName
                this.videoSrc='/api/api/archives/data/showVideo?filePath='+encodeURIComponent(this.gridData[this.gridData.length-1].filePath)
                this.picIndex=this.gridData.length-1;
                //this.picloading=false
            }
            
            
        },
        nextVid(){
           
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
            
            if(this.picIndex!=this.gridData.length-1){
                this.showVideo=true
                this.videoName=this.gridData[this.picIndex+1].fileName
                this.videoSrc='/api/api/archives/data/showVideo?filePath='+encodeURIComponent(this.gridData[this.picIndex+1].filePath)
                this.picIndex+=1;
                //this.picloading=false;
            }else if(this.picIndex==this.gridData.length-1){
                this.showVideo=true
                this.videoName=this.gridData[0].fileName
                this.videoSrc='/api/api/archives/data/showVideo?filePath='+encodeURIComponent(this.gridData[0].filePath)
                this.picIndex=0;
                //this.picloading=false
            }
            

        },
        lastAudio(){
            
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
    
            if(this.picIndex!=0){
                this.showAudio=true
                this.audioName=this.gridData[this.picIndex-1].fileName
                this.audioSrc='/api/api/archives/data/showAudio?filePath='+encodeURIComponent(this.gridData[this.picIndex-1].filePath)
                this.picIndex-=1;
                //this.picloading=false
            }else if(this.picIndex==0){
                this.showAudio=true
                this.audioName=this.gridData[this.gridData.length-1].fileName
                this.audioSrc='/api/api/archives/data/showAudio?filePath='+encodeURIComponent(this.gridData[this.gridData.length-1].filePath)
                this.picIndex=this.gridData.length-1;
                //this.picloading=false
            }
            
            
        },
        nextAudio(){
            
            console.log('++++++++++++++++++++++++++++++++',this.picIndex)
            
            if(this.picIndex!=this.gridData.length-1){
                this.showAudio=true
                this.audioName=this.gridData[this.picIndex+1].fileName
                this.audioSrc='/api/api/archives/data/showAudio?filePath='+encodeURIComponent(this.gridData[this.picIndex+1].filePath)
                this.picIndex+=1;
                //this.picloading=false;
            }else if(this.picIndex==this.gridData.length-1){
                this.showAudio=true
                this.audioName=this.gridData[0].fileName
                this.audioSrc='/api/api/archives/data/showAudio?filePath='+encodeURIComponent(this.gridData[0].filePath)
                this.picIndex=0;
                //this.picloading=false
            }
            

        },
        onloadeddata(){
            console.log('00000000000000000000000000000')
            this.picloading=false
        }
        
    }
}
</script>
<style scoped>

#tools-bar{
    padding:5px 30px;
}
.column-cell-class-name-test{
    background-color:black;

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
    width: 289px;
    border-right:darkgrey solid 1px;
    overflow:auto;
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
.input-group .input-group-item{
    display: flex;

}
.input-group-item{
    margin: 5px;
}
.input-group-item label{
    width: 75px;
}
.input-group-item input{
    flex-grow: 1;
}


</style>

