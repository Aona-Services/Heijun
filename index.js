console.clear()
console.log(
  'Heijun — Aona auto level selfbot\n————————————————————————————————————————'
)
let config
try {
  config = require('./config.json')
} catch (e) {
  return console.log(
    'Failed to start\n————————————————————\nRENAME config.json.example TO config.json'
  )
}

const Discord = require('discord.js')
const client = new Discord.Client({
  messageCacheMaxSize: 1,
  messageCacheLifetime: 1,
  messageSweepInterval: 5,
  disabledEvents: [
    'GUILD_UPDATE',
    'GUILD_MEMBER_ADD',
    'GUILD_MEMBER_REMOVE',
    'GUILD_MEMBER_UPDATE',
    'GUILD_MEMBERS_CHUNK',
    'GUILD_ROLE_CREATE',
    'GUILD_ROLE_DELETE',
    'GUILD_ROLE_UPDATE',
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
    'CHANNEL_UPDATE',
    'CHANNEL_PINS_UPDATE',
    'MESSAGE_CREATE',
    'MESSAGE_DELETE',
    'MESSAGE_DELETE_BULK',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'USER_UPDATE',
    'USER_NOTE_UPDATE',
    'USER_SETTINGS_UPDATE',
    'PRESENCE_UPDATE',
    'VOICE_STATE_UPDATE',
    'TYPING_START',
    'VOICE_SERVER_UPDATE',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE'
  ],
  http: {
    version: 8,
    api: 'https://discord.com/api'
  }
})

/* CREDITS GOES TO FWEAK (https://github.com/Fweak)*/
// noinspection JSUnresolvedVariable
client.rest.userAgentManager.userAgent =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.12 Chrome/83.0.4103.122 Electron/9.3.1 Safari/537.36'
client.options.ws.properties = {
  $os: process ? process.platform : 'Linux',
  $browser: 'Discord Client',
  $device: 'Discord Client',
  $referrer: '',
  $referring_domain: ''
}

client.on('ready', () => {
  console.log(`User: ${client.user.tag}
ID: ${client.user.id}
Servers: ${client.guilds.size}
————————————————————————————————————————`)

  console.log('Searching channel to level up')
  const channel = client.channels.find(x => x.id === config.channel)
  if (!channel)
    return console.log(
      `Can\'t find channel with ID ${config.channel} (Make sure you input correct Channel ID)`
    )
  console.log(`Found channel [${channel.name}] to level up!`)
  setInterval(() => {
  channel.send(Math.random().toString(16).slice(2)).catch(e => {
    console.log(`[ERROR] Failed to sending message [${e}]`)
  })
  }, 65000)
})

client.login(config.token).catch(() => {
  console.log(
    'Token invalid. Are you sure you already filled token in config.json?'
  )
})
