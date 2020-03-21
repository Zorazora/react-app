import React from 'react';
import {Layout, Row, Col, Button, Menu, Dropdown, Icon} from 'antd';
import Logo from '../images/arcan-logo.png';
import '../css/MainLayout.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from "../store/action";

const {Header, Content, Footer} = Layout;

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    async componentDidMount() {
        console.log(this.props)
    }

    signOut() {
        this.props.logout();
    }

    render() {
        const { user, isLogging } = this.props;

        let menu = <Menu>
            <Menu.Item key='0' onClick={this.signOut}>
                Sign out
            </Menu.Item>
        </Menu>

        let Right = null;
        if(isLogging) {
            Right = <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button type='link' ghost onClick={e=>e.preventDefault()}>{user.username}<Icon type="down" /></Button>
                </Dropdown>
            </div>
        }else {
            Right = <div>
                <Button type='link' ghost><Link to={{pathname: '/login'}}>Sign in</Link></Button>
                <Button ghost><Link to={{pathname: '/arcan/register'}}>Sign up</Link></Button>
            </div>
        }

        return(
            <Layout>
                <Header className='header'>
                    <Row>
                        <Col span={6}>
                            <Button type='link' style={{width: 80, height: 60}}>
                                <Link to={{pathname: '/arcan'}}><img src={Logo} className='logo' alt='logo'/></Link>
                            </Button>
                        </Col>
                        <Col span={8} offset={10}>
                            <div className='slot'>
                                {Right}
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

const mapStateToProps = (state) => {
    // console.log('MainLayout State:', state);
    return state.user;
};

const actionCreators = {
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(MainLayout)