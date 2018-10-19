import React from 'react'
import {connect} from 'react-redux'

import {addDigit} from './actions'

@connect(state => state)
export default class App extends React.Component {
    handleDigit = digit => () => {
        this.props.dispatch(addDigit(digit))
    }

    render() {
        const digits = []
        for (let i = 0; i < 10; ++i) {
            digits.push(<button key={i} onClick={this.handleDigit(i)}>{i}</button>)
        }

        let ops = ['+','-', '*', '/', '='].map(op => <button key={op}>{op}</button>)


        return <div>
            <div>{digits}</div>
            <div>{ops}</div>
        </div>
    }
}

