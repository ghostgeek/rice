<template>
    <div class="sf-test-wrap">
        <Button type="primary">申请</Button>
        <Button type="primary">导出</Button>
        <Table stripe :columns="columns1" :data="data1"></Table>

        <Page :total="100" show-total show-elevator></Page>
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
                data1: [
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
            }
        }
    }

</script>