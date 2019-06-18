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
const Colors = require('./colors.js')
const ManagedRole = require('./role.js')

const log = Debug('guild')
const updateLog = Debug('update-guild')

const loadedGuilds = {
    /*
    <guild id>: <ManagedGuild instance>
    */
}

function getManagedGuild (guild) {
    if (loadedGuilds[guild.id]) {
        return loadedGuilds[guild.id]
    } else {
        log(`Guild ${guild.id} was not found in loadedGuilds, creating new`)
        return new ManagedGuild(guild)
    }
}

function ManagedGuild (guild) {
    function hasSet (set) {
        return !!ManagedRole.exists(guild, ManagedRole.name(set))
    }

    async function addSet (set) {
        if (hasSet(set)) return
        log(`Adding ManagedRole for set ${set} into guild ${guild.id}`)
        await ManagedRole.get(guild, set).create()
    }

    async function removeSet (set) {
        if (hasSet(set)) return
        log(`Removing ManagedRole for set ${set} from guild ${guild.id}`)
        await ManagedRole.get(guild, set).remove()
    }

    async function update () {
        for (const role of guild.roles.array()) {
            if (!/rainbow-/i.test(role)) continue
        }
        /*
        updateLog(`Updating guild ${guild.id}`)

        for (const set of Colors.sets) {
            const name = ManagedRole.name(set)

            updateLog(`Attempting to update role ${name} within guild ${guild.id}`)

            if (!ManagedRole.exists(guild, name)) {
                updateLog('Role did not exist within guild')
                continue
            }

            const managed = ManagedRole.get(guild, set)
            await managed.update()

            updateLog(`Update complete for role ${name}`)
        }
        */
    }

    Object.assign(this, {
        hasSet,
        addSet,
        removeSet,
        update
    })

    loadedGuilds[guild.id] = this
}

Object.defineProperty(ManagedGuild, 'get', {
    value: getManagedGuild,
    writable: false
})
Object.freeze(ManagedGuild)

module.exports = ManagedGuild
