import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { JwtConfigService } from './jwt-config.service';
import { MongooseConfigService } from './mongoose-config.service';

const providers = [
  AppConfigService,
  ApiConfigService,
  JwtConfigService,
  MongooseConfigService,
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers,
  exports: providers,
})
export class AppConfigModule {}
