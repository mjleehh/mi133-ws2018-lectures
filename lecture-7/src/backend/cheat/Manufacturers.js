import mg from 'mongoose'
import {getCreateResult, getListResult, getOneResult} from './helpers'

const Manufacturer = mg.model('manufacturers', new mg.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true},
    },
}))

export function addManufacturer(name) {
    return getCreateResult(Manufacturer.create({name}))
}

export function listManufacturers() {
    return getListResult(Manufacturer.find({}))
}

export function getManufacturer(_id) {
    return getCreateResult(Manufacturer.findById(_id))
}

export function watchManufacturers(handler) {
    Manufacturer.watch().on('change', change => {
        console.log(change.operationType)
        switch (change.operationType) {
            case 'insert':
                handler({
                    updateType: 'NEW',
                    manufacturer: change.fullDocument,
                })
                console.log('foo')
                return
            default:
                return
        }
    })
}