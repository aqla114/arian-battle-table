FROM node:10.14.0

ENV NODE_ENV=production

WORKDIR /workdir

COPY . /workdir

RUN yarn install --production=false
RUN yarn build

CMD ["node", "src/server/server.js"]
