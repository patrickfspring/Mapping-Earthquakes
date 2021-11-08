Mapping Earthquakes with USGS

The purpose of this webpage was to construct a leaflet map to show the latest earthquake data from the USGS data feeds.  The map will show location, magnitude
(based on circle size) and depth (based on color) of the earthquakes.  There is a legend provided in the lower right hand corner of the map. Earthquake data is
available from around the world on the map. This page will load/refresh based on the json data being updated.

The project contents are as follows:
(1.) Under static folder, the css subfolder contains the css style file - changes were made for the map legend. 
(2.) Under static folder, the js subfolder contains the config file for the API key (*This is empty to avoid uploading a key to GitHub.) 
(3.) In the same folder location, is the 'logic.js' app file where the core of the work was done. 
(4.) For the index html file, this was borrowed (reused). No changes were needed. 
(5.) The data source referenced in the logic.js is the USGS all_week.geojson summary file of the latest earthquake data.