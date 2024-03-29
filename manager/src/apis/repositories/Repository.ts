import axios from 'axios'
import { TNewQuiz, TUpdateQuiz, TUserData } from '../../types'

const repository = axios.create({
  headers: {
    'Content-Type': 'Application/json',
    Accept: 'Application/json',
  },
  baseURL: 'http://localhost:8080',
})

export default (resource: string) => {
  return {
    findAll() {
      return repository.get(resource)
    },
    findById(id: number) {
      return repository.get(`${resource}/${id}`)
    },
    create(newQuiz: TNewQuiz) {
      return repository.post(`${resource}`, JSON.stringify(newQuiz))
    },
    invite(email: Pick<TUserData, 'email'>) {
      return repository.post(`${resource}/invite`, JSON.stringify(email))
    },
    update(updateQuiz: TUpdateQuiz) {
      return repository.put(`${resource}/${updateQuiz.id}`, JSON.stringify(updateQuiz))
    },
    deleteById(id: number) {
      return repository.delete(`${resource}/${id}`)
    },
  }
}
