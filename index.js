// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageSelectMenu, GuildMemberRoleManager } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Our bot is ready to go!!!!');
});

client.on('interactionCreate', interaction => {
	console.log("We go an interactions");
	if (interaction.isCommand()) { handleCommand(interaction) }
	else if (interaction.isSelectMenu()) { handleMenu(interaction) }
});

async function handleCommand(command) {
	try {
		if(command.commandName === "echo") {
			await command.reply(command.options.getString('input'));
		} else if (command.commandName === "roles") {
			// console.log(command);
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('interests')
						.setMaxValues(5)
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Theory',
								description: 'Theory',
								value: 'Theory',
							},
							{
								label: 'Web Dev',
								description: 'Web Dev',
								value: 'Web Dev',
							},
							{
								label: 'Game Dev',
								description: 'Game Dev',
								value: 'Game Dev',
							},
							{
								label: 'AI',
								description: 'AI',
								value: 'AI',
							},
							{
								label: 'Hardware',
								description: 'Hardware',
								value: 'Hardware'
							}
						]),
				);
			await command.reply({ content: 'Select your interests!', components: [row] });
			console.log("reply");
		}
	} catch (err) {
		console.log(err);
	}
}

async function handleMenu(menu) {
	if (menu.customId === "interests") {
		// console.log(menu.values);
		for (value in menu.values) {
			// console.log(menu.values[value]);
			let role = menu.guild.roles.cache.find(r => r.name === menu.values[value]);
			if (role) {
				console.log('Role Found!');
				let roleManager = new GuildMemberRoleManager();
				menu.user.roles?.add(role).catch(err => console.log(err));
				console.log(menu.user.roles);
				await menu.followUp();
			}
		}
	}
}

// Login to Discord with your client's token
client.login(token);