// global window.CONFIG

const config = window.CONFIG.ui
const endpoint = `${config.host}${config.port === 80 ? '' : `:${config.port}`}${config.path}`

let basePath, wsPath

// rest API path
if (config.ssl) {
  basePath = `https://${endpoint}`
} else {
  basePath = `http://${endpoint}`
}
const restPath = basePath + 'api/'

// ws API path
if (config.ssl) {
  wsPath = `wss://${endpoint}api`
} else {
  wsPath = `ws://${endpoint}api`
}

export {
  wsPath,
  restPath,
  basePath
}
