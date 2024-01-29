echo "Switching to branch V0.1"
git checkout V0.1

echo "Deploying files to server..."
scp  -i ~/.ssh/Maxssh server.js server_test_opti.js package.json package-lock.json numuser@insa-numimpact-01.insa-lyon.fr:server/

echo "Done!"