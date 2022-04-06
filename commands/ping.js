const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('The Ping WebSocket'),
    async execute(interaction, client) {
      await interaction.reply({ content: `> **🏓 Pong ! ${client.ws.ping}**`});
  },
};
