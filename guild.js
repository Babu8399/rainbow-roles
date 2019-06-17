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

const Colors = require('./colors.js')
const ManagedRole = require('./role.js')

const loadedGuilds = {
    /*
    <guild id>: <ManagedGuild instance>
    */
}

function getManagedGuild(guild) {
    if(loadedGuilds[guild.id]) return loadedRoles[guild.id]
    else return new ManagedRole(guild, set)
}

function ManagedGuild(guild) {
    function hasSet(set) {
        return !!ManagedRole.exists(
            guild,
            ManagedRole.name(set)
        )
    }

    async function addSet(set) {
        if(hasSet(set)) return
        await ManagedRole.get(guild, set).create()
    }

    async function removeSet(set) {
        if(hasSet(set)) return
        await ManagedRole.get(guild, set).remove()
    }

    async function update() {
        for(const set of Colors.sets) {
            const name = ManagedRole.name(set)
            
            if(!ManagedRole.exists(guild, name)) continue

            const managed = ManagedRole.get(guild, set)
            await managed.update()
        }
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
