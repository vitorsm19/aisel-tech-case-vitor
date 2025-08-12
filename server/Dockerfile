FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 3001

CMD ["npm", "run", "start:prod"]