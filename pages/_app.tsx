import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Layout } from "components";
import { store } from "features";
import "@fontsource/spartan";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "/api/graphql",
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute="class"
          themes={["light", "dark"]}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
function omitDeep(
  variables: Record<string, any>,
  arg1: string
): Record<string, any> {
  throw new Error("Function not implemented.");
}
