upOption=""
login=true
optspec=":d"
containerName="species-names"
while getopts "$optspec" optchar; do
    case "${optchar}" in
        d)
             echo "->Start up to background" >&2
             upOption="-d"
             login=false
            ;;
    esac
done

##build and launch containers
docker-compose build
docker-compose up $upOption

#if [ $login = true ]; then
	docker exec -it $containerName bash
	docker-compose stop
#fi
