import got from 'got';
import { AltData, AltRedemption, ClientSettings, SessionJoin, SessionJoinServerHash, SessionJoinServerId } from './interfaces';
import { Bot, createBot } from 'mineflayer';
import { Client, createClient } from 'minecraft-protocol';

export const defaultProxy = 'https://easymc-serverproxy.glitch.me';

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
    async getSkin(): Promise<string> {
        return this.client.get(`/token/skin?${this.token}`, { responseType: 'text' });
    }
    /**
     * Renews this alt.
     * @deprecated Doesn't work since the renew endpoint has a captcha.
     */
    async renew() {
        return this.client.renew(this.token);
    }
    /**
     * Redeems an alt, including information like the full minecraft username and the session.
     */
    async redeem() {
        return this.client.redeem(this.token);
    }
    /**
     * Checks if this alt is expired.
     */
    async isExpired(): Promise<boolean> {
        const session = await this.redeem().then(i => i.session)
        const res = await this.client.post('/session/status', {
            json: {
                sessions: [ session ]
            }
        });
        return res[session].expired;
    }
    /**
     * Creates a client with `minecraft-protocol` that you can use to login to the alt and manage packets at a low level.
     * @param opts The options to use with `minecraft-protocol`.
     */
    createClient(opts: any) {
        const defaults = {
            username: this.token,
            password: 'Password',
            authServer: opts.proxy ?? defaultProxy,
            sessionServer: opts.proxy ?? defaultProxy
        };
        return createClient({
            ...defaults,
            ...opts
        } as any);
    }
    /**
     * Creates a bot with `mineflayer` that you can use to manage the bot at a higher level.
     * @param opts The options to use with `mineflayer`.
     */
    createBot(opts: any) {
        const defaults = {
            username: this.token,
            password: 'Password',
            authServer: opts.proxy ?? defaultProxy,
            sessionServer: opts.proxy ?? defaultProxy
        };
        return createBot({
            ...defaults,
            ...opts
        } as any);
    }
}

export class EasyMC {
    api: string;
    captcha: string;
    constructor(api: string) {
        this.api = api;
        this.setCaptcha('Default');
    }
    /**
     * Sets the captcha to use for some requests
     * @deprecated
     * @param captcha The captcha to set it to
     */
    setCaptcha(captcha: string) {
        this.captcha = captcha;
        return this;
    }
    /**
     * Renews an alt from a token.
     * @deprecated Doesn't work since the renew endpoint has a captcha.
     * @param token The token to renew.
     */
    async renew(token: string) {
        const alt = await this.post('/token/renew', {
            json: {
                token
            }
        });
        return alt;
    }
    /**
     * Redeems an alt, including information like the full minecraft username and the session.
     * @param token The token to redeem.
     */
    async redeem(token: string): Promise<AltRedemption> {
        return await this.post('/token/redeem', {
            json: {
                token,
                captcha: this.captcha
            }
        });
    }
    /**
     * Generates an alt. May require you go to onto the EasyMC site first and get one so that you can refresh the captcha.
     * @param newAlt Whether to generate a new alt or use the last previously generated one
     */
    async alt(newAlt = true) {
        const alt: AltData = await this.get(newAlt ? `/token?new=true` : `/token`);

        return new Alt(this, alt);
    }
    /**
     * Sends a `GET` request to the EasyMC api on a lower level.
     * @param url The path for your request
     * @param options The options of the request
     */
    async get(url: string, options?: {}): Promise<any> {
        const req = `${this.api}${url}`;
        return got.get(req, { responseType: 'json', ...options }).then(i => i.body);
    }
    /**
     * Sends at a `POST` request to the EasyMC api on a lower level.
     * @param url The path for your request
     * @param options The options of the request
     */
    async post(url: string, options?: {}): Promise<any> {
        return got.post(`${this.api}${url}`, { responseType: 'json', ...options }).then(i => i.body);
    }
    /**
     * Gets the settings for the EasyMC client, like the version of the client.
     */
    async clientSettings(): Promise<ClientSettings> {
        return this.get('/client/settings');
    }
    /**
     * Gets the auth and session server for EasyMC.
     */
    async getAuthServer() {
        return this.clientSettings().then(i => i.authServer);
    }
    /**
     * Allows you to join a server with EasyMC.
     * @param session The session of the account trying to join.
     * @param serverId The server hash.
     */
    join(session: string, serverId: string): Promise<any>
    join(opts: SessionJoin): Promise<any>
    async join(...args: [ string, string ] | [ SessionJoin ]) {
        if (args.length === 1) {
            const [ arg ] = args;
            let server: string;
            if ((arg as SessionJoinServerId).serverId) {
                server = (arg as SessionJoinServerId).serverId;
            } else if ((arg as SessionJoinServerHash).serverHash) {
                server = (arg as SessionJoinServerHash).serverHash;
            }
            return await this.join(arg.session, server);
        }
        const [ session, serverId ]: string[] = args;
        return this.post('/session/join', {
            json: {
                session,
                serverId
            }
        });
    }
    /**
     * Sets the server with the EasyMC API. May be needed for logging in. Returns a `got` response.
     * @param server The server to login to.
     * @param proxy The proxy to login to. Defaults to the easymc proxy on glitch. You can host your own proxy with the exported `createServer()` method.
     */
    async setServer(server: string, proxy?: string) {
        proxy = proxy ?? defaultProxy;
        return await got.post(`${proxy}/setserver`, {
            json: {
                server
            }
        });
    }
    /**
     * Creates a client with `minecraft-protocol` that you can use to login to an alt and manage packets at a low level.
     * @param opts The options to use with `minecraft-protocol`.
     */
    async createClient(opts: any): Promise<Client> {
        return this.alt().then(i => i.createClient(opts));
    }
    /**
     * Creates a bot with `mineflayer` that you can use to manage the bot at a higher level.
     * @param opts The options to use with `mineflayer`.
     */
    async createBot(opts: any): Promise<Client  | Bot> {
        return this.alt().then(i => i.createBot(opts));
    }
}

const easymc = new EasyMC('https://api.easymc.io/v1');
export default easymc;