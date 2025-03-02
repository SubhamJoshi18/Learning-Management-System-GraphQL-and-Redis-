import { ApolloServer, BaseContext } from "@apollo/server"
import {expressMiddleware} from '@apollo/server/express4'
import { Application } from "express"
import { globalErrorHandler, notFoundError } from "../handlers/error.handler"
import healthRouter from "./health.route"
import authRouter from "./auth.route"


const serverRouter  = async (app:Application,graphQL : ApolloServer<BaseContext>) => {
        await graphQL.start()
        app.use('/graphql',expressMiddleware(graphQL) as any)
        app.use('/api',[healthRouter,authRouter])
        app.use('*',notFoundError as any)
        app.use(globalErrorHandler as any)
}


export {
    serverRouter
}