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

const Colors = require('./colors.js')

const loadedRoles = {
    /*
    <guild id>: {
        <set name>: <ManagedRole instance>
    }
    */
}

function getManagedRole(guild, set) {
    if (
        loadedRoles[guild.id] &&
        (loadedRoles[guild.id] || {})[set]
    ) return loadedRoles[guild.id][set]
    else return new ManagedRole(guild, set)
}

function ManagedRole(guild, set) {
    const scheme = Colors(set)

    let role

    function name() {
        return `rainbow-${set}`
    }

    async function create() {
        role = await guild.createRole(
            {
                name: name(),
                color: scheme[0] || '#FFFFFF',
                host: false,
                // position: guild.members.get(bot.user.id).highestRole.position - 1,
                permissions: 0,
                mentionable: false
            },
            `Created role to represent color set ${set}, it will be updated by this bot. It has no permissions.`
        )
    }

    async function find() {
        role = guild.roles.find(role => role.name === name())
        if (role) return role

        await create()
        return role
    }

    async function update() {
        const role = await find()
        // TODO: Cycle current color
    }

    async function remove() {
        const role = await find()
        // TODO: Delete role and object properties
    }

    Object.assign(this, {
        create,
        find,
        update,
        remove
    })
}

Object.defineProperty(ManagedRole, 'get', {
    value: getManagedRole,
    writable: false
})
Object.freeze(ManagedRole)

module.exports = ManagedRole
