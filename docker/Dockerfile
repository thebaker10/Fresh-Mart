FROM php:8.1.10-apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/api/public
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
#RUN sed -i -e 's/post_max_size\s=\s8M/post_max_size\s=\s32M/g' "$PHP_INI_DIR/php.ini"
#RUN sed -i -e 's/upload_max_filesize\s=\s2M/post_max_size\s=\s24M/g' "$PHP_INI_DIR/php.ini"
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
WORKDIR /var/www/html/api/
RUN a2enmod rewrite
RUN apt update && apt install -y git zip unzip libzip-dev libxml2-dev
RUN docker-php-ext-install zip pdo_mysql  && \
curl https://getcomposer.org/download/latest-stable/composer.phar -o /usr/bin/composer && \
chmod 755 /usr/bin/composer && \
chown -R www-data:www-data /var/www/html/api
USER www-data