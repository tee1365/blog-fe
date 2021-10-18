import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import theme from './theme';
import { createBrowserHistory } from 'history';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PaginatedPosts } from './generated/graphql';

export const history = createBrowserHistory();

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:4000/graphql'
      : 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // used for pagination
          posts: {
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts
            ): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
