import React from 'react';
import {getHistoryProjectRes} from "../../api/repository";
import {Upload, Button, Icon, message, Row, Col, Input, List,Card,Divider,Table} from 'antd';
import "../../css/style.css"

class History extends React.Component {
    state = {
        repoId: '',
        histories:[],
        projectNames:[],
        results:[],
        index : -1,
        key: 'UD',
        CD:{},
        UD:{},
        HD:{},
        isOK: false
    };

    async componentDidMount() {
        this.setState({
            repoId: this.props.match.params.repoId
        });
        this.getHistoryProject(this.props.match.params.repoId);
    }


    getHistoryProject(repoId) {
        console.log(repoId)
        getHistoryProjectRes(repoId).then(res => {
            console.log(res.data)
            this.setState({
                histories: res.data.histories,
                projectNames: res.data.projectNames,
                results: res.data.results
            });
        })
    }

    changeIndex(index) {
        this.setState({
            index : index,
            UD : this.state.results[index].UD,
            HD : this.state.results[index].HD,
            CD : this.state.results[index].CD,
            isOK: true
        });
        console.log(this.state.results[index].CD)
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };


    render() {

        const { histories ,projectNames, index, results,isOK} = this.state;

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

        let contentList = null;
        if(isOK){
            contentList = {
                UD: <div>
                    <List  dataSource={this.state.UD} renderItem={item => (
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
                    <List  dataSource={this.state.HD.modified} renderItem={item => (
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
                        <Table columns={this.state.CD.class.colums1} dataSource={this.state.CD.class.data1} scroll={{ x: 1300 }} />
                    </Row>
                    <Divider />
                    <Row className="table-text">Table Two(class/package):</Row>
                    <Row className="table-flow">
                    <Table columns={this.state.CD.class.colums2} dataSource={this.state.CD.class.data2} scroll={{ x: 1300 }} />
                    {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                    <Row className="cd-text">package : </Row>
                    <Row className="table-text">Table One(以cycle作为行以class/package作为列):</Row>
                    <Row className="table-flow">
                    <Table columns={this.state.CD.package.colums1} dataSource={this.state.CD.package.data1} scroll={{ x: 1300 }} />
                    {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                    <Row className="table-text">Table Two(class/package):</Row>
                    <Row className="table-flow">
                    <Table columns={this.state.CD.package.colums2} dataSource={this.state.CD.package.data2} scroll={{ x: 1300 }} />
                    {/*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                </div>
            };
        }else{
            contentList = {
                UD: <div>
                    <List  dataSource={this.state.UD} renderItem={item => (
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
                    <List  dataSource={this.state.HD.modified} renderItem={item => (
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
                        {/*<Table columns={this.state.CD.class.colums1} dataSource={this.state.CD.class.data1} scroll={{ x: 1300 }} />*/}
                    </Row>
                    <Divider />
                    {/*<Row className="table-text">Table Two(class/package):</Row>*/}
                    {/*<Row className="table-flow">*/}
                    {/*<Table columns={this.state.CD.class.colums2} dataSource={this.state.CD.class.data2} scroll={{ x: 1300 }} />*/}
                    {/*/!*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*!/*/}
                    {/*</Row>*/}
                    {/*<Divider />*/}
                    {/*<Row className="cd-text">package : </Row>*/}
                    {/*<Row className="table-text">Table One(以cycle作为行以class/package作为列):</Row>*/}
                    {/*<Row className="table-flow">*/}
                    {/*<Table columns={this.state.CD.package.colums1} dataSource={this.state.CD.package.data1} scroll={{ x: 1300 }} />*/}
                    {/*/!*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*!/*/}
                    {/*</Row>*/}
                    {/*<Divider />*/}
                    {/*<Row className="table-text">Table Two(class/package):</Row>*/}
                    {/*<Row className="table-flow">*/}
                    {/*<Table columns={this.state.CD.package.colums2} dataSource={this.state.CD.package.data2} scroll={{ x: 1300 }} />*/}
                    {/*/!*<Table columns={CD.class.colums1} dataSource={CD.class.data1} scroll={{ x: 1300 }} />*!/*/}
                    {/*</Row>*/}
                    {/*<Divider />*/}
                </div>
            };
        }


        let DetectionResult = null;
        if(index >= 0){
            // UD = results[index].UD
            // CD = results[index].CD
            // HD = results[index].HD
            DetectionResult =
                <div className="detection">
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
        }

        let HistoryList = <div>
            <div className='form-text'>histories</div>
            <div style={{margin: 50, padding: 30}}>
            <List itemLayout='horizontal' dataSource={histories} renderItem={(item,index) => (
                <List.Item>
                    <div>
                        <div className="title-text1">name:</div>
                        <div className="title-text2">{projectNames[index]}</div>
                    </div>
                    <div>
                        <div className="title-text1">createTime:</div>
                        <div className="title-text2">{item.createTime}</div>
                    </div>
                    <div>
                        <Button onClick={()=>this.changeIndex(index)}>Check Results</Button>
                    </div>
                </List.Item>
            )}>
            </List>
            </div>
        </div>

        return(
            <div style={{margin: 30, padding: 30}}>
                {HistoryList}
                {DetectionResult}
            </div>
        )
    }
}

export default History
