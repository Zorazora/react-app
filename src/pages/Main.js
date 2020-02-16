import React from 'react';
import {Upload, Button, Icon, message} from 'antd';
import {uploadZip} from "../api/api";

class Main extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach( file => {
            formData.append('file', file);
        });

        this.setState({
            uploading: true,
        });

        uploadZip(formData).then(data => {
            this.setState({
                uploading: false,
            })
            console.log(data);
            message.success('upload successfully.');
        }).catch(err => {
            this.setState({
                uploading: false,
            });
            message.error('upload failed.');
        })
    };

    render() {
        const { uploading, fileList} = this.state;
        const uploadProps = {
            onRemove: file => {
                console.log(file)
                // this.setState(state => ({
                //     fileList: [...state.fileList.slice(state.fileList.indexOf(file), 1).slice()]
                // }));
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.slice(index, 1)
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            accept: '.zip',
            multiple: false,
        };

        return(
            <div style={{margin: 30, padding: 30 }}>
                <Upload {...uploadProps}>
                    <Button type='primary'>
                        <Icon type='upload'/> Select Project
                    </Button>
                </Upload>
                <Button type='primary' onClick={this.handleUpload}
                        disabled={fileList.length === 0} loading={uploading} style={{marginTop: 16}}>
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        )
    }
}
export default Main