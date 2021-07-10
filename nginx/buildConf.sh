#!/bin/bash
export $(grep -v '^#' .env | xargs)

if [ "$USINGHTTPS" = 'false' ]; then
    cp templates/nginx-http.conf "$WEBSERVERNAME".conf
else
    cp templates/nginx-https.conf "$WEBSERVERNAME".conf
fi

sed -i "s/{WEBSERVERNAME}/$WEBSERVERNAME/g" "$WEBSERVERNAME".conf
sed -i "s/{PORT}/$PORT/g" "$WEBSERVERNAME".conf
sed -i "s/{DOMAIN}/$DOMAIN/g" "$WEBSERVERNAME".conf

cp "$WEBSERVERNAME".conf /etc/nginx/conf.d/

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)