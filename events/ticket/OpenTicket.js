const {
    ActionRowBuilder,
    ChannelType,
    Colors,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require('discord.js');
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if (!interaction.isStringSelectMenu()) return;

        const support_team = config.support_team;

        const AlreadyChannel = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id);
        if (AlreadyChannel) {
            return interaction.reply({
                content: ":x: | You already have a ticket open!",
                ephemeral: true
            });
        }

        const categories = {
            redhood: {
                title: 'EXTERNAL RED HOOD',
                message: `FUNCIONES:
-100% indetectable
-Aimbot
-ESP personalizable
-Soporta Windows 10 y Win 11
-Controller support
-Wall hack
-Stream spoof

💰 Precios:
- Día: 8 DLS
- Semana: 18 DLS
- Mes: 30 DLS
- Lifetime: 200 DLS`
            },
            ds4: {
                title: 'DS4 WINDOWS 🎮',
                message: `🔜 AUMENTA TU AYUDA DE TIRO
🔜 ANTI RETROCESO
🔜 INCLUYE (AUTOPING, RAPID FIRE, ETC)

⬆️ DS4 BÁSICO 💵
⬆️ DS4 PREMIUM 💵

🔜 BAJAMOS EL DELAY DE TU MANDO A 0 MS
🔜 SOLO PARA MANDOS DE PLAYSTATION`
            },
            cronus: {
                title: 'CRONUS ZEN',
                message: `Si estás interesado en este servicio de **Cronus Zen**, abre un ticket y se te explicará todo detalladamente.`
            },
            sincronus: {
                title: 'SCRIPT SIN CRONUS',
                message: `💎 MOD STANDARD 💎
• Multiplicador x16 Aim Assist
• Reductor de Delay
• Puntería pegajosa débil
• Reductor de Retroceso débil

👁️‍🗨️ MOD MEDIUM 👁️‍🗨️
• x48 Aim Assist
• Disparo a la Cabeza Bajo
• Bajo Reductor de Delay
• Polar Aim Assist
• Efecto Fuerte de Puntería Pegajosa
• Disparo Pegajoso Medio
• Asistencia de Apuntado Instintiva
• Corrector de Dispersión

‼️ MOD PREMIUM ‼️
• x75 Aim Assist
• Cabeza x25
• Reductor de Delay Fuerte
• Super Disparo Pegajoso
• Asistencia de Apuntado Intuitiva
• Efecto Fuerte de Puntería Pegajosa
• Corrector de Dispersión de Bala
• Efecto Fuerte de Trackeo

💯 MOD SUPREME 💯
• x100 Aim Assist
• Disparo a la Cabeza x60
• Máximo Reductor de Delay
• Máximo Disparo Pegajoso
• Asistencia de Apuntado Máxima
• Corrector de Dispersión de Bala
• Efecto Máximo de Puntería Pegajosa
• Efecto Máximo de Trackeo`
            },
            camuflajes: {
                title: 'CAMUFLAJES 🎨',
                message: `Si estás interesado en adquirir este servicio, abre ticket y se te pondrá en contacto con un administrador, ya que los precios pueden variar.`
            }
        };

        const selection = interaction.values[0];
        const category = categories[selection];
        if (!category) return;

        // Cierra canal anterior
        interaction.channel.delete();

        interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            topic: interaction.user.id,
            type: ChannelType.GuildText,
            parent: config.ticket_category,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.SendMessages
                    ],
                    deny: [PermissionFlagsBits.MentionEveryone]
                },
                {
                    id: support_team,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.SendMessages
                    ],
                    deny: [PermissionFlagsBits.MentionEveryone]
                },
                {
                    id: interaction.guild.id,
                    deny: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.MentionEveryone
                    ]
                }
            ]
        }).then(c => {
            c.send({
                embeds: [{
                    title: `🎟️ ${category.title}`,
                    description: `${category.message}`,
                    color: Colors.Blurple,
                    footer: { text: "Ticket System" },
                    timestamp: new Date()
                }],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('close')
                            .setLabel('Close')
                            .setStyle(ButtonStyle.Danger)
                    )
                ]
            });
            c.send({
                content: `${interaction.user} <@${support_team}>`
            }).then(msg => {
                setTimeout(() => msg.delete(), 1000);
            });
        });
    }
};
