/*
 * Discord Rainbow Roles
 *
 * discord.js :: Communicate with Discord servers via the Discord.js API
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
const Discord = require('discord.js')
const ManagedGuild = require('./guild.js')
const { token } = require('./token.json')
const { interval } = require('./config.json')

const log = Debug('bot')
const updateLog = Debug('bot-update')

const bot = new Discord.Client()

module.exports = bot

bot.on('disconnect', event => {
    log('bot disconnected from discord', event)
    process.exit(1)
})
bot.on('rateLimit', (info, limit, timeDiff, path, method) => {
    log('bot hit rate limit', info)
})
bot.on('error', err => {
    log('bot thrown error', err)
})
bot.on('warn', warning => {
    log('bot thrown warning', warning)
})

bot.on('guildCreate', guild => {
    log(`bot joined guild ${guild.id} (${guild.name})`)
    // TODO: send welcome message n guild
})

bot.on('message', message => {})

function updateAll () {
    for (const guild of bot.guilds.array()) {
        updateLog(`updating guild ${guild.id} (${guild.name})`)
        const managed = ManagedGuild.get(guild)
        managed
            .update()
            .then(() => updateLog(`completed guild update ${guild.id} (${guild.name})`))
            .catch(err => log(`failed to update guild ${guild.id} (${guild.name})`, err))
    }
}
bot.on('ready', () => {
    log('bot logged into discord servers')
    setInterval(updateAll, interval * 1000)
})

bot.login(token)

log('hello, world')
