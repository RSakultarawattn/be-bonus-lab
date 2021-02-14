const pool = require('../utils/pool');

module.exports = class Quote {
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

      return new Quote(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM quotes');

      return rows.map(row => new Quote(row));

    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM quotes WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No quote with id ${id}`);
      return new Quote(rows[0]);
    }

    static async update(id, { content }) {
      const { rows } = await pool.query(
        `UPDATE quotes
      SET content=$1
      WHERE id=$2
      RETURNING *
    `,
        [content]
      );

      if(!rows[0]) throw new Error(`No quote with id ${id} exists`);
      return new Quote(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM quotes WHERE id=$1 RETURNING *',
        [id]
      );

      return new Quote(rows[0]);
    }

};
