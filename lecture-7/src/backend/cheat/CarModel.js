import mg from 'mongoose'
import {getCreateResult, getListResult} from "./helpers"

const CarModel = mg.model('carmodels', new mg.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true},
    },
    manufacturer: {
        type: mg.Types.ObjectId,
        required: true,
    },
}))

export function addCarModel(name, manufacturer) {
    return getCreateResult(CarModel.create({name, manufacturer}))
}

export function listCarModels() {
    return getListResult(CarModel.find({}))
}
