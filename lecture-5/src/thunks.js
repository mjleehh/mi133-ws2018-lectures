import {increment} from "./actions"

export const waitIncrement = () => dispatch => {
    setTimeout(() => dispatch(increment()), 1000)
    setTimeout(() => dispatch(increment()), 1000)
    setTimeout(() => dispatch(increment()), 1000)
}
