import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyAuthGuard } from './auth/guards/api-key-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new ApiKeyAuthGuard());
  await app.listen(3000);
}
bootstrap();
