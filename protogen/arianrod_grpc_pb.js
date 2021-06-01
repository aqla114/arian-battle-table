// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var arianrod_pb = require('./arianrod_pb.js');

function serialize_GetGuildCharactersRequest(arg) {
  if (!(arg instanceof arianrod_pb.GetGuildCharactersRequest)) {
    throw new Error('Expected argument of type GetGuildCharactersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetGuildCharactersRequest(buffer_arg) {
  return arianrod_pb.GetGuildCharactersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetGuildCharactersResponse(arg) {
  if (!(arg instanceof arianrod_pb.GetGuildCharactersResponse)) {
    throw new Error('Expected argument of type GetGuildCharactersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetGuildCharactersResponse(buffer_arg) {
  return arianrod_pb.GetGuildCharactersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var ArianrodService = exports.ArianrodService = {
  getGuild: {
    path: '/Arianrod/GetGuild',
    requestStream: false,
    responseStream: false,
    requestType: arianrod_pb.GetGuildCharactersRequest,
    responseType: arianrod_pb.GetGuildCharactersResponse,
    requestSerialize: serialize_GetGuildCharactersRequest,
    requestDeserialize: deserialize_GetGuildCharactersRequest,
    responseSerialize: serialize_GetGuildCharactersResponse,
    responseDeserialize: deserialize_GetGuildCharactersResponse,
  },
};

exports.ArianrodClient = grpc.makeGenericClientConstructor(ArianrodService);
