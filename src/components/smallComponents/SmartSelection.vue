<template>
    <Select v-model="rowData.quoteCss" @on-change="update(1,2)">
        <Option v-for="item in selectionList" :value="item.value" :key="item.id">{{ item.value }}</Option>
    </Select>
</template>

<script>
export default {
    name:"SmartSelection",
    data () {
        return {
            selectionList:[
                {id:0,value:"10年"},
                {id:1,value:"30年"},
                {id:2,value:"短期"},
                {id:3,value:"长期"},
                {id:4,value:"永久"},

            ]
        }
    }
}
</script>

<style>
    
</style>

