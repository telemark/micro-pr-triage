'use strict'

const axios = require('axios')
const buildPayload = require('./build-payload')

module.exports = data => {
  return new Promise((resolve, reject) => {
    if (data.action === 'opened' && data.user === 'greenkeeper[bot]' && data.assignees.length === 0) {
      const payload = buildPayload(data)
      let labels = payload.data.labels
      if (!data.pkg.private) {
        labels.push('npm')
      }

      axios.defaults.headers.common['Authorization'] = payload.headers.authorization
      axios.defaults.headers.common['User-Agent'] = payload.headers.userAgent
      axios.defaults.headers.common['Accept'] = payload.headers.accept

      axios.post(`${payload.url}/labels`, labels)
        .then(result => resolve({action: 'labeled', success: true, response: result.data}))
        .catch(error => reject(error))
    } else {
      const result = {
        action: 'nothing'
      }
      resolve(result)
    }
  })
}
