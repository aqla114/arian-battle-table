import { credentials } from '@grpc/grpc-js';
import { ArianrodClient } from '../../../protogen/arianrod_grpc_pb';
import { GetGuildCharactersRequest, GetGuildCharactersResponse } from '../../../protogen/arianrod_pb';

export type RequestParams = {
    guildId: string;
};

export class GrpcClient {
    private endpoint: string;

    public constructor(serverUrl: string, port: number) {
        this.endpoint = `${serverUrl}:${port}`;
    }

    public async getCharacterByGuildId(guildId: string): Promise<GetGuildCharactersResponse.AsObject | null> {
        const request = new GetGuildCharactersRequest();
        const client = new ArianrodClient(this.endpoint, credentials.createInsecure(), {});
        request.setGuildId(guildId.toString());

        return new Promise((resolve, reject) => {
            client.getGuild(request, (error, response) => {
                if (error) {
                    console.error(error);
                    return reject(null);
                }

                return resolve(response.toObject());
            });
        });
    }
}
