import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get("CLIENT_URL"),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(configService.get("PORT"));
}
bootstrap();
