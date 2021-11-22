import Document, { DocumentContext } from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();

    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return initialProps;
  }
}

export default MyDocument;
