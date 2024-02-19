echo "Switching to main branch"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r -i ~/Documents/.ssh/Maxssh build/* numuser@insa-numimpact-01.insa-lyon.fr:/var/www/insa-numimpact-01.insa-lyon.fr/

echo "Done!"