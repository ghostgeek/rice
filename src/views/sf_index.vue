<template>
    <!-- 头部 -->
    <div class="container">
        <ul>
            <li>
                <router-link to="/testIndex">测试流程管理</router-link>
                <router-link to="/updateIndex">更新流程管理</router-link>
            </li>
        </ul>

        <!-- 子页面各个模块 -->
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>