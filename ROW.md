### [AFNum](README.md)
# Row


### .number
Returns the index or number representation of this row.

### .string
Returns the string representation of this row. It is a numeric.

### .increment(Number)
Returns a new *Row* whose index is greater than this index by *Number*.

### .compare(Row) | .compare(String)
- Returns a positive integer if the index of *Column* is greater than this column's index.
- Returns a negative integer if it is less than.
- Returns zero if they are equal.

This function can accept either the *Row* or the string representation of the *Row*.

### .hasCell(Cell) | .hasCell(String)
Returns true if *Cell* is within this Row. Returns false if otherwise.

This function can accept either the *Cell* or the string representation of the *Cell*.

### .cellsInRange(Range) || .cellsInRange(String)
Returns a collection of cells in this row within *Range*.

This function can accept either the *Range* or the string representation of the *Range*.
