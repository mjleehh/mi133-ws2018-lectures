export async function getCreateResult(res) {
    const doc = (await res)._doc
    return {...doc, _id: doc._id.toString()}
}

export async function getListResult(res) {
    return (await res).map(({_doc}) => ({
        ..._doc, _id: _doc._id.toString()
    }))
}
