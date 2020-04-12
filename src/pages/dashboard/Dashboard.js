import React from 'react';
import '../../css/style.css';
import {Col} from 'antd';
import RepoList from '../../component/RepoList';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Col span={18} offset={6}>
                    <RepoList/>
                </Col>
            </div>
        )
    }
}

export default Dashboard