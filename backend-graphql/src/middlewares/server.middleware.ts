import { Application } from "express";
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from "helmet";



const serverMiddleware = async (app : Application) => {
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(morgan('dev'))
    app.use(cors({origin:"*"}))
}


export {
    serverMiddleware
}