import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get defaultOptions(): JwtModuleOptions {
    return {
      secret: super.getString('JWT_SECRET'),
      signOptions: {
        expiresIn: super.getString('JWT_EXPIRES'),
      },
    };
  }
}
