/*
 * Discord Rainbow Roles
 *
 * sets.js :: Get color sets from role names
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

const Debug = require('debug')
const { schemes, colors } = require('./colors.js')

const log = Debug('colors')
const buildLog = Debug('scheme-build')

const regexSets = [
    /*
    [
        <regular expression>,
        [
            <hex color>,
            <hex color>
        ]
    ]
    */
]

for (const name of Object.keys(schemes)) {
    regexSets.push([
        new RegExp(`^${name}`, 'i'),
        schemes[name].set
    ])
}
for (const color of Object.keys(colors)) {
    regexSets.push([
        new RegExp(`^${color}`, 'i'),
        [colors[color]]
    ])
}
Object.freeze(regexSets)
log(`generated color sets with ${regexSets.length} entries`)

const schemeCache = {
    /*
    <set string>: <scheme>
    */
}

function Set (set) {
    if (schemeCache[set]) return schemeCache[set]

    const originalSet = set + ''

    set = set.replace(/-/g, '')

    if (!/^[a-zA-Z]+$/.test(set)) throw new Error('Bad set, must match /^[a-zA-Z]+$/')

    let scheme = []

    while (true) {
        let bestMatch = null

        buildLog(`building next section for ${originalSet} from ${set}`)

        for (const pair of regexSets) {
            const regex = pair[0]
            const colors = pair[1]

            const replaced = set.replace(regex, '')
            if (replaced !== set) {
                if (
                    !bestMatch ||
                    bestMatch[0].length >= /* > */ replaced.length
                ) {
                    bestMatch = [
                        replaced,
                        colors
                    ]
                    buildLog(`new best match for ${set} with ${regex}`)
                }
            }
        }

        if (!bestMatch) break // Break if no sequences matched

        set = bestMatch[0]
        scheme = scheme.concat(bestMatch[1])
    }

    if (!scheme.length) {
        throw new Error(`Bad set '${set}', matched nothing`)
    }
    if (set) {
        throw new Error(`Bad set, matches but remaining sequence '${set}' is not valid`)
    }

    buildLog(`built scheme ${scheme} for set ${originalSet}`)

    schemeCache[set] = scheme

    return scheme
}

Object.defineProperty(Set, 'colors', { value: colors })
Object.defineProperty(Set, 'schemes', { value: schemes })
Object.freeze(Set)

module.exports = Set
