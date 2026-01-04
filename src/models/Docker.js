import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const listAll = async () => {
    const containers = await docker.listContainers({ all: true });
    return containers.map(c => ({
        id: c.Id,
        name: c.Names[0].replace('/', ''),
        image: c.Image,
        state: c.State, // running, exited, etc.
        status: c.Status
    }));
};

export const startContainer = async (id) => {
    const container = docker.getContainer(id);
    return await container.start();
};

export const stopContainer = async (id) => {
    const container = docker.getContainer(id);
    return await container.stop();
};