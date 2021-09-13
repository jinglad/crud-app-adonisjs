import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TodoLists extends BaseSchema {
  protected tableName = 'todo_lists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('task_title').notNullable()
      table.boolean('is_done').defaultTo(0).comment('0 means not done, 1 means done, 2 means abondaned...')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
