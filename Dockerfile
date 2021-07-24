FROM node:14.17.3-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .

CMD ["yarn", "start"]