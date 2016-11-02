#!/usr/bin/env bash

upOption=""
login=false
optspec=":ld"
while getopts "$optspec" optchar; do
    case "${optchar}" in
        l)
             echo "->Login after start up" >&2
             login=true
             upOption="-d"
            ;;
    esac
    case "${optchar}" in
        d)
             echo "->Start up to background" >&2
             upOption="-d"
            ;;
    esac
done

##build and launch containers
docker-compose build
docker-compose up $upOption

if [ $login = true ]; then
    docker exec -it species-names bash
    docker-compose stop
fi
