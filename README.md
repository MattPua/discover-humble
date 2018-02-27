# DiscoverHumble

```
Note: This project has no official affiliation with HumbleBundle or any other platform/service used.
````

--- 

## Installation


### Set up Humble Bundle Credentials 

``` bash
  $ nano backend/api/config.py

  # Need this to access the Humble API
  # Under this file paste in the following:
  API_HUMBLE_BUNDLE = dict(
    USERNAME = 'YOUR_HUMBLE_EMAIL',
    PASSWORD = 'YOUR_HUMBLE_PASSWORD',
  )
```


### Installing the Back-end

``` bash
  $ cd backend
  $ virtualenv env
  $ source env/bin/activate
  $ python setup.py install
```

### Generate the Data File

``` bash
  $ cd backend
  # Generates the files containing your HumbleBundle Game Information
  $ python generate-json-file.py
  # Add in IGDB Data
  $ node igdb.js
  # Add in Steam Data
  $ node steam.js
```

### Copy JSON From Backend to FrontEnd

``` bash
  $ cp backend/data/games.json ./src/assets/data/games.json
```

### Install the Front-End
``` bash
  $ npm install 
```

### Running the server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Deployment

``` bash
  $ npm run ghpages
```

---

## Project Background

```
The Project Challenge : Can you redesign the HumbleBundle Library with 36 hours of work?
```


**DiscoverHumble** is a responsive single page app (SPA) that allows the user to re-discover some of those hidden gems sitting in their HumbleBundle library.

This project came out of a personal problem I had with my Humble Bundle Library. Over the years I had accumulated a large number of games, books, and audio from sales, bundles and everything in between since I've started using the service. The issue I had was that the current design of the Humble Library made it difficult for me to really know whether or not I wanted to play a game in my library.

The current design provides a link to your item if its DRM (Digital Rights Management) Free, or the Steam Key if its redeemable on Steam. Apart from that, you have a small cover photo that is all you have to go on. For me, this often led to googling games, and checking reviews on steam. I wanted to come up with a design that would eliminate me having to go to Steam to find out more, and to make the Humble Bundle Library experience, a little bit more fun. 

So what does this new design offer?

**Features**:
* Browse Videos and Photos from IGDB and Steam (if available)
* Get Steam User reviews (if available)
* Get IGDB, Steam, and Metacritic Ratings (if available)
* A smaller selection of items to look through at a time (emphasis on less is more)

--- 

## Tech & Design

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

The UX/UI designs were made using [Adobe XD](https://www.adobe.com/ca/products/xd.html). The Adobe files can be found [here](https://github.com/MattPua/discover-humble/tree/master/adobe-xd). A significant portion of inspiration came from the designs from the Steam Libraries and Humble Store. I'm a big fan of how those designs get across what you need to know, specifically the steam store. My major gripe with those designs though is just the sheer volume of information presented to you and its up to the user to sift through those designs. I've opted for something simpler, to focus on what I want the user focus on, mainly ratings, reviews and media. A lot of other inspiration came from [Dribbble](https://dribbble.com/) (what would I do without you Dribbble).

On the front end side, the project is built on **Angular 5**. No front end frameworks were used and instead all CSS was rolled out from scratch. I opted for simpler designs due to time constraints.
The project was made responsive using [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox). The project was designed mobile first, and then the desktop experience second.

On the backend, we retrieve the Humble Bundle game information using [MestreLion's HumbleBundle Python API](MestreLion). MestreLion has a python command line that we can use to fetch our HumbleBundle game information. 

```
Note: There is something that I found with the API where we can't actually fetch all of our games, specifically those that are Steam Key redeemable (or so it appears).
```

After fetching the Games, we connect to the IGDB API to see if we can find some information and in particular, the steam game ID. After checking IGDB, we also go and check the Steam Web API to see if we can fill out some more information and most importantly Steam User Reviews.

```
Note: At times, the information we fetch for a game from the IGDB API is not accurate using the information provided by the HumbleBundle API. The IGDB API search does a match search so we're given a range of options for a given name. 

Due to a time constraint, I wasn't able to guarantee the accuracy of the search lookup.
```

The project is deployed onto **GitHub Pages** via [Angular CLI gh-pages](https://www.npmjs.com/package/angular-cli-ghpages). By using **GitHub** pages we're provided with free hosting for what's essentially a static page.

For this project, I've opted to use as little external packages/frameworks/helpers as possible to minimize external dependencies as well as to focus on features that are vital to the project, due to the time constraints of the challenge.

External Packages/Assets included (apart from the packages that come from generating a project via the angular CLI) are the following:

* [MomentJS](https://momentjs.com/) - For super easy date parsing
* [Font Awesome](fontawesome.io/icons/) - for great icon sets
* [Animate.css](https://daneden.github.io/animate.css/) - for really cool animations
* [Normalize.css](https://necolas.github.io/normalize.css/) - Normalizing generic CSS between browsers
* [igdb-api-node](https://www.npmjs.com/package/igdb-api-node) - Node.js wrapper for the IGDB API
* [axios](https://github.com/axios/axios) - for node server http requests

--- 

## Work Breakdown

The challenge was to finish this entire project in a total of 36 hours and below is the breakdown of how those hours were split.

### API Coding: (Total Time: 10 hrs 57 min)
* HumbleBundle API Research (2 hrs 20 min)
* Using/Connecting with Humble Bundle API (3 hrs 49 min)
* IGDB API (2 hrs 45 min)
* Steam API (2 hrs 3 min)

### Front End Coding: (Total Time: 11 hrs 2 min)
* Mobile (8 hrs 23 min)
* Desktop (50 min)
* General Design Improvements (1 hrs 49 min)

### Design: (Total Time: 8 hrs 29 min)
* Mobile UX (2 hrs 14 min)
* Desktop UX (10 min)
* Mobile UI (3 hrs 56 min)
* Desktop UI (2 hrs 9 min)

### Other (Total Time: 1 hr 35 min)
* Deployment (19 min)
* Documentation (1 hr 15min)

**Total Time Spent: 32 hrs 4 min**

---

## Credits

This project wouldn't be able to have completed without the work of the following individuals/services:

* [Icons by Freepik](https://www.flaticon.com/authors/freepik)
  * Smart Phone Icon
  * E-reader Icon
* [Icons by Smashicons](https://www.flaticon.com/authors/smashicons)
  * Game Controller Icon
  * Stopwatch Icon
  * Music Icon
* [Thumbs Up & Thumbs Down Icon By Those Icons](https://www.flaticon.com/authors/those-icons)
* [FontAwesome by Dave Gandy](http://fontawesome.io/)
* [Humble Bundle for being a game service for games](https://humblebundle.com)
* [Cool Animations with Animate.css by DaneDen](https://github.com/daneden/animate.css)
* [Gate Data, Photos and Videos provided by IGDB](https://igdb.com)
* [Game Data, Photos, Views, and User Reviews provided by Steam](http://store.steampowered.com/)
* [Python Command Line API For Retrieving Humble Bundle games by MestreLion](https://github.com/MestreLion/humblebundle)
* [Keeping track of hours spent with Paymo](https://www.paymoapp.com/)
* [For Design Inspirations](https://dribbble.com/)
