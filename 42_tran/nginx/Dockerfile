FROM nginx:alpine

RUN apk add --no-cache \
    git \
    libxml2-dev \
    libxslt-dev \
    gd-dev \
    geoip-dev \
    build-base \
    curl \
    yajl-dev \
    lmdb-dev \
    libmaxminddb-dev \
    libtool \
    autoconf \
    automake \
    pcre-dev \
    linux-headers \
    && cd /tmp \
    && git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity \
    && cd ModSecurity \
    && git submodule init \
    && git submodule update \
    && ./build.sh \
    && ./configure \
    && make \
    && make install \
    && cd /tmp \
    && git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git \
    && cd /tmp \
    && curl -LO https://nginx.org/download/nginx-1.20.1.tar.gz \
    && tar zxvf nginx-1.20.1.tar.gz \
    && cd nginx-1.20.1 \
    && ./configure --with-compat --add-dynamic-module=../ModSecurity-nginx \
    && make modules \
    && cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules/ \
    && apk del build-base git \
    && rm -rf /tmp/*
