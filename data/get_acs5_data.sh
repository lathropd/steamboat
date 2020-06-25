#!/bin/bash

# first get the list of ACS 5 data tables
curl https://api.census.gov/data/2018/acs/acs5/groups.json|  jq -r  '.groups[].name' > acs5.groups.txt




# next loop through those to get each data tables as a csv
for group in `cat acs5.groups.txt`;
do
  curl "https://api.census.gov/data/2018/acs/acs5?get=NAME,group($group)&ucgid=`cat routt-and-moffat-geographies-querystring.txt`,0100000US,0100043US,0200000US4,0200043US4,0300000US8,0300043US8" > $group.json 
done;
