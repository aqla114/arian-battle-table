FROM node:16.7.4

ENV NODE_ENV=production

WORKDIR /workdir

COPY . /workdir

RUN yarn install --production=false
RUN yarn build

CMD ["node", "src/server/server.js"]
