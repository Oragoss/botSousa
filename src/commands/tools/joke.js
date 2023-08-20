const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Returns with a joke!'),
    async execute(interaction) {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit", {credentials:"include"});
        const result = await response.json();
        
        if(result.joke) {
            await interaction.reply({
                content: `${result.joke}`
            });
        } else {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            const embed = new EmbedBuilder()
            .setTitle(`${result.setup}`)
            .setDescription(`${result.delivery}`)
            .setColor(`${randomColor}`)
            .setTimestamp(Date.now());
                                
            await interaction.reply({
                embeds: [embed]
            });
        }
    }
}