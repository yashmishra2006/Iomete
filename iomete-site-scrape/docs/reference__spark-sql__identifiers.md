<!-- source: https://iomete.com/resources/reference/spark-sql/identifiers | scraped 2026-11-01 -->

Page title: Identifiers | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/identifiers
Meta description: An identifier is a string used to identify a database object. Spark SQL has regular identifiers and delimited identifiers, which are enclosed within backtick

---

- Spark SQL Reference
- Identifiers

On this page

# Identifiers

An identifier is a string used to identify a database object such as a table, view, schema, column, etc. Spark SQL has regular identifiers and delimited identifiers, which are enclosed within backtick

## Syntax

### Regular Identifier

```
{ letter | digit | '_' } [ , ... ]

```

Note: If spark.sql.ansi.enabled is set to true, ANSI SQL reserved keywords cannot be used as identifiers. For more details, please refer to ANSI Compliance.

### Delimited Identifier

```
`c [ ... ]`;

```

### Parameters

- letter Any letter from A-Z or a-z.
- digit Any numeral from 0 to 9.
- c Any character from the character set. Use ` to escape special characters (e.g., `).

## Examples

```
-- This CREATE TABLE fails with ParseException because of the illegal identifier name a.b
CREATE TABLE test (a.b int);
org.apache.spark.sql.catalyst.parser.ParseException:
no viable alternative at input 'CREATE TABLE test (a.'(line 1, pos 20)

-- This CREATE TABLE works
CREATE TABLE test (`a.b` int);

-- This CREATE TABLE fails with ParseException because special character ` is not escaped
CREATE TABLE test1 (`a`b` int);
org.apache.spark.sql.catalyst.parser.ParseException:
no viable alternative at input 'CREATE TABLE test (`a`b`'(line 1, pos 23)

-- This CREATE TABLE works
CREATE TABLE test (`a``b` int);

```

Previous

Datetime Patterns

Next

Operators

## ON THIS PAGE

- Syntax

- Regular Identifier
- Delimited Identifier
- Parameters

- Examples
