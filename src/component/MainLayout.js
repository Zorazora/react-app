import React from 'react';
import {Layout, Row, Col, Button} from 'antd'
import Logo from '../images/arcan-logo.png'
import '../css/MainLayout.css'
import {Link} from 'react-router-dom'

const {Header, Content, Footer} = Layout

class MainLayout extends React.Component {

    render() {
        return(
            <Layout>
                <Header className='header'>
                    <Row>
                        <Col span={6}>
                            <img src={Logo} className='logo' alt='logo'/>
                        </Col>
                        <Col span={8} offset={10}>
                            <div className='slot'>
                                <Button type='link' ghost><Link to={{pathname: '/login'}}>Sign in</Link></Button>
                                <Button ghost><Link to={{pathname: '/arcan/register'}}>Sign up</Link></Button>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', padding: 0, height: 690, marginTop: 38 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default MainLayout