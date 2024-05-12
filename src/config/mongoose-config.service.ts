import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get options(): MongooseModuleOptions {
    return {
      uri: super.getString('DB_URI'),
    };
  }
}
