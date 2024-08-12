export default () => ({
    database: {
      type: 'mssql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ?? 1433,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      databaseName: process.env.DB_NAME,
    }
  });
  