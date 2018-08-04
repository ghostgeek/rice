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
        color: '#f24586'
    },
    '1': {
        name: '测试中',
        color: 'fe7f55'
    },
    '2': {
        name: '测试完成',
        color: '60d5a5'
    },
    '-1': {
        name: '退回',
        color: '3d99f7'
    }
}

global.test_operate = {

}