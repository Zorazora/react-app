import React from 'react';
import {Upload, Button, Icon, message, Row, Col} from 'antd';
import {uploadZip, analysis, getRepositoryProject} from "../../api/repository";
import "../../css/style.css"

class UploadProject extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        repoId: '',
        status: '',
        projectInfo: {},
        name: ''
    };

    async componentDidMount() {
        this.setState({
            repoId: this.props.match.params.repoId
        });
        this.getRepositoryProject(this.props.match.params.repoId);
    }

    getRepositoryProject(repoId) {
        getRepositoryProject(repoId).then(res => {
            this.setState({
                status: res.data.status,
                projectInfo: res.data.data,
            });
            if (res.data.status !== 'CREATED') {
                this.setState({
                    name: res.data.name
                });
            }
        })
    }

    handleUpload = () => {
        const { fileList, repoId } = this.state;
        const formData = new FormData();
        fileList.forEach( file => {
            formData.append('file', file);
        });

        this.setState({
            uploading: true,
        });

        uploadZip(formData, repoId).then(data => {
            this.setState({
                fileList: [],
                uploading: false,
            });
            this.getRepositoryProject(repoId);
            message.success('upload successfully.');
        }).catch(err => {
            this.setState({
                uploading: false,
            });
            message.error('upload failed.');
        })
    };

    analysis = () => {
        const { repoId, projectInfo} = this.state;
        let info = {};
        info.repoId = repoId;
        info.projectId = projectInfo.projectId;
        analysis(info).then(res => {

        });
    };

    render() {
        const { uploading, fileList, status, projectInfo, name} = this.state;

        const uploadProps = {
            onRemove: file => {
                console.log(file)
                // this.setState(state => ({
                //     fileList: [...state.fileList.slice(state.fileList.indexOf(file), 1).slice()]
                // }));
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
                console.log(this.state);
            },
            beforeUpload: file => {
                if (this.state.fileList.length === 0) {
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }));
                }else {
                    message.error('You can only upload one project!');
                    this.setState(state => ({
                        fileList: [...state.fileList]
                    }));
                }
                return false;
            },
            fileList,
            accept: '.zip',
            multiple: false,
        };
        let TopButton = null;
        if (status === 'CREATED') {
            TopButton = <div>
                <Row gutter={[0,24]}>
                    <Col span={3}>
                        <p className='form-text'>Select Project</p>
                    </Col>
                    <Col span={5}>
                        <Upload {...uploadProps}>
                            <Button size='small' type='primary'>
                                Select
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={16}>
                        <Button size='small' type='primary' onClick={this.handleUpload}
                                disabled={fileList.length === 0} loading={uploading}>
                            <Icon type='upload'/>
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Col>
                </Row>
            </div>
        }else if (status === 'UPLOADED') {
            TopButton = <div>
                <Row gutter={[0,24]}>
                    <Col span={3}>
                        <p className='form-text'>Selected Project</p>
                    </Col>
                    <Col span={5}>
                        <p className='title-text'>{name}</p>
                    </Col>
                    <Col span={5}>
                        <Upload {...uploadProps}>
                            <Button type='link'>
                                Reselect
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={11}>
                        <Button size='small' type='primary' onClick={this.handleUpload}
                                disabled={fileList.length === 0} loading={uploading}>
                            <Icon type='upload'/>
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Col>
                </Row>
            </div>
        }

        let AnalysisButton = <div>
            <Row>
                <Button size='small' type='primary' onClick={this.analysis}>
                    Analysis
                </Button>
            </Row>
        </div>
        return (
            <div style={{margin: 30, padding: 30}}>
                {TopButton}
                {AnalysisButton}
            </div>
        )
    }
}

export default UploadProject