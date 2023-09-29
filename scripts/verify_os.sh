#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu" || "$OSTYPE" == "darwin"* ]]; then
    echo "Linux or Mac OS detected"
    ./init_db.sh
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
    echo "Windows detected"
    ./init_db_windows.sh
elif [ -n "$(command -v wsl)" ]; then
    echo "WSL detected"
    ./init_db.sh
else
    echo "Unsupported operating system"
    exit 1
fi
