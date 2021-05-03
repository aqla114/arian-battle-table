FROM node:10.14.0

ENV NODE_ENV=development

WORKDIR /workdir

COPY . /workdir

RUN yarn install
RUN yarn build

CMD ["node", "server/server.js"]
