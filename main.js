const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGES,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_MEMBERS,
    ],
});
const fs = require('fs');

client.login(require('./token.json').token);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.interactions = new Discord.Collection();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.on('ready', () => {
    const statuses = [
        () => `By WiiZ [ツ]™#3936`,
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'STREAMING', url: 'https://twitch.tv/Nasa'})
        i = ++i % statuses.length
    }, 1e4)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
  
    try {
      await command.execute(interaction, client, config);
    } catch (error) {
      console.error(error);
      const embed = new client.discord.MessageEmbed()
      .setDescription(`**➜ ERREUR ! \`\`\`Une erreur se produit lorsque cette commande est exécuté !\`\`\`**`)
      .setColor("#2F3136")
      return interaction.reply({
        embeds: [embed]
        });
    };
});