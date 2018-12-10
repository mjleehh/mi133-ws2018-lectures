import {GraphQLServer, PubSub} from 'graphql-yoga'
import {addManufacturer, listManufacturers, manufacturersUpdated} from './Manufacturer'

const typeDefs = `
    type CarModel {
        name: String!
        manufacturer: Manufacturer
    }

    type Manufacturer {
        _id: ID!
        name: String!
    }

    enum UpdateType {
        CREATED
    }

    type ManufacturerUpdate {
        updateType: UpdateType!
        manufacturer: Manufacturer!
    }

    type Query {
        manufacturers: [Manufacturer]
    }
    
    type Mutation {
        addManufacturer(name: String!): Manufacturer
    }
    
    type Subscription {
        manufacturerUpdate: ManufacturerUpdate 
    }
`

const MANUFACTURER_UPDATE = 'MANUFACTURER_UPDATE'

const resolvers = {
    Query: {
        manufacturers: () => listManufacturers()
    },
    Mutation: {
        addManufacturer: (_, {name}) => addManufacturer(name)
    },
    Subscription: {
        manufacturerUpdate: {
            subscribe: (_, args, {pubSub}) => pubSub.asyncIterator(MANUFACTURER_UPDATE)
        }
    }
}

const pubSub = new PubSub()
manufacturersUpdated((updateType, manufacturer) => {
    pubSub.publish(MANUFACTURER_UPDATE, {
        manufacturerUpdate: {
            updateType,
            manufacturer,
        },
    })
})

export default function startGraphQlServer() {
    const server = new GraphQLServer({
        typeDefs,
        resolvers,
        context: {pubSub}
    })

    server.start({port: 3000, endpoint: '/api', playground: '/playground'})
}