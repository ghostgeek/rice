<template>
    <div class="sf-test-wrap">
        <!-- 头部 -->
        <div class="sf-test-title">
            <span class="label">测试列表</span>
            <Tag color="yellow">{{ counter }}条</Tag>
        </div>
        <!-- 表格操作 -->
        <div class="sf-test-table-operate">
            <Button type="primary" @click="modal1 = true">申请</Button>
            <Button type="primary">导出</Button>
        </div>
        <!-- 表格 -->
        <Table stripe :columns="testColumns" :data="testData"></Table>
        <!-- 分页 -->
        <Page class="sf-test-page" :total="counter" @on-change="getTestPage" show-total show-elevator></Page>

        <!-- 申请 -->
        <Modal
                v-model="modal1"
                title="添加申请"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="100">
                <FormItem label="模块">
                    <Select v-model="formItem.MODULE_NAME" placeholder="请选择模块">
                        <Option value="beijing">模块1</Option>
                        <Option value="shanghai">模块2</Option>
                        <Option value="shenzhen">模块3</Option>
                    </Select>
                </FormItem>
                <FormItem label="提测名称">
                    <Input v-model="formItem.TEST_NAME" placeholder="请输入提测名称"></Input>
                </FormItem>
                <FormItem label="提测内容">
                    <Input v-model="formItem.TEST_CONTENT" placeholder="请输入提测内容"></Input>
                </FormItem>
                <FormItem label="提测优先级">
                    <Select v-model="formItem.LEVEL" placeholder="请选择优先级菜单">
                        <Option value="1">高</Option>
                        <Option value="0">低</Option>
                    </Select>
                </FormItem>
                <FormItem label="提测包FTP路径">
                    <Input v-model="formItem.FTP_URL" placeholder="请输入提测FTP路径"></Input>
                </FormItem>
                <FormItem label="提测MD5">
                    <Input v-model="formItem.MD5" placeholder="请输入提测MD5"></Input>
                </FormItem>
                <FormItem label="依赖环境">
                    <Input v-model="formItem.DEPONDENCY" placeholder="请输入依赖环境"></Input>
                </FormItem>
                <FormItem label="期望完成日期">
                    <DatePicker type="date" v-model="formItem.EXPECT_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                counter: 0,
                testColumns: [
                    {
                        title: '提交时间',
                        key: 'CREATE_TIME'
                    },
                    {
                        title: '提测名称',
                        key: 'TEST_NAME'
                    },
                    {
                        title: '模块',
                        key: 'MODULE_NAME'
                    },
                    {
                        title: '提测内容',
                        key: 'TEST_CONTENT'
                    },
                    {
                        title: '提测MD5',
                        key: 'MD5'
                    },
                    {
                        title: '提测FTP',
                        key: 'FTP_URL'
                    },
                    {
                        title: '测试优先级',
                        key: 'LEVEL'
                    },
                    {
                        title: '依赖环境',
                        key: 'DEPONDENCY'
                    },
                    {
                        title: '测试开始时间',
                        key: 'START_TIME'
                    },
                    {
                        title: '测试结束时间',
                        key: 'END_TIME'
                    },
                    {
                        title: '任务状态',
                        key: 'STATUS',
                        render: function (h, params) {
                            var row = params.row;
                            var status = row.STATUS;

                            return h('Tag', {
                                props: {
                                    color: global.test_status[status].color
                                },
                            }, global.test_status[status].name);

                        }
                    },
                    {
                        title: '申请人',
                        key: 'APPLY_USER'
                    },
                    {
                        title: '审核人',
                        key: 'CHECK_USER'
                    },
                    {
                        title: '测试人',
                        key: 'TEST_USER'
                    },
                    {
                        title: '操作',
                        key: 'test_operate',
                        render: function (h, params) {
                            // 依据状态字段和当前用户 获取可操作按钮 todo 和国才商定下
                            var row = params.row;
                            var test_operate = row.test_operate;
                            var status = row.STATUS;

                            return h('div', [
                                h('a', {
                                    props: {},
                                    on: {
                                        click: () => {
                                            // 跳转
                                            console.log('a');
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                testData: [],
                modal1: false,
                formItem: {
                    MODULE_NAME: '',
                    TEST_NAME: '',
                    TEST_CONTENT: '',
                    LEVEL: '',
                    FTP_URL: '',
                    MD5: '',
                    DEPONDENCY: '',
                    EXPECT_TIME: ''
                }
            }
        },
        methods: {
            ok () {
                // form表单提交
                this.$http.post(this.serverName + 'addApply', this.formItem).then((response) => {
                    if (response == true) {
                        this.$Message.info('申请已提交，等待审核');
                    } else {
                        this.$Message.error('申请提交失败');
                    }
                });
            },
            cancel () {
                this.$Message.info('退出申请');
            },
            getTestPage(currentPageNo) {
                // 分页加载数据
                var params = {
                    token: this.$store.state.token,
                    pageNo: currentPageNo,
                    pageSize: 10
                }

                // 获取表格数据
                this.$http.post(this.serverName + 'getTestPage', params).then((response) => {
                    // 解析JSON
                    var result = JSON.parse(response);
                    var code = result.code;
                    var data = result.data;

                    if (code == 0) {
                        // 初始化总量
                        this.counter = data.total.total;

                        // 初识化表格数据
                        this.data1 = data.list;
                    }
                })
            }
        },
        created() {
//            this.getTestPage(1);
            console.log(global.host)
            this.testData = [
                {
                    submit_time: 'John Brown',
                    test_name: 18,
                    test_module: 'New York No. 1 Lake Park',
                    test_content: '2016-10-03',
                    test_MD5: '2016-10-03',
                    test_ftp: '2016-10-03',
                    test_priority: '2016-10-03',
                    test_env: '2016-10-03',
                    test_startTime: '2016-10-03',
                    test_endTime: '2016-10-03',
                    STATUS: '0',
                    test_apply_user: '2016-10-03',
                    test_verify_user: '2016-10-03',
                    test_user: '2016-10-03',
                    test_operate: 'update check'
                }
            ]
        }
    }
</script>

<style>
    @import '../style/sf_test_index.css';
</style>