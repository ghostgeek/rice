<template>
    <div class="sf-test-wrap">
        <!-- 头部 -->
        <div class="sf-test-title">
            <span class="label">更新列表</span>
            <Tag checkable color="yellow">{{ counter }}条</Tag>
        </div>
        <!-- 表格操作 -->
        <div class="sf-test-table-operate">
            <Button type="primary" @click="modal1 = true">申请</Button>
            <Button type="primary">导出</Button>
        </div>
        <!-- 表格 -->
        <Table stripe :columns="columns1" :data="data1"></Table>
        <!-- 分页 -->
        <Page class="sf-test-page" :total="100" show-total show-elevator></Page>

        <Modal
                v-model="modal1"
                title="添加申请"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="100">
                <FormItem label="模块">
                    <Select v-model="formItem.select">
                        <Option value="beijing">模块1</Option>
                        <Option value="shanghai">模块2</Option>
                        <Option value="shenzhen">模块3</Option>
                    </Select>
                </FormItem>
                <FormItem label="提测名称">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="提测MD5">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="提测包FTP路径">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="提测优先级">
                    <Select v-model="formItem.select">
                        <Option value="beijing">高</Option>
                        <Option value="shanghai">低</Option>
                    </Select>
                </FormItem>
                <FormItem label="依赖环境">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="提测内容">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="期望完成日期">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        created() {
//            this.$http.post('http://www.baidu.com', {}).then((response)=> {

                // 初始化数据
                this.counter = 23

                // 初识化表格
                this.data1 = [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]

//            })
        },
        data () {
            return {
                counter: 0,
                columns1: [
                    {
                        title: '提交时间',
                        key: 'name'
                    },
                    {
                        title: '任务名称',
                        key: 'age'
                    },
                    {
                        title: '模块',
                        key: 'address'
                    },
                    {
                        title: '内容',
                        key: 'address'
                    },
                    {
                        title: '附件',
                        key: 'address'
                    },
                    {
                        title: '开始时间',
                        key: 'address'
                    },
                    {
                        title: '结束时间',
                        key: 'address'
                    },
                    {
                        title: '任务状况',
                        key: 'address'
                    },
                    {
                        title: '申请人',
                        key: 'address'
                    },
                    {
                        title: '测试人',
                        key: 'address'
                    },
                    {
                        title: '审核人',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'address'
                    }
                ],
                data1: [],
                modal1: false,
                formItem: {
                    input: '',
                    select: ''
                }
            }
        },
        methods: {
            ok () {
                // form表单提交

                this.$Message.info('申请已提交，等待审核');
            },
            cancel () {
                this.$Message.info('退出申请');
            }
        }
    }



</script>

<style>
    @import '../style/sf_test_index.css';
</style>