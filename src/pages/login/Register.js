import React from 'react';
import {Form, Input, Button, Col, Typography, notification, message} from 'antd';
import '../../css/style.css';
import {register} from '../../api/user'

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let registerInfo = {};
                registerInfo.username = values.username;
                registerInfo.mailaddress = values.mailaddress;
                registerInfo.password = this.$md5(values.password);
                register(registerInfo).then(res => {
                    console.log(res);
                    if(res.data.data === 'SUCCESS') {
                        notification['success']({
                            message: 'Having sent verification email',
                            description: 'Please check your email to verify your account.'
                        });
                        this.props.history.push('/arcan');
                    }else if(res.data.data === 'FAIL_MAILEXIST') {
                        message.error('This mail has existed!');
                        this.props.form.resetFields();
                    }
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Title} = Typography;
        return(
            <Col span={12} offset={6}>
                <div className='register-header'>
                    <Title>Create Your Account</Title>
                </div>
                <Form onSubmit={this.handleSubmit} layout='vertical'>
                    <Form.Item label='Username'>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: 'Please input your username'
                            }]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label='Email Address'>
                        {getFieldDecorator('mailaddress', {
                            rules: [{
                                type: 'email',
                                message: 'The input is not valid E-mail',
                            },{
                                required: true,
                                message: 'Please input your email address',
                            }]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='register-button'>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        )
    }
}

const Register = Form.create({name: 'register'})(RegistrationForm);

export default Register