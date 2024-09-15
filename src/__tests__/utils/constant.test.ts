import {
  DEFAULT_URL_ENDPOINT,
  DEFAULT_QUERY_JSON,
  DEFAULT_SDL_ENDPOINT,
} from '@/src/services/constant';

describe('GraphQL Constants', () => {
  it('should have the correct default URL endpoint', () => {
    expect(DEFAULT_URL_ENDPOINT).toBe('https://rickandmortyapi.com/graphql');
  });

  it('should have the correct default query JSON', () => {
    expect(DEFAULT_QUERY_JSON).toBe(`query {
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
  }`);
  });

  it('should have the correct default SDL endpoint', () => {
    expect(DEFAULT_SDL_ENDPOINT).toBe('https://rickandmortyapi.com/graphql?sdl');
  });
});
