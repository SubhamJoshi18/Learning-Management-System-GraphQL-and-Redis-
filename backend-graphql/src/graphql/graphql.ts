import {ApolloServer, BaseContext} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import { graphqlSchema } from './schema/schema'
import { graphQLResolver } from './resolver/resolver'
import { lmsLogger } from '../libs/common.logger'
import { getGenericEnvValue } from '../utils/env.utils'


class GraphQLServer {

  

    public static async createGraphqlServer() {
        try{
            const graphQlServer  :  ApolloServer<BaseContext>  = new ApolloServer({
                typeDefs : graphqlSchema,
                resolvers : graphQLResolver
            })
            lmsLogger.info(`Graphl QL Server is Starting on http://localhost:${getGenericEnvValue('PORT')}/graphql`)
            return graphQlServer
        }catch(err) {
            lmsLogger.error(`Error Connecting to the Apollo Server Graphql`)
            throw err
        }
   
    }

}

export default GraphQLServer