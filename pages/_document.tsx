import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Invoice App" />
          <meta
            name="keywords"
            content="NextJS, Tailwind, React, Redux, graphql, Tony David, handleryouth"
          />
          <meta name="language" content="English" />
          <meta name="language" content="Indonesia" />
          <meta name="author" content="Tony David" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <body>
          <div id="modalportal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
