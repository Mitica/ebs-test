
import test from 'ava';
import { uniq } from './utils';

test('uniq', t => {
    t.deepEqual(uniq([1, 1, 1, 2, 2]), [1, 2], 'unique numbers');
    t.deepEqual(uniq(["1", "1", "1", "2", "1"]), ["1", "2"], 'unique string');
});
