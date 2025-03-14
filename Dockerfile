FROM node:20-bullseye
ENV BOT_TOKEN 0

WORKDIR /home/node/app

COPY *.json .npmrc ./
RUN npm install --omit=dev --omit=optional && mv ./node_modules ./node_modules_prod && npm install --omit=optional

COPY src ./src
RUN export BOT_TOKEN=$BOT_TOKEN

CMD npm start