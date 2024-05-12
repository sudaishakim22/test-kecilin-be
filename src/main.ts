import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './config/api-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const apiConfig = app.get(ApiConfigService);
  await app.listen(apiConfig.port, () => {
    console.log('Application running on port: ', apiConfig.port);
  });
}
bootstrap();
