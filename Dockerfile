FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

