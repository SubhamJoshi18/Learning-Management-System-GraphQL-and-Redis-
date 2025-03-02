import express from 'express'
import { lmsLogger } from './libs/common.logger'
import { getGenericEnvValue } from './utils/env.utils'
import ExpressServer from './server'
import GraphQLServer from './graphql/graphql'
import { ApolloServer, BaseContext } from '@apollo/server'


async function startGraphQlAndExpressServer () {
    const port = typeof getGenericEnvValue('PORT')  === 'string' ? Number(getGenericEnvValue('PORT')) : 3000
    const app = express()
    const graphql : ApolloServer<BaseContext>= await GraphQLServer.createGraphqlServer()
    const expressInstance = new ExpressServer(port,app,graphql)
    await expressInstance.startExpressServer()
}


(async () => {
    try{
        lmsLogger.info(`Starting the Graph QL and Express Server`)
        await startGraphQlAndExpressServer()
    }catch(err){
        console.error(err)
        lmsLogger.error(`Shuttind Down the Servers`)
        process.exit(0)
    }
})()