import React from 'react'
import ReactDom from 'react-dom'

import {ApolloClient} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {} from 'apollo-link-http'

const client = new ApolloClient({
    link:
})

ReactDom.render(
    <div>Hello React App!</div>,
    document.getElementById('main')
)
