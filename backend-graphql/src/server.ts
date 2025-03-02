import { Application } from "express";
import { lmsLogger } from "./libs/common.logger";
import { ApolloServer,BaseContext } from "@apollo/server";
import { serverMiddleware } from "./middlewares/server.middleware";
import { serverRouter } from "./routes/server.routes";
import { connectMongo } from "./database/connect";
import mongoose from "mongoose";





class ExpressServer {


    private serverPort : number
    private expressApp : Application
    private graphql : ApolloServer<BaseContext>


    constructor(serverPort : number, expressApp : Application,graphql:ApolloServer<BaseContext>) {

        this.serverPort = serverPort
        this.expressApp = expressApp
        this.graphql = graphql
        this.initalizeSetups()
    }


    private extractPortAndApp () : { port : number, app : Application } {
        return {
            port : this.serverPort,
            app : this.expressApp
        }
    }



    public async startExpressServer() {
        try{
            const { port : serverPort , app : expressApplication } = this.extractPortAndApp()

            connectMongo().then((connection : any) => {
                lmsLogger.info(`Database Connected , Connection Database Name : ${connection.connection.name}`)
                expressApplication.listen(serverPort,() => {
                    lmsLogger.info(`Express Server is Starting on the http://localhost:${serverPort}/api`)
                })
            }).catch((err : unknown) => {
                throw err
            })
        }catch(err){
            lmsLogger.error(`Error Starting the Express Server`)
            throw err
        }
    }

    public async initalizeSetups() {
       await serverMiddleware(this.expressApp)
       await serverRouter(this.expressApp,this.graphql)
    }



}

export default ExpressServer