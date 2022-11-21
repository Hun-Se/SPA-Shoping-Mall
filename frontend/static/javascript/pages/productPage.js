import { ProductCard } from "../components/ProductCard/index.js";
import Component from "../core/Component.js";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.mainElement = document.createElement("main");
    this.product = {};
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch("https://test.api.weniv.co.kr/mall");
    const data = await response.json();
    this.product = await data;
  }

  // 상품 리스트 세팅하기
  async setProductList() {
    await this.getProductData();
    this.mainElement.classList.add("product");

    const productPageHeader = document.createElement("h1");
    productPageHeader.setAttribute("class", "ir");
    productPageHeader.innerText = "상품목록 페이지";
    this.mainElement.appendChild(productPageHeader);

    const productList = document.createElement("ul");
    productList.setAttribute("class", "product-list");

    this.product.forEach((item) => {
      const productItem = document.createElement("li");
      productItem.setAttribute("class", "product-item");
      const productCard = new ProductCard({ item: item });
      productItem.appendChild(productCard.render());
      productList.appendChild(productItem);
    });

    this.mainElement.append(productList);
  }

  render() {
    this.setProductList();
    return this.mainElement;
  }
}

export default ProductPage;
