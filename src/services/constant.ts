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

const statusMessages: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

const DEFAULT_REST_ENDPOINT = 'https://api.restful-api.dev/objects';
const DEFAULT_REST_METHOD = 'GET';
const DEFAULT_REST_HEADERS = [{ key: 'Content-Type', value: 'application/json' }];
const DEFAULT_REST_QUERIES = [{ key: '', value: '' }];
const DEFAULT_REST_VARIABLES = [{ key: '', value: '' }];

export {
  DEFAULT_QUERY_JSON,
  DEFAULT_URL_ENDPOINT,
  DEFAULT_SDL_ENDPOINT,
  statusMessages,
  DEFAULT_REST_ENDPOINT,
  DEFAULT_REST_METHOD,
  DEFAULT_REST_HEADERS,
  DEFAULT_REST_VARIABLES,
  DEFAULT_REST_QUERIES,
};
