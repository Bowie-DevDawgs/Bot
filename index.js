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
								// value: '933556897380991047',
								value: 'Theory'
							},
							{
								label: 'Web Dev',
								description: 'Web Dev',
								// value: '933556738114867241',
								value: 'Web Dev'
							},
							{
								label: 'Game Dev',
								description: 'Game Dev',
								// value: '933556860001329192',
								value: 'Game Dev'
							},
							{
								label: 'AI',
								description: 'AI',
								// value: '933556601942589460',
								value: 'AI'
							},
							{
								label: 'Hardware',
								description: 'Hardware',
								// value: '935314829059711056'
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
	try {
		if (menu.customId === "interests") {
			const roleManager = new GuildMemberRoleManager(menu.member);
			// console.log(menu);
			const roles = await menu.values.forEach((value, idx) => {
				let roleObject = menu.member.guild.roles.cache.find(role => role.name === value);
				// console.log("\nRole " + idx + ":", roleObject);
				roleManager.add(roleObject)
			});
			menu.reply({content: "Your roles have been updated"});
		}
	} catch (err) {
		console.log(err.message);
		menu.reply({content: "Something went wrong :("});
	}
}

// Login to Discord with your client's token
client.login(token);