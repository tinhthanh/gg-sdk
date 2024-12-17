#!/bin/bash
prefix='Zalo_Sheet_'
for ((i=0; i<=1; i++))
do
    thu_muc=${prefix}${i};
    mkdir -p "$thu_muc"
    cd "$thu_muc"
    cp -r ../../dist/** ./
    cp -f ../../appsscript.json ./
    output=$(npx clasp create --type sheets --title "$thu_muc" --rootDir ./dist)
    echo "Y" | npx clasp push
    ou2=$(npx clasp deploy)
    echo "$ou2"
    cd ../
done
#TU DONG TAO SHEET
#ou2='Created version 1. - AKfycbxM7ofykZ5SfO52S3ncf6u7SIn1p5kv3PKj64ID9ZYPh70UVrXemRGkvbYe4u4Tqosu @1.'
#result=$(echo "$ou2" | awk -F '-' '{print $2}' | awk -F '@' '{print $1}')
#echo "$result"



