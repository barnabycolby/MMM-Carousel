var config = {
	port: 8080,

	language: 'en',
	timeFormat: 24,
	units: 'metric',

	modules: [
        {
            module: 'MMM-Carousel',
            config: {
                ignoreModules: [ 'alert' ]
            }
        },
		{
			module: 'alert',
		},
		{
			module: 'clock',
			position: 'center'
		},
		{
			module: 'compliments',
			position: 'center'
		},
		{
			module: 'newsfeed',
			position: 'center',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
