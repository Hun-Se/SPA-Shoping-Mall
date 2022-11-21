import Component from "../../core/Component.js";

class ProductPrice extends Component {
  render() {
    const productPriceContainer = document.createElement("div");
    productPriceContainer.setAttribute("class", "product-price");

    const productPrice = document.createElement("strong");
    productPrice.setAttribute("class", "price m-price");
    const priceType = document.createElement("span");
    priceType.innerText = "원";
    productPriceContainer.appendChild(productPrice);

    if (this.props.discountRate > 0) {
      //할인 금액 계산
      // this.price = 할인된 금액
      // 할인 엘리멘트 추가
      const discountRateContainer = document.createElement("div");
      discountRateContainer.setAttribute("class", "price-discount");

      const originPrice = document.createElement("strong");
      originPrice.setAttribute("class", "price-strikethrough");
      originPrice.innerText =
        this.props.price.toLocaleString("ko-Kr") + priceType.innerText;

      const discountRateDisplay = document.createElement("strong");
      discountRateDisplay.setAttribute("class", "discount-rate");
      discountRateDisplay.innerText = this.props.discountRate + "%";

      this.props.price =
        this.props.price - this.props.price * (0.01 * this.props.discountRate);

      originPrice.appendChild(priceType);
      discountRateContainer.appendChild(originPrice);
      discountRateContainer.appendChild(discountRateDisplay);
      productPriceContainer.appendChild(discountRateContainer);
    }

    productPrice.innerText = this.props.price.toLocaleString("ko-Kr");
    productPrice.appendChild(priceType);
    return productPriceContainer;
  }
}

export default ProductPrice;
