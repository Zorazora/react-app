import React from 'react';
import {Upload, Button, Icon, message, Row, Col, Input} from 'antd';
import {uploadZip, analysis, getRepositoryProject, testExist,analysisGithubProject} from "../../api/repository";
import "../../css/style.css"

class UploadProject extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        repoId: '',
        status: '',
        projectInfo: {},
        name: '',
        githubAddress: '',
        test: false
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

    testExist = (address) => {
        let info = {};
        info.githubAddress = address;
        testExist(info).then(res => {
            console.log(res);
            this.setState({
                githubAddress:address
            });
            this.setState({
                test: res.data.success
            });
        });
    }

    analysisGithubProject = (address) =>  {
        const { repoId,githubAddress} = this.state;
        let info = {};
        info.githubAddress = githubAddress;
        info.repoId = repoId;
        analysisGithubProject(info).then(res => {
            console.log(res);
        });
    }

    render() {
        const { uploading, fileList, status, projectInfo, name, githubAddress,test} = this.state;
        const { Search } = Input;

        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1805017_d3im7hiwj18.js',
        });

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
                <Row gutter={3}>
                    <Col span={3}>
                        <p className='form-text'>Select Project</p>
                    </Col>
                    <Col span={8}>
                        <Upload {...uploadProps}>
                            <Button size='small' type='primary'>
                                Select
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={13}>
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
                <Row gutter={3}>
                    <Col span={3}>
                        <p className='form-text'>Selected Project</p>
                    </Col>
                    <Col span={5}>
                        <p className='title-text'>{name}</p>
                    </Col>
                    <Col span={8}>
                        <Upload {...uploadProps}>
                            <Button type='link'>
                                Reselect from local
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={8}>
                        <Button size='small' type='primary' onClick={this.handleUpload}
                                disabled={fileList.length === 0} loading={uploading}>
                            <Icon type='upload'/>
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Col>
                </Row>
            </div>
        }

        let AnalysisButton = null;
        if (status === 'CREATED') {
            AnalysisButton = <div>
                <Row gutter={3}>
                    <Col span={3}></Col>
                    <Col span={8}>
                        <div>Select from github</div>
                    </Col>
                    <Col span={8}>
                        <Button size='small' type='primary' onClick={this.analysis}>
                            Analysis
                        </Button>
                    </Col>
                </Row>
            </div>
        }else if (status === 'UPLOADED') {
            AnalysisButton = <div>
                <Row gutter={3}>
                    <Col span={3}></Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <div className="github-text">Reselect from github</div>
                    </Col>
                    <Col span={8}>
                        <Button size='small' type='primary' onClick={this.analysis}>
                            Analysis
                        </Button>
                    </Col>
                </Row>
            </div>
        }


        let GithubInputBox = null;
        if (status === 'CREATED'){
            GithubInputBox = <div>
                <Row>
                    <Col span={3}></Col>
                    <Col span={8} className="github-textCreated">
                        <Search
                            placeholder="input search text"
                            onSearch={value => this.testExist(value)}
                            style={{ width: 300 }}
                        />
                    </Col>
                </Row>
            </div>
        }else if (status === 'UPLOADED'){
            GithubInputBox = <div>
                <Row>
                    <Col span={3}></Col>
                    <Col span={5}></Col>
                    <Col span={8} className="github-text">
                        <Search
                            placeholder="input search text"
                            onSearch={value => this.testExist(value)}
                            style={{ width: 300 }}
                        />
                    </Col>
                </Row>
            </div>
        }

        let TestIcon = null;
        if(test === true){
            TestIcon =
            <div>
                <Row>
                    <Col span={3}></Col>
                    <Col span={5}></Col>
                    <Col span={3} className="github-text">
                        <IconFont type="icon-duigou" />
                    </Col>
                    <Col span={2}>
                        <Button type='link' onClick={this.analysisGithubProject(githubAddress)}>
                            analysis
                        </Button>
                    </Col>
                </Row>
            </div>
        }

        return (
            <div style={{margin: 30, padding: 30}}>
                {TopButton}
                {AnalysisButton}
                {GithubInputBox}
                {TestIcon}
            </div>
        )
    }
}

export default UploadProject