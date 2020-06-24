# merge the colorado geography headers with the data
cat geography-headers.csv g20185co.csv > colorado-geography.csv


# create a list of geographies containing Routt, Moffat, Steamboat or Hayden School
cat colorado-geography.csv|iconv -f latin1 -t utf-8|csvcut -v  -c 2,3,49,50|egrep -i "STUSAB|Steamboat|Routt|Moffat|Hayden School" > routt-and-moffat-geographies.csv

# convert that to a comma-delimited list of geoids for querying the census APIs
cat routt-and-moffat-geographies.csv | tail -n +2 | csvcut -c 3|tr "\n" , | sed -e 's/,$//' > routt-and-moffat-geographies-querystring.txt
