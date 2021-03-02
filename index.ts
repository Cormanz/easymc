import { EasyMC } from './api';
import { createServer } from './server';

class Client extends EasyMC {
    default: this;
    Client: typeof Client;
    constructor(api: string) {
        super(api);
        this.default = this;
        this.Client = Client;
    }
    createServer() {
        return createServer();
    }
}

export = new Client('https://api.easymc.io/v1');