class Router {
  constructor(routes, el) {
    this.routes = routes;
    this.el = el;
    console.log(this.routes);
    console.log(this.el);
  }

  router = async () => {
    const potenialMatches = this.routes.map((route) => {
      return {
        route: route,
        result: location.pathname.match(this.pathToRegex(route.path)),
      };
    });
    let match = potenialMatches.find((potenialMatch) => {
      potenialMatch.result !== null;
    });
    if (!match) {
      match = {
        route: this.routes[0],
        result: [location.pathname],
      };
    }
    const view = new match.route.view(this.getParams(match));
    const getView = await view.render();
    document.querySelector(this.el).innerHTML = "";
    document.querySelector(this.el).appendChild(getView);
  };

  pathToRegex(path) {
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
  }

  getParams(match) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w)/g)).map(
      (result) => result[1]
    );
    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  }

  navigateEvent() {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
          e.preventDefault();
          this.navigateTo(e.target.href);
        }
      });
      this.router();
    });
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.router();
  }
}

export default Router;
