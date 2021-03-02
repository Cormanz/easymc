# easymc

API for `easymc.io`, allowing you to automatically redeem alts from their tokens with EasyMC.

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

#### Creating a mineflayer bot to log the chat
```ts
const bot = await easymc.createBot(token);
bot.on('chat', (player, message) => {
	console.log(`${player}: ${message}`);
});
```

#### Get the current EasyMC Client version

```ts
const { version } = await easymc.clientSettings();
console.log(`Current Version: ${version}`);
```

#### Note

This package no longer allows you to generate alts since the captcha timeout was increased to 30 seconds.

## Licence

[ISC](LICENCE)