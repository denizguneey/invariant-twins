# Changes to CSS Parser Algorithms

### 4.0.2

_October 1, 2026_

- `parseCommaSeparatedListOfComponentValues` now emits empty lists for cases like `foo,,bar` effectively returning 3 lists of component values instead of only 2.

[Full CHANGELOG](https://github.com/csstools/postcss-plugins/tree/main/packages/css-parser-algorithms/CHANGELOG.md)
