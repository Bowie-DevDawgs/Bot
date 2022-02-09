const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
	new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!')
	.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	new SlashCommandBuilder().setName('roles').setDescription('Allows users to manage their topic-based roles')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);