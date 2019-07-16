import { Lot } from '../dist';
// const { Lot } = require('../dist');

console.log(Lot);

const lot = new Lot({ set: [1, 2, 3, 4, 5] });

console.log(lot.pick({k:4}));
