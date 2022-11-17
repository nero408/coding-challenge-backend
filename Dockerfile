FROM node:18.2-alpine3.15 as development

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli 

COPY . .

RUN yarn install

RUN yarn run build

FROM node:18.2-alpine3.15 as production

WORKDIR /usr/src/app

COPY . .

RUN yarn install

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]