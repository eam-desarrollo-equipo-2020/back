# Backend
API REST desarrollada en Node.js y base de datos Mongodb.

## Instalación MongoDB – Debian linux
Se verifica/instala la librería gnupg necesaria para para la instalación (por lo general la trae pre-instalada) con el comando `sudo apt install gnupg` Se agrega la llave publica del repo con `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`, Se crea archivo para incluir repositorio`echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list` ahora se actualizan los repositorios `sudo apt update`, se instalan los paquetes `sudo apt-get install -y mongodb-org`.

Con esto se tiene lo necesario para la base de datos, para levantar el servicio solo hace falta ejecutar el comando `sudo service mongod start`

## Instalación Node.js
Se agrega y descarga el repositorio con el comando `sudo curl -sL https://deb.nodesource.com/setup_12.x | bash -` y se instalan los paquetes con `sudo apt install -y nodejs`.
