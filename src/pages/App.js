import React from 'react';
import '../css/App.css';
import {test} from '../api/api'
import {Button} from 'antd'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.handleClickBtn = this.handleClickBtn.bind(this)
    }
    async componentDidMount() {
        console.log('hi')
        // const res = await test()
        // console.log(res)
        test().then(res => {
            console.log(res.data)
        })
      // const task = await save({taskName: 'zzh'})
      // console.log(task)
    }

    handleClickBtn() {
        this.props.history.push('/main')
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
            <Button type='primary' size='large' style={{marginTop: 360}} onClick={this.handleClickBtn}> Quick Start </Button>
        </div>
    )
    }
}

export default App;
