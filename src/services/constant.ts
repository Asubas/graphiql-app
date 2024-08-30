const DEFAULTURLENDPOINT = 'https://rickandmortyapi.com/graphql';
const DEFAULTQUERYJSON = `query {
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

export { DEFAULTQUERYJSON, DEFAULTURLENDPOINT };
