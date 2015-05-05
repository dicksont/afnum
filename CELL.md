### [AFNum](README.md)
# Cell

## .string
Returns the string representation of this cell.

## .row
Returns the *Row* object of this cell.

## .column
Returns the *Column* object of this cell.

## .inColumn(Column) | .inColumn(String)
Returns **true** if this cell is within *Column*. Otherwise, returns **false**. This function can accept either the *Column* or the *Column* label.

## .inRow(Row) | .cellsInRange(Number)
Returns **true** if this cell is within *Row*. Otherwise, returns **false**. This function can accept either the *Row* or the *Row* index.

## .hasCell(Cell) | .hasCell(String)
Returns **true** if cells are equivalent. Otherwise, returns **false**. This function can accept either the *Cell* or the *Cell* label.

## .increment(Number) | .increment(Number, Number)
Returns a new cell whose row index is greater than this cell's by *Number*

OR

Returns a new cell whose row index is greater than this cell's by the first *Number* and whose column index is greater than this cell's by the second *Number*.

e.g.

```javascript
this_cell.increment(1) == this_cell.increment(1,0)
```

## .cellsInRange(Range) | .cellsInRange(String)
Returns a collection of cells that is within *Range*. This function can accept either the *Range* or the string representation of the *Range*.
