import {ADD_DIGIT} from './actions'

export default function (state = {input: "", acc: null, op: null}, {type, payload}) {
    switch (type) {
        case ADD_DIGIT: {
            // do something
            return state
        }
        default:
            return state
    }
}