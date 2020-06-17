import React from 'react';
import '../css/App.css';
import {test} from '../api/api'
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import {userActions} from "../store/action";
import {connect} from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBtn = this.handleClickBtn.bind(this);
    }
    async componentDidMount() {
        console.log('hi')
        console.log('props:', this.props)
        // const res = await test()
        // console.log(res)
        test().then(res => {
            console.log(res.data)
        })
      // const task = await save({taskName: 'zzh'})
      // console.log(task)
    }

    handleClickBtn() {
        console.log('App:',this.props)
        // this.props.history.push('/arcan/dashboard/'+this.props.user.token)
    }

    render() {
    return (
        /*
      <div className="App">
        <Button type="primary" onClick={this.handleClickBtn}>Button</Button>
      </div>
      */
        <div style={{backgroundImage: "url("+require("../images/background.png")+")", padding: 0, margin: 0,
            height: 690, opacity: 0.8}} className="App">
            <Button type='primary' size='large' style={{marginTop: 360}} onClick={this.handleClickBtn}>
                <Link to={{pathname: '/arcan/dashboard/'+this.props.user.token}}>Quick Start </Link>
                {/*Quick Start*/}
            </Button>
        </div>
    )
    }
}
const mapStateToProps = (state) => {
    return state.user;
};


export default connect(mapStateToProps)(App)
