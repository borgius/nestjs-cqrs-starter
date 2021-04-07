import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { Account } from './account/model/account.model';

const databaseUrl =
  process.env.DATABASE_URL ||
  'mysql://service_account:localPassword@localhost:3306/service_account';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
    }),
    EventStoreModule.register({
      type: 'nats',
      clusterId: 'test-cluster',      
      options: {
        url: 'nats://localhost:4222',
        reconnect: true,
        maxReconnectAttempts: 10
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: databaseUrl,
      database: databaseUrl.split('/').pop(),
      entities: [Account],
      synchronize: true,
      logging: true,
    }),
    AccountModule,
  ],
})
export class AppModule {}
