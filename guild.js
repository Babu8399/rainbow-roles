/*
 * Discord Rainbow Roles
 *
 * guild.js :: Manage Discord guilds and the color ranks within guilds
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
const ManagedRole = require('./role.js')

const log = Debug('guild')
const updateLog = Debug('guild-update')

const loadedGuilds = {
    /*
    <guild id>: <ManagedGuild instance>
    */
}

function getManagedGuild (guild) {
    if (!loadedGuilds[guild.id]) {
        log(`guild ${guild.id} (${guild.name}) is not loaded, creating new ManagedGuild`)
        loadedGuilds[guild.id] = new ManagedGuild(guild)
    }
    return loadedGuilds[guild.id]
}

function ManagedGuild (guild) {
    let roles

    function buildRoles () {
        updateLog(`building roles for guild ${guild.id} (${guild.name})`)

        if (!roles) roles = {}
        const newRoles = {}

        for (const role of guild.roles.array()) {
            if (!roles[role.id]) {
                try {
                    updateLog(`attempting to update role ${role.id} (${role.name})`)
                    roles[role.id] = new ManagedRole(role)
                } catch (err) {
                    updateLog(`failed to update role ${role.id} (${role.name}) on ${guild.id} (${guild.name}), not manageable`, err.message)
                    continue
                }
            }
            newRoles[role.id] = roles[role.id]
        }

        roles = newRoles
    }

    async function update () {
        buildRoles()
        for (const role of Object.values(roles)) {
            try {
                await role.update()
            } catch (err) {
                updateLog(`failed to update role ${role.id} (${role.name}) on ${guild.id} (${guild.name}), update failed`, err.message)
            }
        }
    }

    Object.defineProperties(this, {
        roles: { value: roles },
        update: { value: update }
    })

    log(`guild ${guild.id} (${guild.name}) loaded`)
}

Object.defineProperty(ManagedGuild, 'get', {
    value: getManagedGuild
})
Object.freeze(ManagedGuild)

module.exports = ManagedGuild
