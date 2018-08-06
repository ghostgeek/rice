<template>
    <div class="sf-test-wrap">
        <!-- 头部 -->
        <div class="sf-test-title">
            <span class="label">测试列表</span>
            <Tag color="warning">{{ counter }}条</Tag>
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
                @on-ok="apply"
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

        <!-- 审核 -->
        <Modal
                v-model="modal审核"
                title="审核"
                @on-ok="check"
                @on-cancel="cancel">
            <Form :model="formItem2" :label-width="100">
                <FormItem label="审核结果">
                    <Select v-model="formItem2.CHECK_STATUS" placeholder="请审核">
                        <Option value="1">通过</Option>
                        <Option value="0">退回</Option>
                    </Select>
                </FormItem>
                <FormItem label="预计开始时间">
                    <DatePicker type="date" v-model="formItem2.START_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="预计完成时间">
                    <DatePicker type="date" v-model="formItem2.END_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="测试人员">
                    <Select v-model="formItem2.TEST_USER" placeholder="请选择测试人员">
                        <Option value="yhpei">裴杨华</Option>
                        <Option value="gczhang">张国才</Option>
                    </Select>
                </FormItem>
                <FormItem label="测试jira地址">
                    <Input v-model="formItem2.JIRA_URL" placeholder="请输入jira地址"></Input>
                </FormItem>
            </Form>
        </Modal>

        <!-- 补充信息 -->
        <Modal
                v-model="modal补充信息"
                title="补充信息"
                @on-ok="ok"
                @on-cancel="cancel">
            <!-- 历史补充信息 -->
            <Divider orientation="left">2018-01-12 12:12:12</Divider>
            <p>这是历史信息1</p>
            <Divider orientation="left">2018-01-12 12:11:12</Divider>
            <p>这是历史信息2</p>

            <Divider orientation="left">2018-01-12 12:11:12</Divider>
            <!-- 新的补充信息 -->
            <Input v-model="supplement" type="textarea" :autosize="true"  placeholder="Enter something..." />
            <Button type="primary">保存</Button>
        </Modal>

        <!-- 延期 -->
        <Modal
                v-model="modal延期"
                title="延期"
                @on-ok="ok"
                @on-cancel="cancel">
            <!-- 延期历史 -->

            <!-- 延期填写延期时间 -->
            <Form :model="formItem4" :label-width="100">
                <FormItem label="预计完成时间">
                    <DatePicker type="date" v-model="formItem4.END_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
                        key: 'FTP_URL',
                        render: (h, params) => {
                            let row = params.row;
                            let ftp_url = row.FTP_URL;

                            return h('a', {
                                domProps: {
                                    href: global.host + 'download?' + ftp_url,
                                    target: '_blank'
                                }
                            }, '下载安装包');
                        }
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
                        render: (h, params) => {
                            let row = params.row;
                            let status = row.STATUS;

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
                        render: (h, params) => {
                            // 依据状态字段和当前用户 获取可操作按钮
                            let user = this.$store.state.user;
                            let row = params.row;
                            let status = row.STATUS;

                            let operates = this.$lodash.intersection(user.operate, global.test_status[status].operate);
                            let operateObj = [];
                            for (let i in operates) {
                                operateObj.push(
                                    h('a', {
                                        domProps: {
                                            className: 'test-operate-menu'
                                        },
                                        on: {
                                            click: () => {
                                                // 跳转
//                                                console.log(operates[i]);
                                                this['modal' + operates[i]] = true
                                            }
                                        }
                                    }, operates[i])
                                )
                            }

                            return h('div', operateObj);
                        }
                    }
                ],
                testData: [],
                modal1: false, // 弹框默认不显示
                'modal审核': false,
                'modal补充信息': false,
                'modal延期': false,
                formItem: {
                    MODULE_NAME: '',
                    TEST_NAME: '',
                    TEST_CONTENT: '',
                    LEVEL: '',
                    FTP_URL: '',
                    MD5: '',
                    DEPONDENCY: '',
                    EXPECT_TIME: ''
                },
                formItem2: {
                    CHECK_STATUS: '',
                    START_TIME: '',
                    END_TIME: '',
                    TEST_USER: '',
                    JIRA_URL: ''
                },
                formItem4: {
                    END_TIME: ''
                },
                supplement: ''
            }
        },
        methods: {
            ok () {

            },
            apply () {
                // form表单提交
                this.$http.post(global.host + 'addApply', this.formItem).then((response) => {
                    if (response == true) {
                        this.$Message.info('申请已提交，等待审核');
                    } else {
                        this.$Message.error('申请提交异常');
                    }
                });
            },
            check () {
                // form表单提交
                this.$http.post(global.host + 'checkTestItemInfo', this.formItem).then((response) => {
                    if (response == true) {
                        this.$Message.info('审核完成');
                    } else {
                        this.$Message.error('审核异常');
                    }
                });
            },
            cancel () {
                this.$Message.info('退出申请');
            },
            getTestPage(currentPageNo) {
                // 分页加载数据
                let params = {
                    token: this.$store.state.token,
                    pageNo: currentPageNo,
                    pageSize: 10
                }

                // 获取表格数据
                this.$http.post(global.host + 'getTestPage', params).then((response) => {
                    // 解析JSON
                    let result = JSON.parse(response);
                    let code = result.code;
                    let data = result.data;

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
            console.log(this.$store.state.user)
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
                    FTP_URL: '123123'
                },
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
                    STATUS: '1',
                    test_apply_user: '2016-10-03',
                    test_verify_user: '2016-10-03',
                    test_user: '2016-10-03',
                    FTP_URL: 'asq'
                }
            ]
        }
    }
</script>

<style>
    @import '../style/sf_test_index.css';
</style>