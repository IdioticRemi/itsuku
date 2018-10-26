// Dependences

var Discord = require('discord.js');
var Enmap = require('enmap');
var Provider = require('enmap-rethink');

// Client

var client = new Discord.Client();

// Additional Imports [ Files | Folders ]

var config = require('./config.json');
var infos = require('./package.json');
var funcs = require('./Utilitaires/functions.js')(client);

// Variables

client.config = config;
client.infos = infos;

client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({
    provider: new Provider({
        dbName: 'settings',
        name: 'settings'
    })
});
client.userlist = new Enmap({
    provider: new Provider({
        dbName: 'userlist',
        name: 'userlist'
    })
});

client.customs = new Enmap({
    provider: new Provider({
        dbName: 'customs',
        name: 'customs'
    })
});

client.locales = new Enmap();
client.queue = new Map();

// AutoRestart every 2 days (only with PM2)

setTimeout(() => process.exit(), 172800000);

// Start

client.InitItsuku();