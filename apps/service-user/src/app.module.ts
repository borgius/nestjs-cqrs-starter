import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';

const databaseUrl =
  process.env.DATABASE_URL ||
  'mysql://service_user:localPassword@localhost:3306/service_user';

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
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
