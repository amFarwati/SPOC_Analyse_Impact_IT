echo "Switching to production branch"
git checkout production

echo "Building app..."
npm run build

echo "Deploying files to server..."
#scp -r -i ~/Documents/.ssh/Maxssh build/* numuser@insa-numimpact-01.insa-lyon.fr:/var/www/opsian.insa-lyon.fr/
scp -r -i /etc/ssh/ssh_host_rsa_key build/* numuser@insa-numimpact-01.insa-lyon.fr:/var/www/opsian.insa-lyon.fr/

echo "Done!"