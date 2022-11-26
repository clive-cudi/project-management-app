#!/bin/bash

echo "renaming files..."

for a in ./.ebextensions/*.yaml; do mv -- "$a" "${a%.yaml}.config"; echo "renamed $a"; done

echo "config files rename successfull"