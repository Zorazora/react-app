import React from 'react';
import {Row,Button,Upload,message,Icon} from 'antd';
import reqwest from 'reqwest';
import {connect} from "react-redux";
import {getAvatarPath,getUserByUserId} from "../../api/user"
import '../../css/UserCenter.css';
import DefaultAvatar from '../../images/default-avatar.png';
import {getRepositoryList} from "../../api/repository";

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatarPath : '',
            data : [],
            WebAppConfigBase: '/Users/zhuyuxin/arcan/avatar',
            user: {}
        };
    }

    async componentDidMount() {
        this.getUserByUserId();
        this.getRepositoryList();
        this.getAvatarPath();
    };

    getRepositoryList() {
        getRepositoryList(this.props.user.token).then(res => {
            this.setState({
                data: res.data.data
            })
        });
    };

    getAvatarPath(){
        console.log("user")
        console.log(this.props.user)
        getAvatarPath(this.props.user.token).then(res => {
            console.log(res.data)
            if(this.state.user.avatar !== null){
                console.log("okk")
                this.setState({
                    // avatarPath: require("/Users/zhuyuxin/arcan/avatar"+res.data.avatarPath)
                    // avatarPath: require(this.state.WebAppConfigBase+res.data.avatarPath)
                    avatarPath: require("/Users/zhuyuxin/arcan/avatar/8a6b61eef63d4a5d96eb449de4857af0/u=3484334960,3948950267&fm=27&gp=0.jpg")
                })
            }
        });
    }

    getUserByUserId(){
        console.log("getUserByUserId")
        getUserByUserId(this.props.user.token).then(res => {
            console.log(res.data)
            this.setState({
                user: res.data.user
            })
        });
    }

    confirm = () =>{
        this.props.history.push('/arcan/dashboard/:userId')
    }

    render() {
        const { user } = this.props;

        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1805017_d3im7hiwj18.js',
        });

        const {avatarPath,data} = this.state;
        // const avatarUrl = require(avatarPath);

        let Img = null;
        if(user.avatar === null){
            Img =
                <img src={DefaultAvatar} className='Avatar' alt='Avatar'/>

        }else{
            Img = <img src={avatarPath} className="Avatar"/>
        }

        const propsUpload = {
            name: "avatar",
            showUploadList: false,
            customRequest: info => {
                const formData = new FormData();
                formData.append('avatar', info.file);
                reqwest({
                    url: `http://localhost:8088/login/uploadAvatar/${user.token}`,
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: (res) => {//上传成功回调
                        console.log(res)
                        if (res.success === true) {
                            user.avatar = res.imageUrl
                            this.getAvatarPath();
                            message.success('上传成功！');
                        }
                    },
                    error: () => {//上传失败回调
                        message.error('上传失败！');
                    },
                });
            },
            onRemove: file => {//删除图片调用
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            // listType: "picture-card",
            // className: "avatar-uploader",

            beforeUpload: file => {//控制上传图片格式
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

                if (!isJpgOrPng) {
                    message.error('您只能上传JPG/PNG 文件!');
                    return;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    message.error('图片大小必须小于2MB!');
                    return;
                }
                return isJpgOrPng && isLt2M;
            },
        };
        return(
            <div>
                <Row>
                    <div className='UserCenterBorder'>
                        <div className="LeftAvatar">
                            <Upload {...propsUpload}>
                                {Img}
                            </Upload>
                        </div>
                        <div className="RightInfoBorder">
                            <div className="UserName">{user.username} </div>
                            <IconFont type="icon-bianji" />
                            <div className="BottomInfo">
                                <div className="BottomLeft">
                                    <div className="Mail">Mail</div>
                                    <div className="address">{user.mailaddress}</div>
                                </div>
                                <div className="BottomRight">
                                    <div className="Mail">Repository</div>
                                    <div className="address">{data.length}</div>
                                </div>
                            </div>
                            <Button type="primary" htmlType="submit" className='check-button' onClick={this.confirm}>
                                CHECK REPOSITORY
                            </Button>
                        </div>
                    </div>
                </Row>
            </div>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

export default connect(mapStateToProps)(UserCenter)