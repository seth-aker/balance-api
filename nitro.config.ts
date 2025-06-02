//https://nitro.unjs.io/config
export default defineNitroConfig({
  database: {
    default: {
      connector: 'mysql2',
      options: { name: 'BALANCEDEVELOPMENT'},
    },
  },
  devDatabase: {
    default: {
      connector: 'mysql2',
      options: { name: 'BALANCEDEVELOPMENT'}
    },
  },
  runtimeConfig: {
    databaseConnectionString: '',
    databaseUser: '',
    databasePassword: '',
  },
  srcDir: "server"
});
