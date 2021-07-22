# leaflet-challenge
Leaflet challenge

The purpose of this project was to construct a leaflet map to show the latest earthquake data from the USGS data feeds.  The map will show location, magnitude (based on circle size) and depth (based on color) of the earthquakes.  Earthquake data is available from around the  world on the map. This page will load/refresh based on the json data being updated.

The project contents are as follows:
(1.) Under static folder, the css subfolder contains the css style file - changes were made for the map legend. 
(2.) Under static folder, the js subfolder contains the config file for the API key (empty when not in use). The core of the assignment work was done in the 'logic.js' application file.
(3.) For the index html file, no changes were needed. 
(4.) The data source referenced in the logic.js is the USGS all_week.geojson summary file of the latest earthquake data.