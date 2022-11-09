class Router {
  constructor(routes) {
    if (!routes) {
      console.error("Can not initailze routes, need rotues!");
    }
    this.routes = routes;

    // routes 경로 id값들을 파싱하기 위한 함수
    for (const key in routes) {
      const route = routes[key];
      if (key.indexOf(":") > -1) {
        const [_, routeName, param] = key.split("/");
        this.routes["/" + routeName] = route;
        // /:id는 파싱받기 위한 것 임으로 필요없기 때문에 삭제
        delete this.routes[key];
      }
    }
    console.log(this.routes);
  }

  init(rootElementId) {
    if (!rootElementId) {
      console.error("Can not initailize Route, not define rootElementId");
      return null;
    }
    this.rootElementId = rootElementId;

    this.routing(window.location.pathname);

    window.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        e.preventDefault();
        this.routePush(e.target.href);
      }
    });

    window.onpopstate = () => this.routing(window.location.pathname);
  }

  routePush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    const [_, routeName, param] = pathname.split("/");
    let page = "";

    if (this.routes[pathname]) {
      const component = new this.routes[pathname]();
      page = component.render();
    } else if (param) {
      const component = new this.routes["/" + routeName](param);
      page = component.render();
    }

    if (page) {
      this.render(page);
    }
  }
  render(page) {
    const rootElement = document.querySelector(this.rootElementId);
    rootElement.innerHTML = "";
    rootElement.appendChild(page);
  }
}

export default Router;
