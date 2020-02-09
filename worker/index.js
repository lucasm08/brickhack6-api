/* eslint-disable */

var CronJob = require('cron').CronJob
const fetchDisasters = require('./tasks/fetch-disasters')

var job = new CronJob(
  '* * * * *',
  fetchDisasters,
  null,
  true,
  'America/Los_Angeles'
)
job.start()
