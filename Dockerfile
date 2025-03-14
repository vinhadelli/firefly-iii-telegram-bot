ENV botToken=0
FROM node:20-bullseye

WORKDIR /home/node/app

COPY *.json .npmrc ./
RUN npm install --omit=dev --omit=optional \
    && mv ./node_modules ./node_modules_prod \
    && npm install --omit=optional

COPY --dir src ./
RUN export BOT_TOKEN=$botToken

CMD npm start