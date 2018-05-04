#! /bin/bash

wget -O /tmp/zip_db.csv http://federalgovernmentzipcodes.us/free-zipcode-database-Primary.csv
awk -F',' '{print $1, $4}' /tmp/zip_db.csv | sed 's/"//g' | tee > /tmp/spec
