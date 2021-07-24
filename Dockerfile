FROM node:14.17.3-alpine

WORKDIR /app
COPY . .
RUN yarn install

CMD ["yarn", "start"]