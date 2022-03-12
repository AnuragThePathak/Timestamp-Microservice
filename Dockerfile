FROM node:16-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD [ "node", "server.js" ]
# EXPOSE 3000