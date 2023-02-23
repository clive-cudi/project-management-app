FROM node:16

WORKDIR /usr/src/server/

# install app dependencies
COPY package*.json ./
COPY ./.ebextensions ./
COPY ./controllers ./
COPY ./helpers ./
COPY ./middleware ./
COPY ./models ./
COPY ./routes ./
COPY ./rename-ebextensions.sh ./
COPY ./server.js ./

RUN npm install

CMD [ "node", "server.js" ]