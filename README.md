# Razzies Worst Films API

A RESTful API to query nominees and winners of the Worst Picture category from the Golden Raspberry Awards.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/nonatosantos/RazziesWorstFilmsAPI.git
cd RazziesWorstFilmsAPI
```

2. Install dependencies

```bash
npm install
```

## Development

### Running in Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Building the Project

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Build and Watch

Automatically rebuild when files change:

```bash
npm run build:watch
```

### Cleaning Build Files

Remove the compiled `dist` folder:

```bash
npm run clean
```

## Testing

### Run Tests

Execute the test suite:

```bash
npm test
```

### Run Tests with Coverage

Get detailed test coverage report:

```bash
npm run test:coverage
```

### Watch Mode for Tests

Run tests continuously while developing:

```bash
npm run test:watch
```

## API Endpoints

The API provides endpoints to query Golden Raspberry Awards data for the Worst Picture category.

### GET `/api/producers/intervals`

Returns the producers with the longest and shortest intervals between consecutive awards.

**Response:**

```json
{
  "min": [
    {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer Name",
      "interval": 13,
      "previousWin": 1986,
      "followingWin": 1999
    }
  ]
}
```

**Response Fields:**
- `min`: Array of producers with the shortest interval between awards
- `max`: Array of producers with the longest interval between awards
- `producer`: Name of the producer
- `interval`: Number of years between consecutive awards
- `previousWin`: Year of the previous award
- `followingWin`: Year of the following award

## Project Structure

The project follows Clean Architecture principles with the following structure:

- `src/adapters/` - Controllers and routes
- `src/application/` - Use cases and business logic
- `src/domain/` - Entities and repository interfaces
- `src/infrastructure/` - Database, data loading, and external services
- `src/main/` - Application configuration and entry point
- `tests/` - End-to-end and unit tests

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **SQLite** - Database
- **Jest** - Testing framework
- **Nodemon** - Development hot reload

---
