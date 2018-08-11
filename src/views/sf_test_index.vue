<template>
    <div class="sf-test-wrap">
        <!-- 头部 -->
        <div class="sf-test-title">
            <span class="label">测试列表</span>
            <Tag color="warning">{{ counter }}条</Tag>
        </div>
        <!-- 表格操作 -->
        <div class="sf-test-table-operate">
            <Button type="primary" @click="openApply">申请</Button>
            <Button type="primary" @click="exportTestList">导出</Button>
        </div>
        <!-- 表格 -->
        <Table stripe :columns="testColumns" :data="testData"></Table>
        <!-- 分页 -->
        <Page class="sf-test-page" :total="counter" :current="currentPage" @on-change="getTestPage" show-total show-elevator></Page>

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
                    <DatePicker type="date" v-model="formItem.EXPECT_TIME" @on-change="getExpectTime" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
                        <Option value="-1">退回</Option>
                    </Select>
                </FormItem>
                <FormItem label="预计开始时间" prop="START_TIME">
                    <DatePicker type="date" v-model="formItem2.START_TIME" @on-change="getStartTime" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="预计完成时间" prop="END_TIME">
                    <DatePicker type="date" v-model="formItem2.END_TIME" @on-change="getEndTime" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
            <div class="sf-supply-info">
                <div v-for="supplyInfo in supplyInfos">
                    <Divider orientation="left">{{supplyInfo.CREATE_TIME}}</Divider>
                    <p>{{supplyInfo.ADD_CONTENT}}</p>
                </div>
            </div>

            <Divider orientation="left">添加补充信息</Divider>
            <!-- 新的补充信息 -->
            <Form ref="formItem3" :model="formItem3" :rules="formItem3Validate" @label-width="0">
                <FormItem prop="ADD_CONTENT">
                    <Input v-model="formItem3.ADD_CONTENT" type="textarea" :autosize="true" placeholder="输入补充信息"/>
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
            <div class="sf-supply-info">
                <div v-for="delayInfo in delayInfos">
                    <Divider orientation="left">{{delayInfo.CREATE_TIME}}</Divider>
                    <p>预计完成时间：{{delayInfo.END_TIME}}</p>
                    <p>延期理由：{{delayInfo.DELAY_REASON}}</p>
                </div>
            </div>

            <Divider orientation="left">添加延期信息</Divider>
            <!-- 延期填写延期时间 -->
            <Form ref="formItem4" :model="formItem4" :rules="formItem4Validate" :label-width="100">
                <FormItem label="预计完成时间" prop="END_TIME">
                    <DatePicker type="date" v-model="formItem4.END_TIME" @on-change="getDelayTime" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="延期理由" prop="DELAY_REASON">
                    <Input v-model="formItem4.DELAY_REASON" type="textarea" :autosize="true" placeholder="输入延期理由"/>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="updateDelay">提交</Button>
                <Button @click="reset('formItem4')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                index: 0,
                counter: 0,
                currentPage: 1,
                testColumns: [
                    {
                        title: '提交时间',
                        key: 'CREATE_TIME',
                        width: 120
                    },
                    {
                        title: '提测名称',
                        key: 'TEST_NAME',
                        width: 100
                    },
                    {
                        title: '模块',
                        key: 'MODULE_NAME',
                        width: 100
                    },
                    {
                        title: '提测内容',
                        key: 'TEST_CONTENT',
                        width: 100
                    },
                    {
                        title: '提测MD5',
                        key: 'MD5',
                        width: 100
                    },
                    {
                        title: '提测FTP',
                        key: 'FTP_URL',
                        width: 100
//                        ,
//                        render: (h, params) => {
//                            let row = params.row;
//                            let ftp_url = row.FTP_URL;
//
//                            return h('a', {
//                                domProps: {
//                                    href: global.host + 'download?' + ftp_url,
//                                    target: '_blank'
//                                }
//                            }, '下载安装包');
//                        }
                    },
                    {
                        title: '测试优先级',
                        key: 'LEVEL',
                        width: 100,
                        render: (h, params) => {
                            let row = params.row;
                            let level = row.LEVEL;

                            return h('span', global.test_level[level]);
                        }
                    },
                    {
                        title: '依赖环境',
                        key: 'DEPONDENCY',
                        width: 100
                    },
                    {
                        title: '测试开始时间',
                        key: 'START_TIME',
                        width: 120
                    },
                    {
                        title: '测试结束时间',
                        key: 'END_TIME',
                        width: 120
                    },
                    {
                        title: '任务状态',
                        key: 'STATUS',
                        width: 100,
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
                        key: 'APPLY_USER',
                        width: 100
                    },
                    {
                        title: '审核人',
                        key: 'CHECK_USER',
                        width: 100
                    },
                    {
                        title: '测试人',
                        key: 'TEST_USER',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'test_operate',
                        fixed: 'right',
                        width: 180,
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
                                                // 修改
                                                if (operates[i] === '2') {
                                                    this.reset('formItem');

                                                    this.formItem.MODULE_NAME = row.MODULE_NAME;
                                                    this.formItem.TEST_NAME = row.TEST_NAME;
                                                    this.formItem.TEST_CONTENT = row.TEST_CONTENT;
                                                    this.formItem.LEVEL = row.LEVEL + '';
                                                    this.formItem.FTP_URL = row.FTP_URL;
                                                    this.formItem.MD5 = row.MD5;
                                                    this.formItem.DEPONDENCY = row.DEPONDENCY;
                                                    this.formItem.EXPECT_TIME = row.EXPECT_TIME;

                                                    this.modal1_title = '修改申请';

                                                    // 修改所需要保留的信息
                                                    this.index = row._index;
                                                    this.formItem.TEST_PROCESS_ID = row.TEST_PROCESS_ID;

                                                    this.modal1 = true;
                                                }
                                                // 审核
                                                else if (operates[i] === '3') {
                                                    this.reset('formItem2');

//                                                  // 修改所需要保留的信息
                                                    this.index = row._index;
                                                    this.formItem2.TEST_PROCESS_ID = row.TEST_PROCESS_ID;
                                                    this['modal' + operates[i]] = true;
                                                }
                                                // 补充信息
                                                else if (operates[i] === '4') {
                                                    this.reset('formItem3');

                                                    // 获取审核信息
                                                    this.$http.get(global.host + 'test/getSupply', {params: {id: row.TEST_PROCESS_ID}}).then((response) => {
                                                        // 解析JSON
                                                        let result = response.data;
                                                        let code = result.code;
                                                        let data = result.data;

                                                        if (code == 0) {
                                                            // 初始化总量
                                                            this.supplyInfos = data;

                                                            this['modal' + operates[i]] = true;
                                                        }
                                                        this.formItem3.TEST_PROCESS_ID = row.TEST_PROCESS_ID;
                                                    })
                                                }
                                                // 延期
                                                else if (operates[i] === '5') {
                                                    this.reset('formItem4');

                                                    this.$http.get(global.host + 'test/getDelay', {params: {id: row.TEST_PROCESS_ID}}).then((response) => {
                                                        // 解析JSON
                                                        let result = response.data;
                                                        let code = result.code;
                                                        let data = result.data;

                                                        if (code == 0) {
                                                            // 初始化总量
                                                            this.delayInfos = data;

                                                            this['modal' + operates[i]] = true;
                                                        }
                                                        this.formItem4.TEST_PROCESS_ID = row.TEST_PROCESS_ID;
                                                    })
                                                }
                                                // 测试完成
                                                else if (operates[i] === '6') {
                                                    this.$http.post(global.host + 'test/testComplete', {TEST_PROCESS_ID: row.TEST_PROCESS_ID}).then((response) => {
                                                        // 解析JSON
                                                        let result = response.data;
                                                        let code = result.code;
//                                                        let data = result.data;

                                                        if (code == 0) {
                                                            this.index = row._index;
                                                            this.testData[row._index].STATUS = 2;

                                                            this.testData[row._index].test_operate = ['7', '8'];
                                                        }
                                                    })
                                                }
                                                // 查看问题
                                                else if (operates[i] === '7') {
                                                    window.open(row.JIRA_URL)
                                                }
                                                // 转更新（调用其他compent）
                                                else if (operates[i] === '8') {

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
                modal1_title: '新增申请',
                modal3: false,
                modal4: false,
                modal5: false,
                formItem: {
                    MODULE_NAME: '',
                    TEST_NAME: '',
                    TEST_CONTENT: '',
                    LEVEL: '0',
                    FTP_URL: '',
                    MD5: '',
                    DEPONDENCY: '',
                    EXPECT_TIME: '',
                    TEST_PROCESS_ID: ''
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
                        {required: true, type: 'string', message: '期望完成日期不能为空', trigger: 'change'}
                    ]
                },
                formItem2: {
                    CHECK_STATUS: '1',
                    START_TIME: '',
                    END_TIME: '',
                    TEST_USER: '',
                    JIRA_URL: '',
                    TEST_PROCESS_ID: ''
                },
                formItem2Validate: {
                    START_TIME: [
                        {required: true, type: 'string', message: '开始日期不能为空', trigger: 'blur'}
                    ],
                    END_TIME: [
                        {required: true, type: 'string', message: '结束日期不能为空', trigger: 'blur'}
                    ],
                    TEST_USER: [
                        {required: true, message: '测试人员不能为空', trigger: 'change'}
                    ],
                    JIRA_URL: [
                        {required: true, message: 'jira地址不能为空', trigger: 'blur'}
                    ]
                },
                formItem3: {
                    ADD_CONTENT: '',
                    TEST_PROCESS_ID: ''
                },
                formItem3Validate: {
                    ADD_CONTENT: [
                        {required: true, message: '补充信息不能为空', trigger: 'blur'}
                    ]
                },
                formItem4: {
                    END_TIME: '',
                    DELAY_REASON: ''
                },
                formItem4Validate: {
                    END_TIME: [
                        {required: true, type: 'string', message: '结束日期不能为空', trigger: 'change'}
                    ],
                    DELAY_REASON: [
                        {required: true, message: '延期理由不能为空', trigger: 'blur'}
                    ]
                },
                supplyInfos: [],
                delayInfos: []
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
                this.$http.get(global.host + 'test/search', {params: params}).then((response) => {
                    // 解析JSON
                    let result = response.data;
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
                    method: 'get',
                    url: global.host + 'test/exportTestList',
                    responseType: 'blob'
                }).then((res) => {
                    var blob = new Blob([res.data]); // 创建一个blob对象
                    var a = document.createElement('a'); // 创建一个<a></a>标签
                    a.href = URL.createObjectURL(blob); // response is a blob
                    a.download = "测试列表.xlsx";  // 文件名称
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                });
            },
            openApply() {
                this.modal1 = true;
                this.reset('formItem');
                this.modal1_title = '新增申请';
            },
            apply () { // 提交申请
                if (this.modal1_title == '新增申请') {
                    this.$refs['formItem'].validate((valid) => {
                        if (valid) {
                            this.$http.post(global.host + 'test/addApply', this.formItem).then((response) => {
                                let result = response.data;
                                if (result == true) {
                                    this.currentPage = 1;
                                    this.getTestPage(this.currentPage);

                                    this.modal1 = false;
                                    this.$Message.info('申请已提交，等待审核');
                                } else {
                                    this.$Message.error('申请提交异常');
                                }
                            });
                        }
                    })
                } else if (this.modal1_title == '修改申请') {
                    this.$refs['formItem'].validate((valid) => {
                        if (valid) {
                            this.$http.post(global.host + 'test/updateApply', this.formItem).then((response) => {
                                let result = response.data;
                                if (result == true) {
//                                    this.currentPage = 1;
//                                    this.getTestPage(this.currentPage);
                                    let _data = this.testData[this.index];
                                    // 修改data
                                    _data.MODULE_NAME = this.formItem.MODULE_NAME;
                                    _data.TEST_NAME = this.formItem.TEST_NAME;
                                    _data.TEST_CONTENT = this.formItem.TEST_CONTENT;
                                    _data.LEVEL = this.formItem.LEVEL;
                                    _data.FTP_URL = this.formItem.FTP_URL;
                                    _data.MD5 = this.formItem.MD5;
                                    _data.DEPONDENCY = this.formItem.DEPONDENCY;
                                    _data.EXPECT_TIME = this.formItem.EXPECT_TIME;
                                    _data.STATUS = 0;

                                    this.modal1 = false;
                                    this.$Message.info('修改完成');
                                } else {
                                    this.$Message.error('修改异常');
                                }
                            });
                        }
                    })
                }
            },
            check () { // 审核
                this.$refs['formItem2'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'test/checkTestItemInfo', this.formItem2).then((response) => {
//                            console.log(response);
                            let result = response.data;
                            let code = result.code;
                            let data = result.data;
                            if (code == 0) {
//                                console.log(this.testData[this.index]['STATUS'])
                                this.testData[this.index]['START_TIME'] = this.formItem2.START_TIME;
                                this.testData[this.index]['END_TIME'] = this.formItem2.END_TIME;
                                this.testData[this.index]['TEST_USER'] = this.formItem2.TEST_USER;
                                this.testData[this.index]['JIRA_URL'] = this.formItem2.JIRA_URL;
                                this.testData[this.index]['STATUS'] = data.CHECK_STATUS;

                                this.modal3 = false;
                                this.$Message.info('审核完成');
                            } else {
                                this.$Message.error('审核异常');
                            }
                        });
                    }
                })
            },
            updateSupply () { // 更新补充信息
                this.$refs['formItem3'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'test/addSupply', this.formItem3).then((response) => {
//                            console.log(response )
                            let result = response.data;
                            let code = result.code;
                            let data = result.data;

                            if (code == 0) {
                                // 更新补充信息框中内容
                                this.supplyInfos.push({
                                    CREATE_TIME: data.CREATE_TIME,
                                    ADD_CONTENT: this.formItem3.ADD_CONTENT
                                })

                                this.$Message.info('保存成功');
                            } else {
                                this.$Message.error('保存异常');
                            }
                        });
                    }
                })
            },
            updateDelay () {
                this.$refs['formItem4'].validate((valid) => {
                    if (valid) {
                        this.$http.post(global.host + 'test/addDelay', this.formItem4).then((response) => {
//                            console.log(response )
                            let result = response.data;
                            let code = result.code;
                            let data = result.data;

                            if (code == 0) {
                                // 更新补充信息框中内容
                                this.delayInfos.push({
                                    CREATE_TIME: data.CREATE_TIME,
                                    END_TIME: this.formItem4.END_TIME,
                                    DELAY_REASON: this.formItem4.DELAY_REASON
                                })
                                this.testData[this.index]['END_TIME'] = this.formItem4.END_TIME;

                                this.modal5 = false;
                                this.$Message.info('保存成功');
                            } else {
                                this.$Message.error('保存异常');
                            }
                        });
                    }
                })
            },
            cancel () { // 退出modal
                this.$Message.info('退出');
//                this.$refs[name].resetFields();
            },
            reset (name) { // 重置
                this.$refs[name].resetFields();
            },
            getExpectTime(e) {
                this.formItem.EXPECT_TIME = e;
            },
            getStartTime(e) {
                this.formItem2.START_TIME = e;
            },
            getEndTime(e) {
                this.formItem2.END_TIME = e;
            },
            getDelayTime(e){
                this.formItem4.END_TIME = e;
            }
        },
        created () {
            this.getTestPage(1);
//            console.log(this.$store.state.user)
//            this.testData = [
//                {
//                    submit_time: 'John Brown',
//                    test_name: 18,
//                    test_module: 'New York No. 1 Lake Park',
//                    test_content: '2016-10-03',
//                    test_MD5: '2016-10-03',
//                    test_ftp: '2016-10-03',
//                    test_priority: '2016-10-03',
//                    test_env: '2016-10-03',
//                    test_startTime: '2016-10-03',
//                    test_endTime: '2016-10-03',
//                    STATUS: '0',
//                    test_apply_user: '2016-10-03',
//                    test_verify_user: '2016-10-03',
//                    test_user: '2016-10-03',
//                    FTP_URL: '123123'
//                },
//                {
//                    submit_time: 'John Brown',
//                    test_name: 18,
//                    test_module: 'New York No. 1 Lake Park',
//                    test_content: '2016-10-03',
//                    test_MD5: '2016-10-03',
//                    test_ftp: '2016-10-03',
//                    test_priority: '2016-10-03',
//                    test_env: '2016-10-03',
//                    test_startTime: '2016-10-03',
//                    test_endTime: '2016-10-03',
//                    STATUS: '1',
//                    test_apply_user: '2016-10-03',
//                    test_verify_user: '2016-10-03',
//                    test_user: '2016-10-03',
//                    FTP_URL: 'asq'
//                }
//            ]
        }
    }
</script>

<style>
    @import '../style/sf_test_index.css';
</style>