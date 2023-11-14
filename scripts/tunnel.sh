#!/bin/bash

echo "Starting tunnel..."

# Function to check if a command is available
command_exists() {
	command -v "$1" >/dev/null 2>&1
}

# Function to install localtunnel if not already installed
install_localtunnel() {
	if ! command_exists "lt"; then
		npm install -g localtunnel
	fi
}

# Function to check the operating system
get_os() {
	case "$(uname -s)" in
		Linux*)   os="linux";;
		Darwin*)  os="mac";;
		CYGWIN*|MINGW32*|MSYS*) os="windows";;
		*)        os="unknown";;
	esac
	echo $os
}

# Get the operating system
current_os=$(get_os)

install_localtunnel

# Open first terminal based on the operating system and run the tunnel command
if [ "$current_os" == "linux" ]; then
	gnome-terminal --tab --title="Tunnel" --command="bash -c 'lt --port 8080 --subdomain legacy; exec bash'"
	sleep 5
	cd ../server/src
	go run main.go
elif [ "$current_os" == "mac" ]; then
	osascript -e 'tell app "Terminal" to do script "lt --port 8080 --subdomain legacy"'
	sleep 5
	cd ../server/src
	go run main.go
elif [ "$current_os" == "windows" ]; then
	Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command ""lt --port 8080 --subdomain legacy""" -Verb RunAs
	sleep 5
	cd ../server/src
	go run main.go
else
	echo "Unsupported operating system"
	exit 1
fi