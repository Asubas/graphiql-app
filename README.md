# REST/GraphQL Client <img src="./public/client-rest.svg" alt="Image 1 Description" style="margin-left: 10px; margin-right: 10px;" width="30"> <img src="./public/client-graphql.svg" alt="Image 2 Description" width="30">

This project is a universal client designed to handle REST and GraphQL API requests efficiently. It supports the entry of headers, queries, variables, and body parameters. The client also offers a convenient feature to store the history of requests and allows restoring previous requests with all their associated data.

This application was created as part of the RSSchool React course by

1. [Asubas](https://github.com/Asubas) (team lead)
2. [lipan4836](https://github.com/lipan4836)
3. [pdasya](https://github.com/pdasya)

## Features

- Universal API Client: Make requests to any REST or GraphQL API.
- Custom Input Support: Easily input headers, query parameters, variables, and body data for requests.
- Request History: Automatically stores request histories and allows users to restore previously made requests by loading all previously entered data.
- JSON/text input mode for body request, prettifying it.

## Technology Stack
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nextjs/nextjs-original.svg" title="NextJS" alt="NextJS" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="TypeScript" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/firebase/firebase-plain-wordmark.svg" title="Firebase" alt="Firebase" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="Material UI" alt="Material UI" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" title="Jest" alt="Jest" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg" title="ESLint" alt="ESLint" width="50" height="50"/>&nbsp;
<img src="/public/stack-prettier.svg" title="Prettier" alt="Prettier" width="50" height="50"/>&nbsp;

## Getting Started

### Prerequisites

Node.js and npm installed on your machine.

### Installation

- Clone the repository
- Navigate to the project directory
- Install the dependencies:

```
npm install
```

### Running the Development Server

To start the development server, run the following command:

```
npm run dev
```

This will launch the application in development mode. Open your browser and navigate to http://localhost:3000.

### Build the Application

To build the application for production, use:

```
npm run build
```

This command will generate an optimized build in the .next directory.

### Start the Application

To start the application in production mode, execute:

```
npm run start
```

### Linting and Formatting

- ESLint: Ensure code quality and consistency with:

```
npm run lint
```

- Prettier: Automatically format your code with:

```
npm run format:fix
```

### Testing

- Run Tests: Run the test suite and collect coverage:

```
npm run test
```

- Watch Tests: To run tests in watch mode:

```
npm run test:watch
```
