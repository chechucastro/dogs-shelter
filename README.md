# The Dog App 🐕

A Vue 3 + TypeScript application for managing and viewing dogs by breed in a shelter. 
Built following SOLID principles and atomic design patterns to decouple logic from presentation to make components reusable,extensible and maintainable.

## Features

- 🐕 **Dog List View**: Browse available dogs with table or card views
- 🔍 **Breed Filtering**: Filter dogs by breed with searchable dropdown
- 📄 **Server-Side Pagination**: Navigate through large lists using API pagination headers
- 📱 **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- 👤 **Admin Features**: Timeline view restricted to admin users
- 🎨 **Multiple View Modes**: Switch between table, cards, and mini cards
- ⏱️ **Timeline**: View dog history and events (admin only)
- 🖼️ **Image Loading**: Skeleton loaders for better UX during image loading
- 🧪 **Comprehensive Testing**: Unit tests covering components, stores, and services

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vue Router** - Routing
- **Element Plus** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool
- **Vitest** - Unit testing framework
- **The Dog API** - External API for dog data [https://docs.thedogapi.com/](https://docs.thedogapi.com/)

## Project Structure

The project follows **Atomic Design** principles:

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   ├── BaseButton/         # Button component
│   │   ├── BaseButtonGroup/    # Button group wrapper
│   │   ├── BaseCard/           # Card component (Element Plus wrapper)
│   │   ├── BaseImage/          # Image component with lazy loading
│   │   ├── BaseImageLoader/    # Skeleton loader for images
│   │   ├── BasePagination/     # Pagination component
│   │   ├── BaseRadioButton/    # Radio button group
│   │   ├── BaseSelect/         # Select dropdown component
│   │   ├── BaseSkeleton/       # Skeleton loader component
│   │   └── BaseTable/          # Table component (Element Plus wrapper)
│   ├── molecules/      # Simple combinations
│   │   ├── BaseCard/           # Dog card with details
│   │   ├── BaseBreedFilter/     # Breed filtering component
│   │   └── BaseCardGrid/        # Grid layout for cards
│   └── organisms/      # Complex components
│       └── BaseDogTable/        # Dog table and timeline components
│           ├── DogTable.vue      # Table view component
│           └── DogTimeline.vue  # Timeline component
├── views/              # Page-level components
│   ├── DogListView.vue         # Main list view
│   ├── DogDetailsView.vue      # Dog details page
│   └── DogTimelineView.vue     # Timeline view (admin only)
├── stores/             # Pinia stores
│   ├── dog.store.ts            # Dog data and state management
│   └── user.store.ts            # User authentication state
├── services/           # API services
│   └── dog-api.service.ts      # The Dog API integration
├── composables/       # Vue composables
│   ├── useDogList.ts           # Dog list logic
│   ├── useDogDetails.ts        # Dog details logic
│   ├── useDogTimeline.ts       # Timeline logic
│   └── useBreedFilter.ts       # Breed filter logic
├── utils/             # Utility functions
│   ├── dog.utils.ts            # Dog data transformations
│   ├── navigation.utils.ts    # Navigation helpers
│   └── date.utils.ts           # Date formatting
├── types/              # TypeScript type definitions
├── enums/              # Constants and enums
├── router/             # Vue Router configuration
├── layouts/            # Layout components
└── mocks/              # Mock data for the timeline part. The api doesn't have a timeline endpoint.
├── .env                # Environment variables containing the api key and base url
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint code

## Features in Detail

### View Modes

1. **Table View**: Traditional table layout with sortable columns and pagination
2. **Card View**: Detailed cards showing dog information with pagination
3. **Mini Card View**: Compact cards with just name and image with pagination

All view modes support server-side pagination, ensuring efficient data loading and accurate total counts from the API.

### Admin Features

- Admin users can view the timeline for each dog
- Timeline shows events like "Dog found", "Joined Shelter", etc.
- Toggle between admin and regular user in the header

### API Integration

The app uses [The Dog API](https://thedogapi.com/) to fetch dog breeds and images. 

**Features:**
- **Optimized Loading**: Single API call on initial load (fetches dogs and extracts breeds from response)
- **Server-Side Pagination**: Uses API response headers (`Pagination-Count`, `Pagination-Page`, `Pagination-Limit`) for accurate pagination
- **Breed Accumulation**: Breeds are automatically extracted and accumulated from API responses as users navigate
- **Breed Filtering**: Filter dogs by breed with server-side filtering
- **Image Size Variants**: Support for different image sizes (thumb, small, med, full)
- **Error Handling**: Comprehensive error handling and loading states
- **Efficient Data Fetching**: Only fetches the current page of data, reducing bandwidth

The API key is configured via environment variables (`VITE_DOG_API_KEY`).

## Testing

The project uses Vitest for unit testing with comprehensive coverage:

- **Component Tests**: All atom components have full test coverage
- **Store Tests**: Pinia stores are tested for state management
- **Service Tests**: API service layer is fully tested with mocked fetch
- **Utility Tests**: Utility functions have unit tests
- **View Tests**: View components are tested for rendering

Tests are organized in `__tests__` directories alongside their corresponding files.

Run tests with:
```bash
npm run test          # Run all tests
npm run test:ui       # Run tests with UI
```

## Design Principles

- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
- **Composition API**: Using Vue 3 Composition API for better code organization
- **Type Safety**: Full TypeScript support throughout the application

