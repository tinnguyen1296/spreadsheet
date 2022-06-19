var hotFormula = require('hot-formula-parser');

export function getColumnName(idx: number) {
  return hotFormula?.columnIndexToLabel(String(idx));
}
