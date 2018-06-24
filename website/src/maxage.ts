import { Response } from "express";
// const ms = require('ms');


// const isProduction = process.env.NODE_ENV === 'production';
const NO_CACHE = 'private, max-age=0, no-cache';
// const PUBLIC_CACHE = 'public, max-age=';
const CACHE_CONTROL = 'Cache-Control';

/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
export function maxage(res: Response, _maxage: number) {
    // maxage = 0;
    var cache = NO_CACHE;
    // if (isProduction && maxage > 0) {
    //     cache = PUBLIC_CACHE + (maxage * 60);
    // }
    res.set(CACHE_CONTROL, cache);
}
