/* eslint-disable */

// because of some weird react/dev/webpack/something quirk
// @ts-ignore
self.$RefreshReg$ = () => {};
// @ts-ignore
self.$RefreshSig$ = () => () => {};

const createWorkerApp = require('rgg-engine').createWorkerApp
const WorkerApp = require('./components/WorkerApp').WorkerApp

createWorkerApp(WorkerApp)