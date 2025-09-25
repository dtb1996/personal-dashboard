# React Dashboard

A customizable dashboard built with **React** and **SCSS modules**.
It includes a collection of interactive cards (weather, calculator, todos, jokes, etc.) with a responsive layout and theming support.

## Features

- **Consistent Card UI:** all dashboard widgets use a shared `<Card />` component for styling.
- **Weather Card:** fetches live weather data using [OpenWeather API](https://openweathermap.org/api).
- **Todo Card:** add, remove, and mark tasks as complete.
- **Calculator Card:** simple math calculator.
- **Joke Card:** fetches random jokes from [JokeAPI](https://jokeapi.dev/).
- **Theme Toggle** light/dark theme switching.
- **Responsive Layout:** adaptive sidebar, sticky header/footer, and grid/flexbox handling.

## Screenshots / Demo

### Dashboard Layout

![Dashboard Screenshot](docs/screenshots/dashboard.png)

### Live Demo

[Live Demo Link]()

## Tech Stack

- **Front End:** [React](https://react.dev/), [ReactIcons](https://github.com/react-icons/react-icons)
- **Styling:** [SCSS Modules](https://sass-lang.com/)
- **Tooling:** [Vite](https://vite.dev/) build tool
- **Code Quality and Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## Getting Started

Clone the repo and run locally:

```bash
# Clone the repository
git clone https://github.com/dtb1996/personal-dashboard.git

# Navigate to the project folder
cd personal-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

## Project Structure

```bash
src/
├── components/      # Reusable UI components (Card, Header, etc.)
├── pages/           # Main site pages (Dashboard, Settings, Profile)
│	└── Dashboard    # Cards found on the Dashboard
├── styles/          # Global styles
├── utils/           # Utility functions (weatherAPI.js, calculator.js)
└── App.jsx/         # Main app layout
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
