FROM node:18-slim

RUN apt update && apt install -y \
  git \
  ca-certificates \
  curl \
  wget \
  procps \
  make

RUN npm install -g @nestjs/cli@9.5.0

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
