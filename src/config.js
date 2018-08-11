/**
 * Created by xp on 2018/8/4.
 *
 * webpack有global关键词，用来创建全局变量
 */
global.host = 'http://192.168.2.116:8080/api/';

// 测试状态
global.test_status = {
    '0': {
        name: '待审核',
        color: '#f24586',
        operate: ['2', '3']
    },
    '1': {
        name: '测试中',
        color: '#fe7f55',
        operate: ['4', '5', '6', '7']
    },
    '2': {
        name: '测试完成',
        color: '#60d5a5',
        operate: ['7', '8']
    },
    '-1': {
        name: '退回',
        color: '#3d99f7',
        operate: ['2']
    }
}

global.test_level = {
    '0': '低',
    '1': '高'
}

global.test_operate = {
    '0': '',
    '1': '',
    '2': '修改',
    '3': '审核',
    '4': '补充信息',
    '5': '延期',
    '6': '测试完成',
    '7': '查看问题',
    '8': '转更新'
}