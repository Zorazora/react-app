import React from 'react';
import {Result, Button} from 'antd';
import {validateMail} from "../../api/user";

class Activate extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        type: '',
        title: '',
    };

    handleClick() {
        if (this.state.type === 'FAIL_ERROR') {
            this.props.history.push('/arcan/register');
        }else {
            this.props.history.push('/login');
        }
    }

    async componentDidMount() {
        validateMail(this.props.match.params.id).then(res => {
           let status = res.data.data;
           let type = '';
           let title = '';
           switch(status){
               case 'SUCCESS':
                   type = 'success';
                   title = 'Successfully Verified Your Account!';
                   break;
               case 'FAIL_ERROR':
                   type = 'error';
                   title = 'Your Verification Link is Wrong!';
                   break;
               case 'FAIL_ACTIVATED':
                   type = 'info';
                   title = 'This Link Has Been Activated!';
                   break;
           }
           this.setState({
               type: type,
               title: title
           })
        });
    }

    render() {
        const {type, title} = this.state;
        return(
            <Result status={type} title={title}
            extra={[
                <Button type='primary' key='console' onClick={this.handleClick}>
                    {this.state.type === 'FAIL_ERROR' ? 'Go Register' : 'Go Sign in'}
                </Button>
            ]}/>
        )
    }
}

export default Activate