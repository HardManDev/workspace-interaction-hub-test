FROM node:22.14.0-alpine AS client-build

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app

COPY package.json yarn.lock ./

COPY packages/core ./packages/core
COPY packages/client ./packages/client

RUN yarn install --frozen-lockfile


WORKDIR /app/packages/core
RUN yarn build

WORKDIR /app/packages/client
RUN yarn build

CMD ["sh", "-c", "yarn start:release --port 3001"]
