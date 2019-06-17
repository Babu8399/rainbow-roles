/*
 * Discord Rainbow Roles
 * 
 * colors.js :: Load color info from the disk
 *
 * MIT License
 *
 * Copyright (c) 2019 Jack MacDougall
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const JSON5 = require('json5')
const FS = require('fs')

const schemeData =
    JSON5.parse(
        FS.readFileSync(
            'schemes.json5',
            'utf8'
        )
    )

let schemes = {}
for(const set of Object.keys(schemeData)) {
    schemes[set] = schemeData[set].set
}

function colors(set) {
    if (!schemes[set]) throw new Error(`Invalid color scheme "${set}"`)
    return schemes[set]
}

Object.defineProperty(colors, 'sets', {
    value: Object.keys(schemes),
    writable: false
})
Object.defineProperty(colors, 'schemes', {
    value: schemes,
    writable: false
})
Object.defineProperty(colors, 'info', {
    value: schemeData,
    writable: false
})
Object.defineProperty(colors, 'colors', {
    value: colors,
    writable: false
})
Object.freeze(colors)

module.exports = colors
