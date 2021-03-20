const { override } = require('customize-cra');
const WorkerPlugin = require('worker-plugin');

const addWorker = config => {
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
    })
    config.module.rules.push({
        test: /\.worker\.ts$/,
        use: { loader: 'worker-loader' }
    })
    config.plugins.push(new WorkerPlugin());
    return config;
}

module.exports = override(addWorker)