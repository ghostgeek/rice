<template>
    <div class="sf-login" @keydown.enter="handleSubmit">
        <div class="sf-login-skin"></div>
        <div class="sf-login-wrap">
            <div class="sf-login-logo-wrap">
                <i class="sf-login-logo"></i>
                <i class="sf-login-title"></i>
            </div>
            <div class="sf-login-content">
                <Card :bordered="false" class="sf-login-card">
                    <!--<p slot="title">-->
                        <!--<Icon type="log-in"></Icon>-->
                        <!--欢迎登录-->
                    <!--</p>-->
                    <div class="sf-login-photo">
                        <div class="sf-login-photo-wrap">
                            <img src="../images/login/defaultPerson.png"/>
                        </div>
                    </div>
                    <div class="sf-form-content">
                        <Form ref="loginForm" :model="form" :rules="rules">
                            <FormItem prop="userName">
                                <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <CheckboxGroup >
                                    <Checkbox label="记住密码"></Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                            <FormItem>
                                <Button @click="handleSubmit" type="primary" long size="large">登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                console.log(1);
            }
        },
        computed: {

        }
    };
</script>

<style>
    @import '../style/sf_login.css';

    .sf-login-card {
        width: 350px;
        height: 400px;
        border-radius: 0 2px 2px 0;
    }
</style>