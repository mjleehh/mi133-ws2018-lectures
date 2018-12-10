import mg from 'mongoose'

const schema = new mg.Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true},
    }
})

const Manufacturer = mg.model('manufacturer', schema)

export async function addManufacturer(name) {
    const doc = (await Manufacturer.create({name}))._doc
    return {...doc, _id: doc._id.toString()}
}

export async function listManufacturers() {
    return(await Manufacturer.find({})).map(({_doc}) =>
        ({..._doc, _id: _doc._id.toString()}))
}

export function manufacturersUpdated(handler) {
    Manufacturer.watch().on('change', ({operationType, fullDocument}) => {
        switch (operationType) {
            case 'insert':
                handler("CREATED", {...fullDocument, _id: fullDocument._id.toString()})
                return
            default:
                return
        }
    })
}

manufacturersUpdated(update => console.log(update))
