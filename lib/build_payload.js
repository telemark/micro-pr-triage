'use strict'

const config = require('../config')

module.exports = data => {
  const auth = 'Basic ' + new Buffer(config.GITHUB_USER + ':' + config.GITHUB_TOKEN).toString('base64')
  const issue = {
    assignees: [
      'cybermelmac'
    ],
    labels: [
      'kategori 3'
    ]
  }
  return {
    headers: {
      'Authorization': auth,
      'User-Agent': config.GITHUB_USER,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    data: issue,
    url: data.issue
  }
}