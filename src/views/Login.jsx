import { Button, Form, Input, message } from "antd";
import React from "react";
import './Login.less';
import api from "../api";
import _ from '../assets/utils.js';
import { connect } from 'react-redux';
import action from "../store/action";

const validate = {
    phone(_, value) {
        value = value.trim();
        let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
        if (value.length === 0) return Promise.reject(new Error('手机号是必填项'));
        // 正则校验
        if (!reg.test(value)) return Promise.reject(new Error('手机号格式错误'));
        return Promise.resolve();
    },
}

const Login = function Login(props) {

    console.log(props);
    let { usp, navigate, queryUserInfoAsync } = props;
    // console.log(usp.get('from'))

    /* useForm 返回的是一个数组 */
    const [form] = Form.useForm();

    /* 登录按钮的点击效果 */
    const Login = async () => {
        try {
            /* 对表单进行验证 */
            await form.validateFields();
            /* 获取到表单信息 */
            let { phone, password } = form.getFieldsValue();
            let { code, token } = await api.login(phone, password);
            if (+code !== 200) {
                message.error('账号或密码错误，请重新输入');
                form.resetFields();
                return;
            }
            /* 登录成功 */
            _.storage.set('tk', token);
            await queryUserInfoAsync(); // 派发任务 同步登陆者信息
            message.success('登录成功')
            let to = usp.get('to');
            to ? navigate(to, { replace: true }) : navigate(-1);

        } catch (_) { };
    }



    return <div className="login-box">

        <div className="input-body">
            <div className="login-header">
                密码登录
            </div>
            <Form initialValues={{ phone: '', password: '' }} form={form}>
                <Form.Item name='phone' rules={[{
                    validator: validate.phone
                }]}>
                    <Input placeholder="请输入电话号码" style={{ height: '50px' }} />
                </Form.Item>
                <Form.Item name='password' rules={[{
                    required: true,
                    message: '密码不能为空',
                }]}>
                    <Input placeholder="请输入密码" type="password" allowClear />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={Login}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
};

export default connect(
    null,
    action.base
)(Login);