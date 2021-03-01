import got from 'got';

export interface AltData {
    token: string;
    username: string;
    expiresIn: number;
    renewIn: number;
}

export class Alt {
    client: EasyMC;
    data: AltData;
    token: string;
    username: string;
    constructor(client: EasyMC, data: AltData) {
        this.client = client;
        this.data = data;
        this.token = this.data.token;
        this.username = this.data.username;
    }
    getSkin(): Promise<string> {
        return this.client.get(`/skin?${this.token}`, { responseType: 'text' });
    }
}

export class EasyMC {
    api: string;
    constructor(api: string) {
        this.api = api;
    }
    async renew(token: string, captcha: string) {
        const alt: AltData = await easymc.post('/renew', {
            json: {
                token,
                captcha
            }
        });

        return new Alt(this, alt);
    }
    async alt(newAlt = true) {
        const alt: AltData = await easymc.get(newAlt ? '/?new=True' : '');

        return new Alt(this, alt);
    }
    async get(url: string, options?: {}): Promise<any> {
        return got(`${this.api}${url}`, { responseType: 'json', ...options }).then(i => i.body);
    }
    async post(url: string, options?: {}): Promise<any> {
        return got.post(`${this.api}${url}`, { responseType: 'json', ...options }).then(i => i.body);
    }
}

const easymc = new EasyMC('https://api.easymc.io/v1/token');

export const authServer = '51.68.172.243';
export const sessionServer = '51.68.172.243';
export default easymc;