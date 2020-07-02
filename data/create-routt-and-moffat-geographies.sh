# merge the colorado geography headers with the datail
# change the incosistency between the data dump and api census geoids
cat geography-headers.csv g20185co.csv |iconv -f latin1 -t utf-8|sed -e  "s/00US/0000US/g" > colorado-geography.csv


# create a list of geographies containing Routt, Moffat, Steamboat or Hayden School
cat colorado-geography.csv|csvcut -v  -c 2,3,49,50|egrep -i "STUSAB|\"Steamboat|Routt|Hayden|Yampa|(Oak Creek)|Phippsburg" > routt-and-moffat-geographies.csv

# convert that to a comma-delimited list of geoids for querying the census APIs
cat routt-and-moffat-geographies.csv | grep -v "Block Group" | tail -n +2 | csvcut -c 3|tr "\n" , | sed -e 's/,$//' > routt-and-moffat-geographies-querystring.txt
