#!/bin/bash

printf "\n> Instalando o front-end\n"
frontFolder="./app/frontend"
cacheFolderFront="/tmp/frontend-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${frontFolder} --cache $cacheFolderFront

printf "\n> Instalando o back-end\n"
backFolder="./app/backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack

printf "\n> Subindo os containers\n"
npm_config_loglevel=silent npm run compose:up

printf "\n> Criando um banco de dados e populando\n"
npm_config_loglevel=silent npm run db:reset
