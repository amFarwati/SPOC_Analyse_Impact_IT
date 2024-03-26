#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until mysqladmin ping -h"$host" --silent; do
  >&2 echo "MySQL n'a pas fini de démarrer - en attente..."
  sleep 1
done

>&2 echo "MySQL est prêt - exécution de la commande"
exec $cmd