import { connection } from '../configs/dbconnect.js'
import { customLogger } from '../utils/logger.js'
export class QuizModel {
  async getAll() {
    try {
      const sql = 'SELECT * FROM quizzes'
      const [rows] = await connection.execute(sql)
      return rows
    } catch (e) {
      customLogger.error(`🔥 error: ${e}`)
    }
  }
  async getById(id) {
    try {
      const sql = 'SELECT * FROM quizzes WHERE `id` = ?'
      const [rows] = await connection.execute(sql, [id])
      return rows
    } catch (e) {
      customLogger.error(`🔥 error: ${e}`)
    }
  }
  async create(quiz) {
    const { quiz_text, img, supplement_text, supplement_url } = quiz
    try {
      await connection.beginTransaction()
      const sql =
        'INSERT INTO quizzes(quiz_text, img, supplement_text, supplement_url) VALUES(?, ?, ?, ?)'
      const [ResultSetHeader] = await connection.execute(sql, [
        quiz_text,
        img,
        supplement_text,
        supplement_url,
      ])
      const rsh = ResultSetHeader
      await connection.commit()
      return rsh.insertId
    } catch (e) {
      await connection.rollback()
      customLogger.error(`🔥 error: ${e}`)
    }
  }
  async update(id, quiz) {
    const { quiz_text, img, supplement_text, supplement_url } = quiz
    try {
      await connection.beginTransaction()
      const sql =
        'UPDATE quizzes SET quiz_text = ?, img = ?, supplement_text = ?, supplement_url = ? WHERE id = ?'
      const [ResultSetHeader] = await connection.execute(sql, [
        quiz_text,
        img,
        supplement_text,
        supplement_url,
        id,
      ])
      const rsh = ResultSetHeader
      if (rsh.affectedRows == 0) throw new Error(`There is no id:${id} quiz content data`)
      await connection.commit()
      return true
    } catch (e) {
      await connection.rollback()
      customLogger.error(`🔥 error: ${e}`)
    }
  }
  async deleteById(id) {
    try {
      await connection.beginTransaction()
      const sql = 'DELETE FROM quizzes WHERE `id` = ?'
      const [ResultSetHeader] = await connection.execute(sql, [id])
      const rsh = ResultSetHeader
      if (rsh.affectedRows == 0) throw new Error(`There is no id:${id} quiz content data`)
      await connection.commit()
      return true
    } catch (e) {
      await connection.rollback()
      customLogger.error(`🔥 error: ${e}`)
    }
  }
}
