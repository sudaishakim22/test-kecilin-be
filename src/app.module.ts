import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AppConfigModule } from './config/app-config-module';
import { AuthModule } from './auth/auth.module';
import { MongooseProviderModules } from './providers/mongoose/mongoose-provider.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule,
    BookModule,
    AuthModule,
    MongooseProviderModules,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
