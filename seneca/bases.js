const {
    getPods
} = require('../pods')

async function getBases(namespace, options = {}) {
    const {
        label = 'senecaBase=true'
    } = options
    const {
        portName = 'mesh'
    } = options

    const pods = await getPods(namespace, Object.assign({
        label
    }, options))

    return pods
        .map(s => ({
            host: s.status.podIP,
            port: s.spec.containers
                .map(c => c.ports.find(p => p.name === portName))
                .find(c => c)
        }))
        .filter(s => s.host && s.port)
        .map(s => `${s.host}:${s.port.containerPort}`)
}

function getFallbackBases(namespace, options = {}) {
    return getBases(
        namespace,
        Object.assign({}, options, {
            label: 'service=app',
            portName: 'mesh',
            limit: 3
        })
    )
}

module.exports = {
    getBases,
    getFallbackBases
}