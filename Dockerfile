FROM node:16.13.1

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR /usr/app/dist

EXPOSE 3000
CMD ["node", "src/index.js"]