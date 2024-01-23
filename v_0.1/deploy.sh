echo "Switching to branch V0.1"
git checkout V0.1

echo "Deploying files to server..."
scp  -i ~/.ssh/Maxssh server/server.json server/package.json server/package-lock.json numuser@insa-numimpact-01.insa-lyon.fr:

echo "Done!"