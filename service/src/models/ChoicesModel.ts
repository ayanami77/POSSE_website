import { ResultSetHeader } from 'mysql2'
import { connection } from '../configs/dbconnect.js'
import { IChoiceDTO } from '../interfaces/IChoice.js'

//TODO: エラーハンドリング見直したい！
export class ChoicesModel {
  public async getAll() {
    try {
      const sql = 'SELECT * FROM choices'
      const [rows] = await connection.execute(sql)
      return rows
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      throw new Error('failed getting data')
    }
  }

  public async getById(id: string) {
    try {
      const sql = `SELECT * FROM choices WHERE quiz_id = ${id}`
      const [rows] = await connection.execute(sql)
      return rows
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      throw new Error('failed getting data')
    }
  }

  public async create(quiz_id: number, choices: IChoiceDTO) {
    const { choices_data } = choices
    try {
      await connection.beginTransaction()

      choices_data.forEach((c) => {
        const sql = `INSERT INTO choices(quiz_id, name, isCorrect) VALUES(?, ?, ?)`
        connection.execute(sql, [quiz_id, c.name, c.isCorrect])
      })

      await connection.commit()
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      throw new Error('failed getting data')
    }
  }

  public async update(quiz_id: string, choices: IChoiceDTO) {
    const { choices_data } = choices
    try {
      await connection.beginTransaction()

      choices_data.forEach((c, i) => {
        const id = 3 * (parseInt(quiz_id) - 1) + (i + 1)
        const sql = 'UPDATE choices SET `name` = ?, `isCorrect` = ? WHERE `id` = ?'
        connection.execute(sql, [c.name, c.isCorrect, id])
      })

      await connection.commit()
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      throw new Error('failed getting data')
    }
  }

  public async deleteById(id: string) {
    try {
      await connection.beginTransaction()

      const sql = 'DELETE FROM choices WHERE `quiz_id` = ?'
      const [ResultSetHeader] = await connection.execute(sql, [id])

      const rsh = ResultSetHeader as ResultSetHeader
      if (rsh.affectedRows == 0) throw new Error('there is no data')

      await connection.commit()
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      throw new Error('failed deleting data')
    }
  }
}
