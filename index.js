// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageSelectMenu, GuildMemberRoleManager } = require('discord.js');
require('dotenv').config();

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
						.setMinValues(0)
						.setMaxValues(3)
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Web Dev',
								description: 'Web Dev',
								value: 'Web Dev'
							},
							{
								label: 'Game Dev',
								description: 'Game Dev',
								value: 'Game Dev'
							},
							{
								label: 'AI',
								description: 'AI',
								value: 'AI'
							}
						]),
				);
			await command.reply({ content: 'Select some topic-based roles!', components: [row] });
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
client.login(process.env.BOT_TOKEN);