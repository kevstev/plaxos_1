'use strict';

const Hapi = require('hapi');
const sha256 = require('sha256');
const crypto = require('crypto');
const boom = require('boom');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' } );

var hashed_message = {}

server.start((err) => {
	
	if (err) {
	    throw err;
	}

	console.log(`Server running at: ${server.info.uri}`);

    });


server.route({
	method: 'GET',
	    path: '/', 
	    handler: function (request, reply) {
	    reply('Hello, world!');
	}

    });


server.route({
	method: 'POST',
	    path: '/messages', 
	    handler: function (request, reply) {
	    var hash = sha256(request.payload.message)
	    hashed_message[hash] = request.payload.message
	    var message = {"digest": hash}

	    reply(message);
	}

    });

server.route({
	method: 'GET',
	    path: '/{hash}', 
	    handler: function (request, reply) {
	    
	    if(hashed_message[request.params.hash]){
		var message= hashed_message[request.params.hash]
		reply(message)
	    }
	    else {
		reply(boom.notFound("message not found"))
	    }
		
	}

    });