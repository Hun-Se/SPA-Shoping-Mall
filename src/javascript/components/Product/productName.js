import Component from "../../core/Component.js";

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

// class ProductName {
//   constructor(name) {
//     this.name = name;
//   }
//   render() {
//     const productName = document.createElement("strong");
//     productName.setAttribute("class", "product-name");
//     productName.innerText = this.name;
//     return productName;
//   }
// }

export default ProductName;
