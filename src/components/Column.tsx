const hotFormula = require('hot-formula-parser');

export default function Column({ index }: { index: number }) {
  return hotFormula?.columnIndexToLabel(String(index));
}
