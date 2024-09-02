<!-- js
const sql = require('./')
-->

# sql-tagged-template-literal

```sh
npm install sql-tagged-template-literal
```

Useful for data dumps and other "just gimme a query" tasks.

```js
const userInput = `Robert'); DROP TABLE Students;--`

const query = sql`INSERT INTO awesome_table (sweet_column) VALUES (${userInput})`

query // => `INSERT INTO awesome_table (sweet_column) VALUES ('Robert\\'); DROP TABLE Students;--')`
```

- Unlike [node-sql-template-strings](https://github.com/felixfbecker/node-sql-template-strings), this module returns a string
- Unlike [sql-concat](https://github.com/TehShrike/sql-concat), this module isn't great at building queries dynamically

Uses the [sqlstring](https://github.com/mysqljs/sqlstring) library for escaping.

Only meant for escaping *values* - you shouldn't put table or column names in expressions.

## Escape mechanisms

### `null` is an unquoted NULL

```js
sql`SELECT ${null} IS NULL` // => `SELECT NULL IS NULL`
```

### `undefined` is an unquoted NULL

```js
sql`SELECT ${undefined} IS NULL` // => `SELECT NULL IS NULL`
```

### Strings are escaped and quoted

```js
sql`SELECT ${"what's up"} AS lulz` // => `SELECT 'what\\'s up' AS lulz`
```

### Numbers are not quoted

```js
sql`SELECT ${13} AS totally_lucky` // => `SELECT 13 AS totally_lucky`
```

### Booleans are converted to text

```js
sql`SELECT ${true} = ${false}` // => `SELECT true = false`
```

### Objects are JSONed, then escaped

MySQL has a [JSON](https://dev.mysql.com/doc/refman/5.7/en/json.html) data type, after all.

```js
const legitObject = { fancy: 'yes\'m' }

const jsonInsertQuery = sql`INSERT INTO document_store (json_column) VALUES (${legitObject})`

jsonInsertQuery // => `INSERT INTO document_store (json_column) VALUES ('{\\"fancy\\":\\"yes\\'m\\"}')`
```

### Arrays become comma separated with their values escaped

```js
const arrayQuery = sql`WHERE name IN(${[ `Alice`, userInput ]})`

arrayQuery // => "WHERE name IN('Alice', 'Robert\\'); DROP TABLE Students;--')"
```

```js
const twoDimensionalArray = [[`a`, 1], [`b`, 2], [`c`, 3]]
const twoDimensionalQuery = sql`INSERT INTO tablez (letter, number) VALUES ${twoDimensionalArray}`

twoDimensionalQuery // => `INSERT INTO tablez (letter, number) VALUES ('a', 1), ('b', 2), ('c', 3)`
```

# License

[WTFPL](http://wtfpl2.com/)
