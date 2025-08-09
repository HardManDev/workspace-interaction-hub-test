FROM node:22.18.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY packages/core ./packages/core
COPY packages/server ./packages/server

RUN yarn install --frozen-lockfile


WORKDIR /app/packages/core
RUN yarn build

WORKDIR /app/packages/server
RUN yarn build

CMD ["sh", "-c", "yarn typeorm:migration:run && yarn start:prod"]