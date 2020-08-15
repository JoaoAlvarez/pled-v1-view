#!/bin/bash
PROP_IP="177.67.82.7"
DEV_IP="52.117.50.52"
USER="root"
PROD_ENV="prod"
DIRETORIO_REPOSITORIO="repositorios/eply_front"
CONTAINER_NAME="pled_front"
DOCKER="pled_front"
DOCKER_PORT="80:80"
DOCKER_IMAGE="joaoalvarez/pled_front"
Server_entry() {
	if [ "$1" == "prod" ]
	then
		echo "$USER@$PROP_IP"
	else
		echo "$USER@$DEV_IP"
	fi
}

Deploy() {
	comm=$( Server_entry $1)

	printf "Fazendo deploy para: $comm \n"
	printf "%s\n" "Acessando repositorio, atualizando branch $2 e iniciando processo de build..."

  if [ "$3" == "npminstall" ];then
		eval "ssh $comm 'cd $DIRETORIO_REPOSITORIO && rm -rf node_modules/ && git checkout . && git pull && git checkout $2 && git pull origin $2 && npm install && ./node_modules/.bin/ng build --configuration=$1 --sourceMap=false --optimization=true && docker build -t joaoalvarez/pled_front .'"
	else
	  eval "ssh $comm 'cd $DIRETORIO_REPOSITORIO && git checkout . && git pull && git checkout $2 && git pull origin $2 && ./node_modules/.bin/ng build --configuration=$1 --sourceMap=false --optimization=true && docker build -t joaoalvarez/pled_front .'"
  fi

	printf "stoping old container..."
	eval "ssh $comm 'docker stop  $CONTAINER_NAME'"
	eval "ssh $comm 'docker rm  $CONTAINER_NAME'"


	printf "starting container..."
	eval "ssh $comm 'docker run -e TZ=America/Sao_Paulo --name=$CONTAINER_NAME -d -p $DOCKER_PORT -t $DOCKER_IMAGE'"

	printf "container has started!"
	printf "done!"
}

Deploy $1 $2 $3
