export interface ClientSettings {
    version: string;
    macVersion: string;
    authServer: string;
    updateUrl: string;
    updateFile: string;
    headUrl: string;
    renderUrl: string;
}

export interface AltData {
    token: string;
    username: string;
    expiresIn: number;
    renewIn: number;
}

export interface AltRedemption {
    session: string;
    uuid: string;
    mcName: string;
    userId: string;
}

export type SessionJoin = SessionJoinServerHash | SessionJoinServerId;

export interface BaseSessionJoin {
    session: string; 
}

export interface SessionJoinServerId extends BaseSessionJoin {
    serverId: string;
}

export interface SessionJoinServerHash extends BaseSessionJoin {
    serverHash: string;
}