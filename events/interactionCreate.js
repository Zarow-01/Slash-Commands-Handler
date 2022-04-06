module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.interactions.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "> **<:Error:794197754950975528> ➜ Une erreur s\'est produite lors de l\'exécution de cette commande ! **",
        ephemeral: true,
      });
    }
  }
}
