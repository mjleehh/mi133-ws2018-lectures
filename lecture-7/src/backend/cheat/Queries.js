import {GraphQLServer, PubSub} from 'graphql-yoga'
import {addManufacturer, getManufacturer, listManufacturers, watchManufacturers} from './Manufacturers'
import {addCarModel, listCarModels} from "./CarModel"


const typeDefs = `
enum Changes {
    NEW
}

type CarModel {
    _id: ID!
    name: String!
    manufacturer: Manufacturer
}

type Manufacturer {
    _id: ID!
    name: String!
}

type Query {
    manufacturers: [Manufacturer]
    carModels: [CarModel]
}

type ManufacturerUpdate {
    updateType: Changes!
    manufacturer: Manufacturer!
}

type Mutation {
    addManufacturer(name: String!): Manufacturer
    addCarModel(manufacturer: ID!, name: String!): CarModel
}

type Subscription {
    manufacturerUpdate: ManufacturerUpdate
}
`

const MANUFACTURER_UPDATE = 'MANUFACTURER_UPDATE'
const pubSub = new PubSub()

const resolvers = {
    Query: {
        manufacturers: () => listManufacturers(),
        carModels: () => listCarModels(),
    },
    Mutation: {
        addManufacturer: (_, {name}) => addManufacturer(name),
        addCarModel: (_, {name, manufacturer}) => addCarModel(name, manufacturer),
    },
    CarModel: {
        manufacturer: (car) => getManufacturer(car.manufacturer)
    },
    Subscription: {
        manufacturerUpdate: {
            subscribe: (_, args, {pubSub}) => pubSub.asyncIterator(MANUFACTURER_UPDATE)
        }
    },
}

watchManufacturers(update =>
    pubSub.publish(MANUFACTURER_UPDATE, {manufacturerUpdate: update})
)
export default function startGraphQlServer() {
    const server = new GraphQLServer({
        typeDefs,
        resolvers,
        context: {pubSub},
    })

    server.start({port: 3000, endpoint: '/api', playground: '/playground'})
}