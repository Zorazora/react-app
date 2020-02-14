import React from 'react';
import {Layout} from 'antd'

const {Header, Content, Footer} = Layout

class MainLayout extends React.Component {

    render() {
        return(
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}/>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 680, marginTop: 38 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default MainLayout