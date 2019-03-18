FROM node:10.15.2-alpine
ENV APP_ROOT /app/
ENV HOST 0.0.0.0

WORKDIR $APP_ROOT

COPY package.json $APP_ROOT

RUN npm i -g nuxt-ts
RUN npm i

# COPY . $APP_ROOT
EXPOSE 3000
