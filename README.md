
# Project Title

# Lyric Spot



#Set up 

cd into client -> npm run dev

cd into server -> npm run dev

Go to think link for the server Repo => https://github.com/robbie-carragher/lyric-spot-server

## Overview

Lyric Spot is an innovative application that displays lyrics for any song selected from Spotify's vast music library. This app enhances the music listening experience by providing instant access to song lyrics.

## Problem

Music lovers often want to see the lyrics to their favourite songs as they listen. Currently, finding accurate and synchronized lyrics can take time and effort. Lyric Spot addresses this gap by offering an integrated solution to access lyrics seamlessly while streaming music.

## User Profile

The primary users of Lyric Spot are music enthusiasts who enjoy a deeper engagement with their music. These users range from casual listeners to avid fans who seek to understand every word of their favourite songs. The app is designed to be user-friendly, catering to tech-savvy individuals and those with basic tech skills.

## Features

- **Spotify Integration**: Connects with Spotify to access a broad range of songs.
- **Lyric Display**: Shows lyrics synchronized with the song being played.
- **User Authentication**: Secure login through Spotify’s portal.
- **Search Functionality**: Users can search for songs by name, title, or track.
- **Interactive Music Player**: Offers controls for streaming, including play, pause, and skip.



## Implementation

### Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Libraries**: Axios, Spotify-web-api-node, Spotify-web-api-playback, lyrics-finder, dotenv
- **Others**: CORS, body-parser

### APIs

- **Spotify Web API**: For music data and playback control.
- **Spotify Web Playback API**: To handle music streaming.
- **Lyrics Finder**: To fetch song lyrics.

### Sitemap

- **Login Page**: A simple interface with a login button for Spotify authentication.
- **Dashboard**: Features the music player, track search, and lyric display.


### Data

User data includes Spotify account information and user preferences. Song data includes track details, album art, and lyrics.

## Endpoints

### Login Endpoint

- **Path**: POST `/login`
- **Function**: Handles user authentication with Spotify.
- **Returns**: A JSON object containing the access token, refresh token, and expiration time.
- **Example Response**:
  ```json
  {
    "accessToken": "NgCXRK...MzYjw",
    "refreshToken": "NgAagA...Um_SHo",
    "expiresIn": 3600
  }

```
  ## Refresh Token Endpoint

- **Path:** `POST /refresh`
- **Function:** Refreshes the Spotify access token.
- **Body:** Contains the current refresh token.
- **Returns:** A new access token and updated expiration time.

### Example Response

```json
{
  "accessToken": "NgCXRK...MzYjw",
  "expiresIn": 3600
}
```
# Search Track Endpoint

- **Path:** GET /search
- **Function:** Searches Spotify's library for tracks based on query parameters.
- **Parameters:** 
  - `query` (string) - the search term entered by the user.
- **Returns:** A list of tracks that match the search criteria.

## Example Response

```json
{
  "tracks": [
    {
      "name": "Song Name",
      "artist": "Artist Name",
      "albumUrl": "https://linktoalbumcover.com",
      "uri": "spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
    }
    // More tracks
  ]
}
```

# Search Lyrics Endpoint

- **Path:** GET /lyrics
- **Function:** Searches Spotify's library for tracks based on query parameters.
- **Parameters:** 
  - `query` (string) - the search term entered by the user.
- **Returns:** A list of tracks that match the search criteria.

## Example Response

```json
{
  "tracks": [
    {
      "name": "Song Name",
      "artist": "Artist Name",

    }

  ]
}

```


# Search Playlists Endpoint

- **Path:** GET /playlists
https://api.spotify.com/v1/playlists/{playlist_id}
- **Function:** Searches Spotify's library for tracks based on query parameters.
- **Parameters:** 
  - `query` (string) - the search term entered by the user.
- **Returns:** A list of tracks that match the search criteria.

## Example Response

```json
{
  "collaborative": false,
  "description": "string",
  "external_urls": {
    "spotify": "string"
  },
  "followers": {
    "href": "string",
    "total": 0
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "name": "string",
  "owner": {
    "external_urls": {
      "spotify": "string"
    },
    "followers": {
      "href": "string",
      "total": 0
    },
    "href": "string",
    "id": "string",
    "type": "user",
    "uri": "string",
    "display_name": "string"
  },

```

# Search Albums Endpoint

- **Path:** GET /albums
https://api.spotify.com/v1/albums/{id}
- **Function:** Searches Spotify's library for tracks based on query parameters.
- **Parameters:** 
  - `query` (string) - the search term entered by the user.
- **Returns:** A list of tracks that match the search criteria.

## Example Response

```json
{
  "album_type": "compilation",
  "total_tracks": 9,
  "available_markets": ["CA", "BR", "IT"],
  "external_urls": {
    "spotify": "string"
  },
  "href": "string",
  "id": "2up3OPMp9Tb4dAKM2erWXQ",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "name": "string",
  "release_date": "1981-12",
  "release_date_precision": "year",
  "restrictions": {
    "reason": "market"
  },
  "type": "album",
  "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
  "artists": [
    {
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "name": "string",
      "type": "artist",
      "uri": "string"
    }
  ]

   
```

# Struggles

The Spotify authentication took a lot of time and testing.

Connecting to the Spotify API

Postman would not get me to get Response and Request.



#Tech discovered 

next.js
nextAuth.js
nextAuth Middlewear
Redux 
Recoil 

# Project Documentation

## Overview
All endpoints should implement appropriate error handling, returning meaningful error messages and status codes when things go wrong. Authentication endpoints must ensure the security of sensitive data like tokens. The endpoints' implementation will depend on the Spotify API's current specifications and may require updates if the API changes.


