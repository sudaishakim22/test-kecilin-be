import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get port(): number {
    return super.getNumber('APP_PORT');
  }
}
