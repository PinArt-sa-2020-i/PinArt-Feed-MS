FROM node:12.16.2

RUN mkdir /app
WORKDIR /app

COPY ./PintArt-Feed-MS/package.json /app
COPY ./PintArt-Feed-MS/package-lock.json /app

RUN npm install

COPY ./PintArt-Feed-MS /app

EXPOSE 3001

CMD ["npm", "start"]
