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
            <Button type="primary" @click="exportTestList">导出</Button>
        </div>
        <!-- 表格 -->
        <Table stripe :columns="testColumns" :data="testData"></Table>
        <!-- 分页 -->
        <Page class="sf-test-page" :total="counter" @on-change="getTestPage" show-total show-elevator></Page>

        <!-- 申请/修改 -->
        <Modal
                v-model="modal1"
                :title="modal1_title">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <FormItem label="模块" prop="MODULE_NAME">
                    <Select v-model="formItem.MODULE_NAME" placeholder="请选择模块">
                        <Option value="beijing">模块1</Option>
                        <Option value="shanghai">模块2</Option>
                        <Option value="shenzhen">模块3</Option>
                    </Select>
                </FormItem>
                <FormItem label="提测名称" prop="TEST_NAME">
                    <Input v-model="formItem.TEST_NAME" placeholder="请输入提测名称"></Input>
                </FormItem>
                <FormItem label="提测内容" prop="TEST_CONTENT">
                    <Input v-model="formItem.TEST_CONTENT" placeholder="请输入提测内容"></Input>
                </FormItem>
                <FormItem label="提测优先级">
                    <Select v-model="formItem.LEVEL" placeholder="请选择优先级">
                        <Option value="1">高</Option>
                        <Option value="0">低</Option>
                    </Select>
                </FormItem>
                <FormItem label="提测包路径" prop="FTP_URL">
                    <Input v-model="formItem.FTP_URL" placeholder="请输入提测包路径"></Input>
                </FormItem>
                <FormItem label="提测MD5" prop="MD5">
                    <Input v-model="formItem.MD5" placeholder="请输入提测MD5"></Input>
                </FormItem>
                <FormItem label="依赖环境" prop="DEPONDENCY">
                    <Input v-model="formItem.DEPONDENCY" placeholder="请输入依赖环境"></Input>
                </FormItem>
                <FormItem label="期望完成日期" prop="EXPECT_TIME">
                    <DatePicker type="date" v-model="formItem.EXPECT_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="apply">提交</Button>
                <Button @click="reset('formItem')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <!-- 审核 -->
        <Modal
                v-model="modal3"
                title="审核">
            <Form ref="formItem2" :model="formItem2" :rules="formItem2Validate" :label-width="100">
                <FormItem label="审核结果">
                    <Select v-model="formItem2.CHECK_STATUS" placeholder="请审核">
                        <Option value="1">通过</Option>
                        <Option value="0">退回</Option>
                    </Select>
                </FormItem>
                <FormItem label="预计开始时间" prop="START_TIME">
                    <DatePicker type="date" v-model="formItem2.START_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="预计完成时间" prop="END_TIME">
                    <DatePicker type="date" v-model="formItem2.END_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="测试人员" prop="TEST_USER">
                    <Select v-model="formItem2.TEST_USER" placeholder="请选择测试人员">
                        <Option value="yhpei">裴杨华</Option>
                        <Option value="gczhang">张国才</Option>
                    </Select>
                </FormItem>
                <FormItem label="测试jira地址" prop="JIRA_URL">
                    <Input v-model="formItem2.JIRA_URL" placeholder="请输入jira地址"></Input>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="check">提交</Button>
                <Button @click="reset('formItem2')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <!-- 补充信息 -->
        <Modal
                v-model="modal4"
                title="补充信息" footer-hide>
            <!-- 历史补充信息 -->
            <div v-for="supplyInfo in supplyInfos">
                <Divider orientation="left">supplyInfo.time</Divider>
                <p>supplyInfo.content</p>
            </div>

            <Divider orientation="left">添加补充信息</Divider>
            <!-- 新的补充信息 -->
            <Form :model="formItem3" @label-width="0">
                <FormItem>
                    <Input v-model="formItem3.SUPPLY" type="textarea" :autosize="true" placeholder="输入补充信息"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="updateSupply">保存</Button>
                </FormItem>
            </Form>
        </Modal>

        <!-- 延期 -->
        <Modal
                v-model="modal5"
                title="延期">
            <!-- 延期历史 -->

            <!-- 延期填写延期时间 -->
            <Form :model="formItem4" :label-width="100">
                <FormItem label="预计完成时间">
                    <DatePicker type="date" v-model="formItem4.END_TIME" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="ok">提交</Button>
                <Button @click="reset('formItem4')" style="margin-left: 8px">重置</Button>
            </div>
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
                                // 如果是修改，也调用申请弹框，但是设置默认值
                                operateObj.push(
                                    h('a', {
                                        domProps: {
                                            className: 'test-operate-menu'
                                        },
                                        on: {
                                            click: () => {
                                                if (operates[i] === '2') {
                                                    this.formItem.MODULE_NAME = row.MODULE_NAME;
                                                    this.formItem.TEST_NAME = row.TEST_NAME;
                                                    this.formItem.TEST_CONTENT = row.TEST_CONTENT;
                                                    this.formItem.LEVEL = row.LEVEL;
                                                    this.formItem.FTP_URL = row.FTP_URL;
                                                    this.formItem.MD5 = row.MD5;
                                                    this.formItem.DEPONDENCY = row.DEPONDENCY;
                                                    this.formItem.EXPECT_TIME = row.EXPECT_TIME;

                                                    this.modal1_title = '修改申请';

                                                    this.modal1 = true;
                                                } else if (operates[i] === '4'){
                                                    // 获取审核信息
                                                    this.$http.get(global.host + 'getSupply', {testId: ''}).then((response) => {
                                                        // 解析JSON
                                                        let result = JSON.parse(response);
                                                        let code = result.code;
                                                        let data = result.data;

                                                        if (code == 0) {
                                                            // 初始化总量
                                                            this.supplyInfos = data;
                                                        }
                                                    })
                                                } else {
                                                    this['modal' + operates[i]] = true;
                                                }
                                            }
                                        }
                                    }, global.test_operate[operates[i]])
                                )
                            }

                            return h('div', operateObj);
                        }
                    }
                ],
                testData: [],
                modal1: false, // 弹框默认不显示
                modal1_title: '提交申请',
                modal3: false,
                modal4: false,
                modal5: false,
                formItem: {
                    MD5MODULE_NAME: '',
                    TEST_NAME: '',
                    TEST_CONTENT: '',
                    LEVEL: '0',
                    FTP_URL: '',
                    MD5: '',
                    DEPONDENCY: '',
                    EXPECT_TIME: ''
                },
                ruleValidate: {
                    MODULE_NAME: [
                        {required: true, message: '模块不能为空', trigger: 'change'}
                    ],
                    TEST_NAME: [
                        {required: true, message: '提测名称不能为空', trigger: 'blur'}
                    ],
                    TEST_CONTENT: [
                        {required: true, message: '提测内容不能为空', trigger: 'blur'}
                    ],
                    FTP_URL: [
                        {required: true, message: '提测包路径不能为空', trigger: 'blur'}
                    ],
                    MD5: [
                        {required: true, message: '提测MD5不能为空', trigger: 'blur'}
                    ],
                    DEPONDENCY: [
                        {required: true, message: '请输入依赖环境不能为空', trigger: 'blur'}
                    ],
                    EXPECT_TIME: [
                        {required: true, type: 'date', message: '期望完成日期不能为空', trigger: 'change'}
                    ]
                },
                formItem2: {
                    CHECK_STATUS: '1',
                    START_TIME: '',
                    END_TIME: '',
                    TEST_USER: '',
                    JIRA_URL: ''
                },
                formItem2Validate: {
                    START_TIME: [
                        {required: true, type: 'date', message: '开始日期不能为空', trigger: 'change'}
                    ],
                    END_TIME: [
                        {required: true, type: 'date', message: '结束日期不能为空', trigger: 'change'}
                    ],
                    TEST_USER: [
                        {required: true, message: '测试人员不能为空', trigger: 'change'}
                    ],
                    JIRA_URL: [
                        {required: true, message: 'jira地址不能为空', trigger: 'blur'}
                    ]
                },
                formItem3: {
                    SUPPLY: ''
                },
                formItem4: {
                    END_TIME: ''
                },
                supplyInfos: []
            }
        },
        methods: {
            getTestPage (currentPageNo) { // 获取表格数据
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
                        this.testData = data.list;
                    }
                })
            },
            exportTestList () {
                this.$http({
                    method: 'post',
                    url: global.host + 'exportTestList',
                    responseType: 'blob',
                    success: (req, res) => {
                        var blob = new Blob([res.json()]); // 创建一个blob对象
                        var a = document.createElement('a'); // 创建一个<a></a>标签
                        a.href = URL.createObjectURL(blob); // response is a blob
                        a.download = "测试列表.xlsx";  // 文件名称
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                });
            },
            apply () { // 提交申请
                // 校验
                this.$refs['formItem'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'addApply', this.formItem).then((response) => {
                            if (response == true) {
                                getTestPage(1);

                                this.$Message.info('申请已提交，等待审核');
                            } else {
                                this.$Message.error('申请提交异常');
                            }
                        });
                    }
                })
            },
            check () { // 审核
                // 校验
                this.$refs['formItem2'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'checkTestItemInfo', this.formItem2).then((response) => {
                            if (response == true) {
                                this.$Message.info('审核完成');
                            } else {
                                this.$Message.error('审核异常');
                            }
                        });
                    }
                })
            },
            updateSupply () { // 更新补充信息
                // 校验
                this.$refs['formItem3'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'addSupply', this.formItem3).then((response) => {
                            if (response == true) {
                                // 更新补充信息框中内容
                                this.supplyInfos.push({
                                    CREATE_TIME: new Date(), // TODO 时间获取
                                    ADD_CONTENT: this.formItem3.SUPPLY
                                })

                            } else {
                                this.$Message.error('审核异常');
                            }
                        });
                    }
                })
            },
            ok () {

            },
            cancel () { // 退出modal
                this.$Message.info('退出');
//                this.$refs[name].resetFields();
            },
            reset (name) { // 重置
                this.$refs[name].resetFields();
            }
        },
        created () {
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