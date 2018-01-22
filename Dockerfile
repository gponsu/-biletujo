FROM node:9.3.0

LABEL maintainer="vicentepons.rb@gmail.com"

ENV WATCHMAN_VERSION 4.9.0
ENV BILETUJO_PATH /opt/biletujo

WORKDIR $BILETUJO_PATH

RUN apt-get update && \
    apt-get install -y autoconf automake build-essential python-dev && \
    git clone https://github.com/facebook/watchman.git && \
    cd watchman && \
    git checkout v${WATCHMAN_VERSION} && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install

COPY package.json package-lock.json $BILETUJO_PATH/
RUN npm install

COPY . $BILETUJO_PATH

EXPOSE 19000 19001

CMD [ "npm", "start" ]