### [AFNum](README.md)
# Column

### .number
Returns the index or the number representation of this column.

### .string
Returns the string representation of this column.

### .increment(Number)
Returns a new *Column* whose index is greater than this column by *Number*.

### .compare(Row) | .compare(String)
- Returns a positive integer if the index of *Column* is greater than this column's index.
- Returns a negative integer it is less than.
- Returns zero if they are equal.

This function can accept either the *Column* of the string representation of the *Column*

### .hasCell(Cell) | .hasCell(String)
Returns true if *Cell* is within this column. Returns false if otherwise.

This function can accept either the *Cell* or the string representation of the *Cell*.

### .cellsInRange(Range) | .cellsInRange(String)
Returns a collection of cells in this column within *Range*.

This function can accept either the *Range* or the string representation of the *Range*.
