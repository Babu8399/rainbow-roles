![](logo.png)
# Discord Rainbow Roles Bot
Make your Discord server roles (usernames) change color in real time!

Developed as a Discord bot programming exercise, this Discord bot allows server admins to create special roles that let users have **color changing names**!
Simple add a new role named `"rainbow-(colors or color sets)"` and the bot will automatically start cycling colors for that role.
Note that this bot will also spam your server's audit log with "updated role" as it has to update all rainbow roles every few seconds.

~~Click [here](https://discordapp.com/api/oauth2/authorize?client_id=591131468688916497&permissions=268487680&scope=bot) to invite this bot to your server.~~ Bot might be disabled, see [this tweet by @discordapp](https://twitter.com/discordapp/status/1055182857709256704).

Use "@Rainbow Roles help" to get help using the bot.

## Setup
Tested on Linux 5.1.7-300.fc30.x86_64 (Fedora 30) with Node.js v10.15.3 and NPM v6.4.1.

#### Required Software
 * Node.js
 * NPM

#### Terminal Commands
```bash
git clone https://github.com/jackm-xyz/rainbow-roles  # Clone the repository
echo '{"token":"DISCORD BOT TOKEN HERE"}' > token.json  # Set your bot's login token
npm install  # Install required packages
npm start  # Start the bot
```

## Authors
Made with ❤ by Jack MacDougall ([jackmacdougall.com](https://jackm.xyz/))


## License
This project is licensed under [MIT](LICENSE).
More info in the [LICENSE](LICENSE) file.

*"A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use."* - [tl;drLegal](https://tldrlegal.com/license/mit-license)
