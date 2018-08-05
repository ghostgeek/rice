/**
 * Created by xp on 2018/8/4.
 *
 * webpack有global关键词，用来创建全局变量
 */
global.host = 'http://127.0.0.1:8080/pdmd/';

// 测试状态
global.test_status = {
    '0': {
        name: '待审核',
        color: '#f24586',
        operate: ['修改', '审核']
    },
    '1': {
        name: '测试中',
        color: '#fe7f55',
        operate: ['补充信息', '延期', '测试完成', '查看问题']
    },
    '2': {
        name: '测试完成',
        color: '#60d5a5',
        operate: ['转更新', '查看问题']
    },
    '-1': {
        name: '退回',
        color: '#3d99f7',
        operate: ['修改']
    }
}