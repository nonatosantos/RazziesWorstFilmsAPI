import * as path from 'path';

export const AppConfig = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  
  data: {
    csvPath: path.join(__dirname, '../infrastructure/data/Movielist.csv'),
    batchSize: 100
  },
  
  database: {
    type: 'sqlite',
    inMemory: true
  }
} as const;
