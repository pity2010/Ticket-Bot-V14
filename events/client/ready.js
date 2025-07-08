const colors = require('colors');
const config = require('../../settings/config');
const { ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) is ready!`.green);

        const channelTicket = client.channels.cache.get(config.ticket_channel);
        await channelTicket.send({ content: "." });
        await channelTicket.bulkDelete(2);

        await channelTicket.send({
            embeds: [{
                title: "🕹️ **WARZONE UNDERGROUND - Ticket System**",
                description: "Welcome to **WARZONE UNDERGROUND**! Need help or have an issue? Click the button below to open a ticket and our support team will assist you shortly. ⚡",
                color: Colors.Blurple,
                footer: {
                    text: "WARZONE UNDERGROUND | Support Team",
                },
                timestamp: new Date(),
            }],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket')
                        .setLabel('🎟️ Open a ticket')
                        .setStyle(ButtonStyle.Secondary)
                )
            ]
        });
    }
};
