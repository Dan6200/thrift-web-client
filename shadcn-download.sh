#!/bin/bash

# This script takes in one or more arguments and prints them out

# Check if at least one argument is provided
if [ $# -lt 1 ]; then
    echo "Error: At least one argument must be provided"
    exit 1
fi

pnpm dlx shadcn-ui@latest add "$@" -y
