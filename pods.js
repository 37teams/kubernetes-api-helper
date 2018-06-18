const k8s = require('@kubernetes/client-node')

function getPods(namespace, options = {}) {
    const {
        label,
        limit
    } = options

    return k8s.Config.defaultClient()
        .listNamespacedPod(
            namespace,
            false,
            undefined,
            undefined,
            false,
            label,
            limit
        )
        .then(pods => pods.body.items)
}

module.exports = {
    getPods
}