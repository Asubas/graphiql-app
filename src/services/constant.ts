const DEFAULT_URL_ENDPOINT = 'https://rickandmortyapi.com/graphql';
const DEFAULT_QUERY_JSON = `query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`;

const DEFAULT_SDL_ENDPOINT = 'https://rickandmortyapi.com/graphql?sdl';

export { DEFAULT_QUERY_JSON, DEFAULT_URL_ENDPOINT, DEFAULT_SDL_ENDPOINT };
