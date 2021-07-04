// package:
// file: arianrod.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import { handleClientStreamingCall } from '@grpc/grpc-js/build/src/server-call';
import * as arianrod_pb from './arianrod_pb';

interface IArianrodService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getGuild: IArianrodService_IGetGuild;
}

interface IArianrodService_IGetGuild
    extends grpc.MethodDefinition<arianrod_pb.GetGuildCharactersRequest, arianrod_pb.GetGuildCharactersResponse> {
    path: '/Arianrod/GetGuild';
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<arianrod_pb.GetGuildCharactersRequest>;
    requestDeserialize: grpc.deserialize<arianrod_pb.GetGuildCharactersRequest>;
    responseSerialize: grpc.serialize<arianrod_pb.GetGuildCharactersResponse>;
    responseDeserialize: grpc.deserialize<arianrod_pb.GetGuildCharactersResponse>;
}

export const ArianrodService: IArianrodService;

export interface IArianrodServer extends grpc.UntypedServiceImplementation {
    getGuild: grpc.handleUnaryCall<arianrod_pb.GetGuildCharactersRequest, arianrod_pb.GetGuildCharactersResponse>;
}

export interface IArianrodClient {
    getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
    getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        metadata: grpc.Metadata,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
    getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        metadata: grpc.Metadata,
        options: Partial<grpc.CallOptions>,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
}

export class ArianrodClient extends grpc.Client implements IArianrodClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
    public getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        metadata: grpc.Metadata,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
    public getGuild(
        request: arianrod_pb.GetGuildCharactersRequest,
        metadata: grpc.Metadata,
        options: Partial<grpc.CallOptions>,
        callback: (error: grpc.ServiceError | null, response: arianrod_pb.GetGuildCharactersResponse) => void,
    ): grpc.ClientUnaryCall;
}
