const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Health check endpoint for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Character data with enhanced details
const characters = [
  {
    id: 1,
    name: "Scorpion",
    realm: "Netherrealm",
    fighting_style: "Ninjutsu",
    fatalities: ["Toasty!", "Hell Fire", "Spear Fatality"],
    bio: "A specter seeking revenge for his death and the death of his family.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/9/9e/Scorpion_mk11.png",
    stats: {
      strength: 85,
      speed: 90,
      defense: 75,
      special: 95,
    },
    weapons: ["Kunai", "Spear", "Hell Fire"],
    allies: ["Noob Saibot"],
    enemies: ["Sub-Zero", "Quan Chi"],
    first_appearance: "Mortal Kombat (1992)",
    voice_actor: "Patrick Seitz",
  },
  {
    id: 2,
    name: "Sub-Zero",
    realm: "Earthrealm",
    fighting_style: "Lin Kuei",
    fatalities: ["Spine Rip", "Ice Shatter", "Frozen in Time"],
    bio: "A cryomancer warrior from the Lin Kuei clan.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/2/21/Sub-Zero_mk11.png",
  },
  {
    id: 3,
    name: "Raiden",
    realm: "Edenia",
    fighting_style: "Thunder God",
    fatalities: ["Electric Decapitation", "Lightning Storm", "Electric Chair"],
    bio: "The God of Thunder and protector of Earthrealm.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/b/b6/Raiden_mk11.png",
  },
  {
    id: 4,
    name: "Kitana",
    realm: "Edenia",
    fighting_style: "Fan Combat",
    fatalities: ["Kiss of Death", "Fan Slice", "Royal Execution"],
    bio: "Princess of Edenia and skilled assassin.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/4/41/Kitana_mk11.png",
  },
  {
    id: 5,
    name: "Liu Kang",
    realm: "Earthrealm",
    fighting_style: "Shaolin Fist",
    fatalities: ["Dragon's Breath", "Bicycle Kick", "Dragon Fire"],
    bio: "The chosen one and champion of Earthrealm.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/8/8c/Liu_Kang_mk11.png",
  },
  {
    id: 6,
    name: "Mileena",
    realm: "Outworld",
    fighting_style: "Tarkatan",
    fatalities: ["Tasty Treat", "Sai Stab", "Flesh Pits"],
    bio: "Half-Tarkatan clone of Kitana, created to replace her.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/7/7c/Mileena_mk11.png",
  },
  {
    id: 7,
    name: "Jade",
    realm: "Edenia",
    fighting_style: "Staff Combat",
    fatalities: ["Head Bounce", "Pole Vault", "Staff Slice"],
    bio: "Kitana's best friend and loyal bodyguard.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/1/1c/Jade_mk11.png",
  },
  {
    id: 8,
    name: "Noob Saibot",
    realm: "Netherrealm",
    fighting_style: "Shadow Combat",
    fatalities: ["Make a Wish", "Double Trouble", "Shadow Clone"],
    bio: "The original Sub-Zero, now a wraith serving Quan Chi.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/3/3c/Noob_Saibot_mk11.png",
  },
  {
    id: 9,
    name: "Sonya Blade",
    realm: "Earthrealm",
    fighting_style: "Special Forces",
    fatalities: ["Kiss of Death", "Toasty!", "Energy Rings"],
    bio: "Commander of Earthrealm's Special Forces.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/5/5c/Sonya_Blade_mk11.png",
  },
  {
    id: 10,
    name: "Shang Tsung",
    realm: "Outworld",
    fighting_style: "Soul Stealing",
    fatalities: ["Soul Steal", "Shape Shifter", "Soul Feast"],
    bio: "The shapeshifting sorcerer who serves Shao Kahn.",
    image_url:
      "https://static.wikia.nocookie.net/mkwikia/images/6/6c/Shang_Tsung_mk11.png",
  },
];

// Helper functions
const paginateResults = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return {
    data: data.slice(startIndex, endIndex),
    total: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage: page,
  };
};

const sortCharacters = (characters, sortBy, order = "asc") => {
  return [...characters].sort((a, b) => {
    if (order === "desc") {
      return b[sortBy] > a[sortBy] ? 1 : -1;
    }
    return a[sortBy] > b[sortBy] ? 1 : -1;
  });
};

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Mortal Kombat API",
    version: "1.1.0",
    endpoints: {
      characters: "/characters",
      characterById: "/characters/:id",
      search: "/characters/search",
      stats: "/characters/stats",
    },
  });
});

// Get all characters with pagination and sorting
app.get("/characters", (req, res) => {
  const { page = 1, limit = 10, sortBy, order } = req.query;
  let result = [...characters];

  // Apply sorting if specified
  if (sortBy) {
    result = sortCharacters(result, sortBy, order);
  }

  // Apply pagination
  result = paginateResults(result, parseInt(page), parseInt(limit));

  res.json(result);
});

// Get character by ID
app.get("/characters/:id", (req, res) => {
  const character = characters.find(
    (char) => char.id === parseInt(req.params.id)
  );
  if (!character) {
    return res.status(404).json({ message: "Character not found" });
  }
  res.json(character);
});

// Enhanced search with more filters
app.get("/characters/search", (req, res) => {
  const {
    realm,
    fighting_style,
    min_strength,
    max_strength,
    weapon,
    ally,
    enemy,
  } = req.query;

  let filteredCharacters = [...characters];

  if (realm) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.realm.toLowerCase() === realm.toLowerCase()
    );
  }

  if (fighting_style) {
    filteredCharacters = filteredCharacters.filter(
      (char) =>
        char.fighting_style.toLowerCase() === fighting_style.toLowerCase()
    );
  }

  if (min_strength) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.stats.strength >= parseInt(min_strength)
    );
  }

  if (max_strength) {
    filteredCharacters = filteredCharacters.filter(
      (char) => char.stats.strength <= parseInt(max_strength)
    );
  }

  if (weapon) {
    filteredCharacters = filteredCharacters.filter((char) =>
      char.weapons.some((w) => w.toLowerCase().includes(weapon.toLowerCase()))
    );
  }

  if (ally) {
    filteredCharacters = filteredCharacters.filter((char) =>
      char.allies.some((a) => a.toLowerCase().includes(ally.toLowerCase()))
    );
  }

  if (enemy) {
    filteredCharacters = filteredCharacters.filter((char) =>
      char.enemies.some((e) => e.toLowerCase().includes(enemy.toLowerCase()))
    );
  }

  res.json(filteredCharacters);
});

// Get character statistics
app.get("/characters/stats", (req, res) => {
  const stats = {
    total_characters: characters.length,
    realms: [...new Set(characters.map((char) => char.realm))],
    fighting_styles: [
      ...new Set(characters.map((char) => char.fighting_style)),
    ],
    average_stats: {
      strength: Math.round(
        characters.reduce((acc, char) => acc + char.stats.strength, 0) /
          characters.length
      ),
      speed: Math.round(
        characters.reduce((acc, char) => acc + char.stats.speed, 0) /
          characters.length
      ),
      defense: Math.round(
        characters.reduce((acc, char) => acc + char.stats.defense, 0) /
          characters.length
      ),
      special: Math.round(
        characters.reduce((acc, char) => acc + char.stats.special, 0) /
          characters.length
      ),
    },
  };
  res.json(stats);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
