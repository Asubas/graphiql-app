import {
  IntrospectionQuery,
  IntrospectionSchema,
  buildClientSchema,
  getIntrospectionQuery,
  graphql,
} from 'graphql';
import request from 'graphql-request';

function ShowSchema(query: string) {
  const endpoint = 'https://rickandmortyapi.com/graphql';

  async function fetchSchema(endpoint: string) {
    const introspectionQuery = getIntrospectionQuery();
    const response: IntrospectionQuery = await request(endpoint, introspectionQuery);
    console.log('response:', response);
    return response;
  }

  (async () => {
    const schemaData: IntrospectionQuery = await fetchSchema(endpoint);
    const schema = buildClientSchema({ __schema: schemaData.__schema });
    console.log('Schema built:', schema);
    const typeMap = schema.getTypeMap();
    console.log('Type Map:', typeMap);
  })();
}

export { ShowSchema };
