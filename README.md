# Mortal Kombat API (Node.js Version)

A RESTful API that provides information about Mortal Kombat characters, built with Node.js and Express.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (optional):

```bash
PORT=3000
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

### Get Character by ID

```
GET /characters/:id
```

### Search Characters

```
GET /characters/search?realm=Netherrealm&fighting_style=Ninjutsu
```

Query Parameters:

- `realm`: Filter by character's realm
- `fighting_style`: Filter by character's fighting style

## Example Usage

```bash
# Get all characters
curl http://localhost:3000/characters

# Get a specific character
curl http://localhost:3000/characters/1

# Search characters by realm
curl http://localhost:3000/characters/search?realm=Edenia

# Search characters by fighting style
curl http://localhost:3000/characters/search?fighting_style=Ninjutsu
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
