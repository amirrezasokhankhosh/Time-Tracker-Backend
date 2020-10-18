FROM node

WORKDIR /src

RUN npm install pm2 -g
RUN npm i -g @adonisjs/cli

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm install --no-package-lock 

COPY . .
RUN adonis key:generate

RUN npm run assets-production

CMD pm2-runtime start server.js 

