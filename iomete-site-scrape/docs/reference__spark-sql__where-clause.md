<!-- source: https://iomete.com/resources/reference/spark-sql/where-clause | scraped 2026-11-01 -->

Page title: WHERE Clause | IOMETE
URL: https://iomete.com/resources/reference/spark-sql/where-clause
Meta description: The WHERE clause is used to limit the results of the FROM clause of a query or a subquery based on the specified condition

---

- Spark SQL Reference
- Queries
- WHERE Clause

On this page

# WHERE Clause

The WHERE clause is used to limit the results of the FROM clause of a query or a subquery based on the specified condition.

## Syntax

```
WHERE boolean_expression

```

## Parameters

- boolean_expression Specifies any expression that evaluates to a result type boolean. Two or more expressions may be combined together using the logical operators ( AND, OR ).

## Examples

```
CREATE TABLE person (id INT, name STRING, age INT);
INSERT INTO person VALUES
    (100, 'John', 30),
    (200, 'Mary', NULL),
    (300, 'Mike', 80),
    (400, 'Dan',  50);

-- Comparison operator in `WHERE` clause.
SELECT * FROM person WHERE id > 200 ORDER BY id;
+---+----+---+
| id|name|age|
+---+----+---+
|300|Mike| 80|
|400| Dan| 50|
+---+----+---+

-- Comparison and logical operators in `WHERE` clause.
SELECT * FROM person WHERE id = 200 OR id = 300 ORDER BY id;
+---+----+----+
| id|name| age|
+---+----+----+
|200|Mary|null|
|300|Mike|  80|
+---+----+----+

-- IS NULL expression in `WHERE` clause.
SELECT * FROM person WHERE id > 300 OR age IS NULL ORDER BY id;
+---+----+----+
| id|name| age|
+---+----+----+
|200|Mary|null|
|400| Dan|  50|
+---+----+----+

-- Function expression in `WHERE` clause.
SELECT * FROM person WHERE length(name) > 3 ORDER BY id;
+---+----+----+
| id|name| age|
+---+----+----+
|100|John|  30|
|200|Mary|null|
|300|Mike|  80|
+---+----+----+

-- `BETWEEN` expression in `WHERE` clause.
SELECT * FROM person WHERE id BETWEEN 200 AND 300 ORDER BY id;
+---+----+----+
| id|name| age|
+---+----+----+
|200|Mary|null|
|300|Mike|  80|
+---+----+----+

-- Scalar Subquery in `WHERE` clause.
SELECT * FROM person WHERE age > (SELECT avg(age) FROM person);
+---+----+---+
| id|name|age|
+---+----+---+
|300|Mike| 80|
+---+----+---+

-- Correlated Subquery in `WHERE` clause.
SELECT * FROM person AS parent
    WHERE EXISTS (
        SELECT 1 FROM person AS child
        WHERE parent.id = child.id AND child.age IS NULL
    );
+---+----+----+
|id |name|age |
+---+----+----+
|200|Mary|null|
+---+----+----+

```

Previous

Use Database

Next

Window Functions

## ON THIS PAGE

- Syntax
- Parameters
- Examples
