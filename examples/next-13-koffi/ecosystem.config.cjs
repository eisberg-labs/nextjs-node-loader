module.exports = {
  apps: [{
    name: 'XXX',
    exec_mode: 'cluster',
    instances: '1', // Or a number of instances
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 5000', //running on port 3000,
    max_memory_restart: '400M'

  }
  // ,{
  //   name: 'AMZ-monitor',
  //   exec_mode: 'cluster',
  //   instances: '1', // Or a number of instances
  //   script: 'lib/amazon/monitor/monitor.mts',
  //   max_memory_restart: '400M'
  // },{
  //   name: 'ebay-booster',
  //   exec_mode: 'cluster',
  //   instances: '1', // Or a number of instances
  //   script: 'lib/ebay/view-booster.mts',
  //   max_memory_restart: '400M'
  // }
]
};