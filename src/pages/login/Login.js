import React from 'react';
import '../../css/style.css';
import Logo from '../../images/arcan-logo.png';
import {Typography, Card, Col, Form, Input, Button, Alert, message} from 'antd';
import {Link} from 'react-router-dom';
import {signIn, resendMail} from "../../api/user";
import {notification} from "antd/lib/index";

const {Title} = Typography;

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
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
      alertType: ''
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, value) => {
         if(!err) {
             let loginInfo = {};
             loginInfo.mailaddress = value.mailaddress;
             loginInfo.password = this.$md5(value.password);
             signIn(loginInfo).then(res => {
                 console.log(res)
                 if(res.data.data === 'SUCCESS') {
                     this.props.history.push('/arcan');
                 }else if(res.data.data === 'FAIL_WRONG') {
                     this.setState({
                         alertType: 'wrong'
                     });
                     this.props.form.resetFields();
                 }else if(res.data.data === 'FAIL_UNACTIVATE') {
                     this.setState({
                         alertType: 'unactivated'
                     });
                 }
             })
         }
      });
    };

    handleClick() {
        this.props.form.validateFieldsAndScroll((err, value) => {
            if(!err) {
                let sendInfo = {};
                sendInfo.mailaddress = value.mailaddress;
                resendMail(sendInfo).then(res => {
                    console.log(res.data.data)
                    if(res.data.data === true) {
                        notification['success']({
                            message: 'Having sent verification email',
                            description: 'Please check your email to verify your account.'
                        });
                        this.props.history.push('/arcan');
                    }else {
                        message.error('This email has not existed!');
                        this.props.form.resetFields();
                    }
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        let DOM = null;
        if(this.state.alertType === 'wrong') {
            DOM = <Alert message="Your email or password is wrong!" type="error" closeText="Close Now"/>
        }else if(this.state.alertType === 'unactivated') {
            DOM = <div>
                <Alert message="Your email has not been activated!" type="warning" closeText="Close Now"/>
                <Button type="link" block onClick={this.handleClick}>
                    Resend Verification Email
                </Button>
            </div>
        }else {
            DOM = <div></div>
        }

        return(
            <Col span={6} offset={9}>
                <LoginHeader/>
                {DOM}
                <Card className='login-card'>
                    <Form onSubmit={this.handleSubmit} layout='vertical'>
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
