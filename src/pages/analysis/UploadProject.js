import React from 'react';
import {Upload, Button, Icon, message, Row, Col, Input, List,Card,Divider,Table} from 'antd';
import {uploadZip, analysis, getRepositoryProject, testExist,analysisGithubProject,analysisRelease} from "../../api/repository";
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
        test: false,
        releaseList: [],
        choosedRelease: '',
        result: [],
        key: 'UD',
        isAnalysis: false
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
        console.log("start");
        const { repoId, projectInfo} = this.state;
        let info = {};
        info.repoId = repoId;
        info.projectId = projectInfo.projectId;
        analysis(info).then(res => {
            console.log("res");
            console.log(res.data.data);
            this.setState({
                result: res.data.data,
                isAnalysis: true
            });
        });
    };

    testExist = (address) => {
        let info = {};
        info.githubAddress = address;
        testExist(info).then(res => {
            console.log(res);
            this.setState({
                githubAddress:address,
                test: res.data.success,
                releaseList: res.data.releases
            });

        });
    };

    // analysisGithubProject = (address) =>  {
    //     const { repoId,githubAddress} = this.state;
    //     let info = {};
    //     info.githubAddress = githubAddress;
    //     info.repoId = repoId;
    //     analysisGithubProject(info).then(res => {
    //         console.log(res);
    //     });
    // }

    analysisRelease = (release) => {
        const { repoId,githubAddress} = this.state;
        console.log(release)
        let info = {};
        info.githubAddress = githubAddress;
        info.repoId = repoId;
        info.release = release;
        analysisRelease(info).then(res => {
            console.log(res);
            this.setState({
                result : res.data.data,
                isAnalysis: true
            });
        });
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        const { uploading, fileList, status, projectInfo, name, githubAddress,test,releaseList,result,isAnalysis} = this.state;
        const { Search } = Input;

        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1805017_d3im7hiwj18.js',
        });

        const choosedRelease = null;

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
            if (status === 'CREATED'){
                TestIcon =
                    <div>
                        <Row>
                            <Col span={3}></Col>
                            <Col span={4}>
                                <IconFont type="icon-duigou" />
                            </Col>
                            <Col span={2}>
                                <Button type='link'>
                                    analysis
                                </Button>
                            </Col>
                        </Row>
                    </div>
            }else if (status === 'UPLOADED'){
                TestIcon =
                    <div>
                        <Row>
                            <Col span={3}></Col>
                            <Col span={5}></Col>
                            <Col span={4} className="github-text">
                                <IconFont type="icon-duigou" />
                            </Col>
                            <Col span={2}>
                                <Button type='link'>
                                    analysis
                                </Button>
                            </Col>
                        </Row>
                    </div>
            }
        }

        let EditionButton = null;
        if(test === true){
            if (status === 'CREATED'){
                EditionButton =
                    <div>
                        <Col span={3}></Col>
                        <Col span={3}>
                            <div>版本</div>
                            <List itemLayout='horizontal' dataSource={releaseList} renderItem={item => (
                                <List.Item>
                                    <div>
                                    <Button type='link' onClick={()=>this.analysisRelease(item)}>
                                        {item}
                                    </Button>
                                    </div>
                                </List.Item>
                            )}>
                            </List>
                        </Col>
                    </div>
            }else if (status === 'UPLOADED'){
                EditionButton =
                    <div>
                        <Col span={3}></Col>
                        <Col span={5}></Col>
                        <Col span={3}>
                            <div>版本</div>
                            <List itemLayout='horizontal' dataSource={releaseList} renderItem={item => (
                                <List.Item>
                                    <div>
                                        <Button type='link' onClick={()=>this.analysisRelease(item)}>
                                            {item}
                                        </Button>
                                    </div>
                                </List.Item>
                            )}>
                            </List>
                        </Col>
                    </div>
            }
        }

        const tabList = [
            {
                key: 'UD',
                tab: 'UD (Unstable Dependency)',
            },
            {
                key: 'HD',
                tab: 'HD (Hub-Like Dependency)',
            },
            {
                key: 'CD',
                tab: 'CD (Cyclic Dependency)',
            }
        ];

        let UD = result.UD;
        let CD = result.CD;
        let HD = result.HD;
        // let nodeNames1 = result.CD.class.nodeNames;
        // let nodeNames2 = result.CD.package.nodeNames;

        const columns = [
            {
                title: 'Node Names',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
        ];
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ];

        const test1 = ["xjsnckjsdn","cndsjkcnskc","cdjsncjskcns","xdscojdscs","1213321","83920382092","2","2","3"]

        let contentList = null;
        if(isAnalysis){ //已分析
            contentList = {
                UD: <div>
                    <List  dataSource={UD} renderItem={item => (
                        <List.Item>
                            <div>
                                <Row>
                                    Package Name : {item.packageName}
                                </Row>
                                <Row>
                                    Instability : {item.instability}
                                </Row>
                                {/*<Row>*/}
                                {/*Filtered : {item.filtered}*/}
                                {/*</Row>*/}
                                <Row>
                                    Total : {item.total}
                                </Row>
                                <Row>
                                    Cause Smell Packages :
                                </Row>
                                <div>
                                    {
                                        Object.keys(item.causeSmellPackages).map((obj,idx) => (
                                                <Row key={idx} className="causeSmellPackage">{obj} : {item.causeSmellPackages[obj]}</Row>
                                            )
                                        )
                                    }
                                </div>

                            </div>
                        </List.Item>
                    )}>
                    </List>
                </div>,
                HD: <div>
                    <List  dataSource={result.HD.modified} renderItem={item => (
                        <List.Item>
                            <Row>{item}</Row>
                        </List.Item>
                    )}>
                    </List>
                </div>,
                CD: <div>
                    <Row className="cd-text">class : </Row>
                    <Row className="table-text">Table One(以cycle作为行以class/package作为列):</Row>
                    <Row className="table-flow">
                        {/*{*/}
                            {/*<Row>*/}
                                {/*<Row span={2}><div className="title1">Cycle</div></Row>*/}
                                {/*{*/}
                                    {/*CD.class.nodeNames.map(function(item,index) { // map 返回的是一个新数组*/}
                                        {/*return <Col span={5}>{item}</Col>*/}
                                    {/*})*/}

                                {/*})*/}

                            {/*</Row>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*CD.class.tableOne.map(function(item,index) { // map 返回的是一个新数组*/}
                        {/*return <Row>*/}
                            {/*<Row span={2}><div className="title1">Cycle {index+1}</div></Row>*/}
                            {/*{*/}
                            {/*item.map(function(item1,index1) { // map 返回的是一个新数组*/}
                            {/*return <Col span={5}>{item1}</Col>*/}
                            {/*})*/}
                            {/*}*/}
                        {/*</Row>*/}
                        {/*})*/}
                        {/*}*/}
                        <Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />
                    </Row>
                    <Divider />
                    <Row className="table-text">Table Two(class/package):</Row>
                    <Row className="table-flow">
                        <Table columns={CD.class.colums2} dataSource={CD.class.data2} scroll={{ x: 1300 }} />
                        {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                    <Row className="cd-text">package : </Row>
                    <Row className="table-text">Table One(以cycle作为行以class/package作为列):</Row>
                    <Row className="table-flow">
                        <Table columns={CD.package.colums1} dataSource={CD.package.data1} scroll={{ x: 1300 }} />
                        {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                    <Row className="table-text">Table Two(class/package):</Row>
                    <Row className="table-flow">
                        <Table columns={CD.package.colums2} dataSource={CD.package.data2} scroll={{ x: 1300 }} />
                        {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                </div>
            };
        }else{  //未分析
            contentList = {
                UD: <div>
                    {/*<List  dataSource={UD} renderItem={item => (*/}
                        {/*<List.Item>*/}
                            {/*<div>*/}
                                {/*<Row>*/}
                                    {/*Package Name : {item.packageName}*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                    {/*Instability : {item.instability}*/}
                                {/*</Row>*/}
                                {/*/!*<Row>*!/*/}
                                {/*/!*Filtered : {item.filtered}*!/*/}
                                {/*/!*</Row>*!/*/}
                                {/*<Row>*/}
                                    {/*Total : {item.total}*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                    {/*Cause Smell Packages :*/}
                                {/*</Row>*/}
                                {/*<div>*/}
                                    {/*{*/}
                                        {/*Object.keys(item.causeSmellPackages).map((obj,idx) => (*/}
                                                {/*<Row key={idx} className="causeSmellPackage">{obj} : {item.causeSmellPackages[obj]}</Row>*/}
                                            {/*)*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*</div>*/}

                            {/*</div>*/}
                        {/*</List.Item>*/}
                    {/*)}>*/}
                    {/*</List>*/}
                </div>,
                HD: <div>
                    {/*<List  dataSource={HD} renderItem={item => (*/}
                        {/*<List.Item>*/}
                            {/*<Row>{item}</Row>*/}
                        {/*</List.Item>*/}
                    {/*)}>*/}
                    {/*</List>*/}
                </div>,
                CD: <div>
                    {/*<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />*/}
                </div>
            };

        }
        let DetectionResult = <div className="detection">
            {/*<div className='form-text'>Detection Result</div>*/}
            {/*<div>UD</div>*/}
            <Card title="Detection Result" hoverable={true} style={{ width: '100%' }}  tabList={tabList}
                  activeTabKey={this.state.key}
                  onTabChange={key => {
                      this.onTabChange(key, 'key');
                  }}>
                {contentList[this.state.key]}
            </Card>
        </div>

        return (
            <div style={{margin: 30, padding: 30}}>
                {TopButton}
                {AnalysisButton}
                {GithubInputBox}
                {TestIcon}
                {EditionButton}
                {DetectionResult}
            </div>
        )
    }
}

export default UploadProject