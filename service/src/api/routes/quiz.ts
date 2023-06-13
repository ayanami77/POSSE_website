import express, { Request, Response, Router } from 'express'
import { logger } from '../middlewares/logger.js'
import QuizService from '../../services/QuizService.js'

const quizService = new QuizService()

const route = Router()
route.use(logger)

route.get('/', async (req: Request, res: Response) => {
  const { quizzes, choices, status } = await quizService.getAllQuizzes()
  res.status(status).json({ quizzes, choices })
})

route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const { quiz, choices, status } = await quizService.getQuizById(id)
  res.status(status).json({ quiz, choices })
})

route.post('/', (req: Request, res: Response) => {
  res.status(201)
})

route.delete('/:id', (req: Request, res: Response) => {
  res.status(202)
})

export default route
