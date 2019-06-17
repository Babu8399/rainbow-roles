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
    if(
        loadedRoles[guild.id] &&
        (loadedRoles[guild.id] || {})[set]
    ) return loadedRoles[guild.id][set]
    else return new ManagedRole(guild, set)
}

function name(set) {
    return `rainbow-${set}`
}

function exists(guild, name) {
    return guild.roles.find(role => role.name === name)
}

function ManagedRole(guild, set) {
    const scheme = Colors(set)

    let index = 0

    let role

    async function create() {
        role = await guild.createRole(
            {
                name: name(set),
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
        role = exists(guild, name(set))
        if (role) return role

        await create()
        return role
    }

    async function update() {
        const role = await find()

        index++
        if (index >= scheme.length) index = 0

        await role.setColor(scheme[index])
    }

    async function remove() {
        const role = await find()
        await role.delete()
        role = undefined
        delete role

        Object.assign(this, {
            create: undefined,
            find: undefined,
            update: undefined,
            remove: undefined
        })
        delete create
        delete find
        delete update
        delete remove

        delete this
    }

    Object.assign(this, {
        create,
        find,
        update,
        remove
    })

    if (!loadedRoles[guild.id]) loadedRoles[guild.id] = {}
    loadedRoles[guild.id][set] = this
}

Object.defineProperty(ManagedRole, 'get', {
    value: getManagedRole,
    writable: false
})
Object.defineProperty(ManagedRole, 'name', {
    value: name,
    writable: false
})
Object.defineProperty(ManagedRole, 'exists', {
    value: exists,
    writable: false
})
Object.freeze(ManagedRole)

module.exports = ManagedRole
