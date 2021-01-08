const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); // use to write new command
const prefix = ('>'); // change > to any prefix you want
const token = "your_token";
const cmd = require('./command.json'); // command database
// ^ library
client.on('ready', () => {
    console.log('I am ready');
  
});
// client when ready
client.on('message', async (message,msg) => {
if (message.content.indexOf(prefix) !== 0) return;
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
        if(message.author.bot) return;
        	const cmmd = args.shift().toLowerCase();
          if (cmmd === 'add-command') {
		if (!message.member.hasPermission('MANAGE_GUILD'))
			return message.reply("You can't use that command!");
			const name = args[0];
			const reply = args.slice(1).join(' ');
			if (!name || !reply)
				return message.reply(`||${prefix}add-command + commandname + reply||`);
			else {
				if (!cmd[name])
					cmd[name] = {
					
						msg: reply
					};
				fs.writeFile('./command.json', JSON.stringify(cmd), x => {
					if (x) console.error(x);
				});
				let embed = new Discord.MessageEmbed()
					.setTitle(`:white_check_mark: Successfully Made Custom Command`)
					.setTimestamp();
				message.channel.send(embed);
				return;
			}
		
	
		return;
	}else {
		if (!cmd[cmmd]) {
			return console.log(`no command found`;
					   // or somthing you want
		}
		if (cmd[cmmd]) {
      let command = cmd[cmmd];
			message.channel.send(`${command.msg}`);
			return;
		}
	}
});
client.login(process.env.TOKEN);
	// login
