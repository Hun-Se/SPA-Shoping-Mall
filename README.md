# SPA 쇼핑몰

- Vanila JS로 구현한 SPA 쇼핑몰 입니다.

## 배운점

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
