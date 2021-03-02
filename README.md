# easymc

API for `easymc.io`, and automatically generating and logging into alts.

[![NPM version](https://img.shields.io/npm/v/easymc.svg)](http://npmjs.com/package/easymc) [![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/nXaMaJPPvQ)

A package that allows you to use `easymc.io`'s API to generate alts, and even login to them (using a proxy auth server). It supports `mineflayer` ande `minecraft-protocol`, with builtin functionality to create clients and bots with them.

## Features

- Generating alts with the EasyMC API
- Grabbing the client settings (EasyMC version, EasyMC auth server, etc)
- Logging into servers
- Redeeming tokens and getting the full username and session.
- Creating `minecraft-protocol` clients
- Creating `mineflayer` bots

## Usage

`npm install easymc`

## Examples

#### Generating an alt

```ts
const alt = await easymc.alt();
console.log(alt.username); //Has some asterisks (*)
console.log(alt.token); //The alt token
```

#### Creating a mineflayer bot to log the chat
```ts
const bot = await easymc.createBot();
bot.on('chat', (player, message) => {
	console.log(`${player}: ${message}`);
});
```

#### Get the current EasyMC Client version

```ts
const { version } = await easymc.clientSettings();
console.log(`Current Version: ${version}`);
```

## Licence

[MIT](LICENCE)