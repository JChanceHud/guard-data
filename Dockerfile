FROM alpine:latest
MAINTAINER Chance Hudson

RUN apk add --no-cache nodejs-npm chromium

ENV DOCKER=true

COPY . /src
WORKDIR /src
RUN npm i

CMD ["node", "."]
