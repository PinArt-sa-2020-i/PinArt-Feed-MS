FROM node:12.16.2

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY ./ /app

EXPOSE 3001

CMD ["npm", "start"]
