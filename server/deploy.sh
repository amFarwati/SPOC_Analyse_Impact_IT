echo "Switching to branch production"
git checkout production

echo "Deploying files to server..."
#scp  -i ~/Documents/.ssh/Maxssh server.js package.json package-lock.json numuser@insa-numimpact-01.insa-lyon.fr:server/
scp  -i /etc/ssh/ssh_host_rsa_key build/* numuser@insa-numimpact-01.insa-lyon.fr:/var/www/opsian.insa-lyon.fr/

echo "Done!"