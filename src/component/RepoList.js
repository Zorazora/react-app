import React from 'react';
import '../css/style.css';
import {List, Row, Col, Input, Button, Modal, Form} from 'antd';
import {getRepositoryList, createRepository} from "../api/repository";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const {Search} = Input;

class RepoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            data: []
        };
    }

    async componentDidMount() {
        this.getRepositoryList();
    };

    getRepositoryList() {
        getRepositoryList(this.props.user.token).then(res => {
            console.log(res.data.data)
            this.setState({
                data: res.data.data
            })
        });
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {
            if(!err) {
                this.setState({
                    confirmLoading: true
                });
                let repoInfo = {};
                repoInfo.userId = this.props.user.token;
                repoInfo.repoName = value.repoName;
                repoInfo.description = value.description;
                console.log(this.props)
                createRepository(repoInfo).then(res => {
                    this.getRepositoryList();
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    })
                })
            }
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    };
    render() {
        const {visible, confirmLoading, data} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='repoList'>
                <Row>
                    <Col span={18}>
                        <Search placeholder='Find a repository...'
                                onSearch={value=>console.log(value)} enterButton/>
                    </Col>
                    <Col span={3} offset={3}>
                        <Button type='primary' icon='book' onClick={this.showModal}>New</Button>
                    </Col>
                </Row>
                <List itemLayout='horizontal' dataSource={data} renderItem={item => (
                    <List.Item>
                        <Link to={{pathname: '/arcan/repository/'+item.repoId}}>
                            <List.Item.Meta title={item.repoName} description={item.description}/>
                        </Link>
                    </List.Item>
                )}>
                </List>
                <Modal title="Create a new repository" visible={visible} onOk={this.handleOk}
                       confirmLoading={confirmLoading} onCancel={this.handleCancel}>
                    <Form layout='vertical'>
                        <Form.Item label='Repository Name'>
                            {getFieldDecorator('repoName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your repository name',
                                }]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your description',
                                }]
                            })(<Input/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const RepositoryList = Form.create({name: 'repoList'})(RepoList);

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

export default connect(mapStateToProps)(RepositoryList)