echo "Switching to branch V0.1"
git checkout V0.1

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r -i ~/.ssh/Maxssh build/* numuser@insa-numimpact-01.insa-lyon.fr:/var/www/insa-numimpact-01.insa-lyon.fr/

echo "Done!"