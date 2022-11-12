# SPA 쇼핑몰

- Vanila JS로 구현한 SPA 쇼핑몰 입니다.

## 배운점

### Vanila jS 싱글페이지(SPA) 구현 방법

1. Js로 돔을 조작하기 위한 app.js 및 index.js 구현

```JavaScript
//app.js
export default class App {
  constructor(props) {
    this.props = props;
  }
  async setup() {
    const { el } = this.props;

    const router = new Router({
      "/": ProductPage,
      // "/detail": ProductDetail,
      "/detail/:id": ProductDetail,
    });

    router.init(el);
  }
}
```

```JavaScript
// index.js
import App from "./app.js";

const config = {
  el: "#root",
};

new App(config).setup();
```

2. 라우터로 싱글페이지 구현

```JavaScript
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
      // a의 하위요소들을 클릭하면 a태그의 기본 이벤트(페이지 이동)가 발생
      // 정확하게 a를 클릭했을 때에만 url로 연결이 되는 문제 해결
      // 이미지나, title이 a태그 안에 있기 때문
      // title 옆 빈 공간을 클릭하면 잘 이동함 -> 가장 근접한 상위요소중 a태그를 찾도록 설계
      // if (e.target.tagName.toLowerCase() === "a") {
      //   e.preventDefault();
      //   this.routePush(e.target.href);
      // }

      // closest() : 상위요소 중 가장 가까운 요소를 찾는다.
      if (e.target.closest("a")) {
        e.preventDefault();
        this.routePush(e.target.closest("a").href);
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
```

- localStorage.getItem(""): 로컬스토리지에서 조회

- localStorage.setItem(""): 로컬스트로지에 저장

- 로컬 스토리지 등에서 배열([])을 사용할 때에는 JSON.stringify([])로 문자열로 변환한다.(로컬스토리지는 문자열로 이루어지기 때문이고 배열을 문자열로 바꾸기 위함)

- 추상화 : 공통되는 속성을 하나로 묶어 상속받아서 사용한다. 코드가 짧아지고 가독성이 높아진다. 재사용성도 높아진다. 해당 클래스가 어떤 컴포넌트인지 파악하기 쉬워진다.

- 공통 constructor를 묶어줄 때에는 super(값)을 작성해 주어야 하며, 만약 모든 선언값을 상속받는 다면 constructor를 생략하는것도 가능하다.

```JavaScript

class ProductName extends Component {
  // constructor를 생성하지 않아도 자동으로 상속받은 constructor를 실행해준다.
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const productName = document.createElement("strong");
    productName.setAttribute("class", "product-name");
    productName.innerText = this.props.name;
    return productName;
  }
}
```

- 상품가격에 콤마(,) 붙이기

```JavaScript
.toLocaleString("ko-Kr")
```

- 라우터 기본 동작 원리
  history를 사용하여 구현 가능

```HTML
<body>
  <button id="a">a</button>
  <button id="b">b</button>
  <button id="c">c</button>
  <button id="a_aa">a/aa</button>
  <button id="b_bb">b/bb</button>
  <button id="a_aa_3">a/aa/3</button>
  <button id="re">re</button>
</body>
```

```JavaScript
document.querySelector("#a").addEventListener("click", function () {
  history.pushState({ data: "데이터a", garbage: "1" }, "title a", "/a");
});

document.querySelector("#b").addEventListener("click", function () {
  history.pushState({ data: "데이터b", garbage: "2" }, "title b", "/b");
});

document.querySelector("#c").addEventListener("click", function () {
  history.pushState({ data: "데이터c", garbage: "3" }, "title c", "/c");
});

document.querySelector("#a_aa").addEventListener("click", function () {
  history.pushState(
    { data: "데이터a_aa", garbage: "4" },
    "title a_aa",
    "/a/aa"
  );
});

document.querySelector("#b_bb").addEventListener("click", function () {
  history.pushState(
    { data: "데이터b_bb", garbage: "5" },
    "title b_bb",
    "/b/bb"
  );
});

document.querySelector("#a_aa_3").addEventListener("click", function () {
  history.pushState(
    { data: "데이터a_aa_3", garbage: "6" },
    "title a_aa_3",
    "/a/aa/3"
  );
});

document.querySelector("#re").addEventListener("click", function () {
  history.pushState({ data: "replace", garbage: "7" }, "title replace", "/re");
});

// 뒤로 가기
window.addEventListener("popstate", function () {
  console.log("popstate", history.state);
});
```
