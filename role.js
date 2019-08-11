/*
 * Discord Rainbow Roles
 *
 * role.js :: Handle Discord roles
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
const Set = require('./sets.js')
const UpdateColor = require('./updatecolor.js')

const log = Debug('role')
const verboseLog = Debug('role-built')

function ManagedRole (role) {
    log(`trying to manage role ${role.id} (${role.name})`)

    let scheme
    let lastRoleName = ''

    function buildScheme () {
        if (!/^rainbow-[a-zA-Z]+$/i.test(role.name)) {
            log(`role ${role.id} (${role.name}) does not match /^rainbow-[a-zA-Z]+$/i`)
            throw new Error('Role not managable')
        }
        verboseLog(`role ${role.id} (${role.name}) on guild ${role.guild.id} ${role.guild.name} is being compiled`)
        scheme = Set(role.name.replace(/^rainbow-/i, ''))
        if (!scheme) {
            verboseLog(`role ${role.id} (${role.name}) did not compile`)
            log(`role ${role.id} (${role.name}) is not a valid set`)
            throw new Error('Role does not have a valid set')
        }
        verboseLog(`role ${role.id} (${role.name}) compiled successfully!`)
        log(`role ${role.id} (${role.name}) has built a scheme and is manageable`)
        lastRoleName = role.name
    }
    buildScheme()

    let index = -1

    async function update () {
        if (lastRoleName !== role.name) buildScheme()
        log(`updating role ${role.id} (${role.name})`)
        index++
        if (index >= scheme.length) index = 0
        if (index < 0) index = 0
        await UpdateColor(role.guild.id, role.id, scheme[index])
    }

    Object.defineProperties(this, {
        scheme: { value: scheme },
        role: { value: role },
        update: { value: update }
    })
}
Object.freeze(ManagedRole)

module.exports = ManagedRole
