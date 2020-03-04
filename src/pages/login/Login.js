import React from 'react'
import '../../css/style.css'
import Logo from '../../images/arcan-logo.png'
import {Typography, Card, Col, Form, Input, Button} from 'antd'
import {Link} from 'react-router-dom'

const {Title} = Typography

function LoginHeader() {
    return(
        <div className='login-header'>
            <img src={Logo} className='logo' alt='logo'/>
            <Title level={2} style={{marginTop: 30}}>Sign in to Arcan</Title>
        </div>
    )
}

function LoginFooter() {
    return(
        <div className='login-footer-card'>
            New to Arcan? <Link to={{pathname: '/arcan/register'}}>Create an account.</Link>
        </div>
    )
}

class LoginForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Col span={6} offset={9}>
                <LoginHeader/>
                <Card className='login-card'>
                    <Form layout='vertical'>
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
                                    }
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='register-button'>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <LoginFooter/>
            </Col>
        )
    }
}

const Login = Form.create({name: 'login'})(LoginForm);

export default Login
