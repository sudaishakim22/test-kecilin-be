import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { MongooseConfigService } from 'src/config/mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (config: MongooseConfigService) => config.options,
      inject: [MongooseConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseProviderModules {}
