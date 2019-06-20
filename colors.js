/*
 * Discord Rainbow Roles
 *
 * colors.js :: Color schemes and color codes
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

const TitleCase = require('titlecase')
const ColorConvert = require('color-convert')

// Color schemes (complete sets)
const schemes = {
    // Pride flag colors,
    // using color data from https://commons.wikimedia.org/wiki/File:Gay_Pride_Flag.svg.
    pride: {
        set: [
            '#e40303', // Red
            '#ff8c00', // Orange
            '#ffed00', // Yellow
            '#008026', // Green
            '#004dff', // Blue
            '#750787' // Purple
        ],
        name: 'Pride LGBT Flag'
    },

    // Pride flag colors,
    // using color data from https://commons.wikimedia.org/wiki/File:Flag_of_LGBT_(Verdtone).svg.
    prideverdtone: {
        set: [
            '#ed1d24', // Red
            '#f69322', // Orange
            '#fff470', // Yellow
            '#006642', // Green
            '#003380', // Blue
            '#643767' // Purple
        ],
        name: 'Pride LGBT Flag (Verdtone)'
    },

    // Pride flag colors,
    // slightly adjusted for Discord's dark theme.
    prideadj: {
        set: [
            '#ff3e3e', // Red
            '#e67e22', // Orange
            '#f1c40f', // Yellow
            '#2ecc71', // Green
            '#3498db', // Blue
            '#9b59b6' // Purple
        ],
        name: 'Pride LGBT Flag (Discord Adjusted)'
    }
}

// Colors for custom rainbow sets
const colors = {
    // Discord colors
    teal: '#1abc9c',
    green: '#2ecc71',
    blue: '#3498db',
    purple: '#9b59b6',
    pink: '#e91e63',
    yellow: '#f1c40f',
    orange: '#e67e22',
    red: '#e74c3c',

    // Monochrome
    black: '#010101',
    grey: '#95a5a6',
    gray: '#95a5a6',
    white: '#ffffff',

    // Vivid
    vred: '#f70d1a',
    vorange: '#ff5f00',
    vyellow: '#ffe302',
    vgreen: '#a6d608',
    vblue: '#00aaee',
    vpurple: '#9f00ff'
}

Object.freeze(schemes)
Object.freeze(colors)

function colorTitle (key) {
    return TitleCase(key.replace(/^v/, 'vivid '))
}
function colorToEnglish (color) {
    return `${color.toUpperCase()} (${TitleCase(ColorConvert.hex.keyword(color))})`
}

Object.freeze(colorTitle)
Object.freeze(colorToEnglish)

module.exports = {
    schemes,
    colors,
    colorTitle,
    colorToEnglish
}
Object.freeze(module.exports)
