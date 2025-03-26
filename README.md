# Mortal Kombat API

A RESTful API that provides information about Mortal Kombat characters, built with Node.js and Express.

## Features

- Get information about Mortal Kombat characters
- Search characters by various attributes
- Character statistics and relationships
- Rate limiting and security features
- Pagination and sorting capabilities

## Live Demo

The API is live at: https://mortal-kombat-api.onrender.com/

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (optional):

```bash
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

3. Start the server:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Get All Characters

```
GET /characters
```

Query Parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by
- `order`: Sort order (asc/desc)

### Get Character by ID

```
GET /characters/:id
```

### Search Characters

```
GET /characters/search
```

Query Parameters:

- `realm`: Filter by character's realm
- `fighting_style`: Filter by fighting style
- `min_strength`: Minimum strength value
- `max_strength`: Maximum strength value
- `weapon`: Filter by weapon
- `ally`: Filter by ally
- `enemy`: Filter by enemy

### Get Character Statistics

```
GET /characters/stats
```

## Example Usage

```bash
# Base URL
https://mortal-kombat-api.onrender.com/

# Get all characters
curl https://mortal-kombat-api.onrender.com/characters

# Get a specific character
curl https://mortal-kombat-api.onrender.com/characters/1

# Search characters by realm
curl https://mortal-kombat-api.onrender.com/characters/search?realm=Edenia

# Search characters by fighting style
curl https://mortal-kombat-api.onrender.com/characters/search?fighting_style=Ninjutsu

# Get paginated results
curl https://mortal-kombat-api.onrender.com/characters?page=1&limit=5

# Sort characters
curl https://mortal-kombat-api.onrender.com/characters?sortBy=strength&order=desc

# Get character statistics
curl https://mortal-kombat-api.onrender.com/characters/stats
```

## Response Format

Each character object includes:

- `id`: Unique identifier
- `name`: Character name
- `realm`: Character's realm of origin
- `fighting_style`: Character's fighting style
- `fatalities`: List of known fatalities
- `bio`: Character biography
- `image_url`: URL to character's image
- `stats`: Character statistics (strength, speed, defense, special)
- `weapons`: List of weapons
- `allies`: List of allies
- `enemies`: List of enemies
- `first_appearance`: First game appearance
- `voice_actor`: Voice actor name

## Deployment

This API is deployed on Render.com at https://mortal-kombat-api.onrender.com/

Alternative deployment platforms:

1. Heroku
2. Railway.app
3. DigitalOcean App Platform
4. AWS Elastic Beanstalk

See the deployment instructions in the repository for more details.
