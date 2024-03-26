cd server

sed -i 's/host: "localhost"/host: "mysql-db"/g' ./server.js

cd ../

docker compose up --build -d 