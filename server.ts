import * as express from "express";
import api from "./api";

export const createServer = () => {
    const app = express();
    app.use(express.json());

    var ipservers = {};

    app.post("/authenticate", async (req, res) => {
        const response = await api.redeem(req.body.username);
        res.send({
            accessToken: response.session,
            clientToken: req.body.clientToken,
            availableProfiles: [
                {
                    agent: req.body.agent.name,
                    id: response.mcName,
                    name: response.mcName,
                    userId: response.mcName,
                    createdAt: 0,
                    legacyProfile: false,
                    suspended: false,
                    paid: true,
                    migrated: false,
                },
            ],
            selectedProfile: {
                agent: req.body.agent.name,
                id: response.mcName,
                name: response.mcName,
                userId: response.mcName,
                createdAt: 0,
                legacyProfile: false,
                suspended: false,
                paid: true,
                migrated: false,
            },
            user: {
                id: response.mcName,
                email: response.mcName,
                username: response.mcName,
                registerIp: "192.168.1.*",
                migratedFrom: "minecraft.net",
                migratedAt: 0,
                registeredAt: 0,
                passwordChangedAt: 0,
                dateOfBirth: 0,
                suspended: false,
                blocked: false,
                secured: true,
                migrated: false,
                emailVerified: true,
                legacyUser: false,
                verifiedByParent: false,
                properties: [],
            },
        });
    });
    app.post("/validate", async (req, res) => {
        res.status(403).send();
    });
    app.post("/refresh", async (req, res) => {
        res.status(403).send();
    });
    app.post("/session/minecraft/join", async (req, res) => {
        const response = await api.join({
            session: req.body.accessToken,
            serverId: req.body.serverId,
        });
        if (true) {
            res.status(204).send();
        } else {
            res.status(403).send();
        }
    });
    app.post("/setserver", async (req, res) => {
        const headers = req.headers['x-forwarded-for'] as string;
        ipservers[headers.split(",")[0]] =
            req.body.server;
        res.send({ success: true });
    });
    return app;
};
