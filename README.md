# @picktub/lot

**@picktub/lot** pick the something item which in the set(Array).

## How to use
```js
import { Lot } from '@picktub/lot';

const lot = new Lot({ set: [1, 2, 3, 4, 5] });
const picked = lot.pick({k:4})
console.log(picked);
```