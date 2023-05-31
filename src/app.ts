import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import './shared/container'

import { routes } from '@shared/infra/http/routes'
import { AppError } from '@shared/errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

export { app }
