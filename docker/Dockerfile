FROM node:7.0.0

RUN mkdir /src

RUN npm install nodemon gulp yarn -g

WORKDIR /src

EXPOSE 5000
EXPOSE 5858

CMD ["nodemon", "--debug", "/src/server.js", "5000"]
