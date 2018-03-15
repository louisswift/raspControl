module.exports = {
  /**
   * Application configuration section
   */
  apps : [

    {
      name      : 'BLENOCONF',
      script    : 'main.js',
      watch     : true,
      env: {
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
};
