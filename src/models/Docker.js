import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const listAll = async () => {
    try {
        const containers = await docker.listContainers({ all: true });
        return containers.map(c => ({
            id: c.Id,
            name: c.Names[0].replace('/', ''),
            image: c.Image,
            state: c.State,
            status: c.Status
        }));
    } catch (err) {
        throw new Error("Falha ao acessar socket do Docker: " + err.message);
    }
};

export const startContainer = async (id) => {
    try {
        const container = docker.getContainer(id);
        return await container.start();
    } catch (err) {
        throw new Error("Erro ao iniciar container: " + err.message);
    }
};

export const stopContainer = async (id) => {
    try {
        const container = docker.getContainer(id);
        return await container.stop();
    } catch (err) {
        throw new Error("Erro ao parar container: " + err.message);
    }
};