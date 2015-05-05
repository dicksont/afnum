### [AFNum](README.md)
# Range

### .width
Returns the number of columns in this range.

### .height
Returns the number of rows in this range.

### .size
Returns the number of cells in this range.

### .string
Returns the string representation of this range.

### .rightColumn
Returns the rightmost column of this range.

### .leftColumn
Returns the leftmost column of this range.

### .topRow
Returns the topmost row of this range.

### .bottomRow
Returns the bottom-most row of this range.

### .hasColumn(Column) | .hasColumn(String)
Returns true if *Column* is within this range. Returns false if otherwise.

This function can accept either the *Column* or the string representation of the *Column*.

### .hasRow(Row) | .hasRow(Number)
Returns true if *Row* is within this range. Returns false if otherwise.

This function can accept either the *Row* or the string representation of the *Row*.

### .hasCell(Cell) | .hasCell(String)
Returns true if *Cell* is within range. Returns false if otherwise.

This function can accept either the *Cell* or the string representation of the *Cell*.

### .rows
Returns the collection of rows from this range.

### .columns
Returns the collection of columns from this range.

### .cells
Returns the collection of cells from this range.

### .extend(Number, Number)
Returns a new range with the same start, but whose end is first *Number* cells farther from the start vertically, and second *Number* cells farther from the start horizontally.

### .cellsInRange(Range) | .cellsInRange(String)
Returns the cells from this range within *Range*.

This function can accept either *Range* or the string representation of *Range*.
