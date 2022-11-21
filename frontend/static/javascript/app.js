import { ProductPage, ProductDetail } from "./pages/index.js";
import { Router } from "./utils/index.js";

export default class App {
  constructor(props) {
    this.props = props;
  }
  async setup() {
    const { el } = this.props;
    const routes = [
      { path: "/", view: ProductPage },
      // { path: "/dtail", view: ProductDetail },
      { path: "/dtail/:id", view: ProductDetail },
    ];
    new Router(routes, el).router();
  }
}
