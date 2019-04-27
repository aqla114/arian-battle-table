FROM node:8.9.4-alpine

ENV NODE_ENV=development

RUN apk add --no-cache nodejs yarn && yarn install

WORKDIR /workdir

# EXPOSE 8000
