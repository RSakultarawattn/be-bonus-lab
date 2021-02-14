const pool = require('../utils/pool');

module.exports = class Quotes {
    id;
    content;


    constructor(row) {
      this.id = row.id;
      this.content = row.content;

    }

    static async insert({ content }) {
      const { rows } = await pool.query(
        'INSERT INTO quotes (content) VALUES ($1) RETURNING *',
        [content]
      );

      return new Quotes(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM quotes');

      return rows.map(row => new Quotes(row));

    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM quotes WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No quote with id ${id}`);
      return new Quotes(rows[0]);
    }

    static async update(id, { content }) {
      const { rows } = await pool.query(
        `UPDATE lightsabers 
      SET content=$1
      WHERE id=$2
      RETURNING *
    `,
        [content]
      );

      if(!rows[0]) throw new Error(`No quote with id ${id} exists`);
      return new Quotes(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM quotes WHERE id=$1 RETURNING *',
        [id]
      );

      return new Quotes(rows[0]);
    }

};
