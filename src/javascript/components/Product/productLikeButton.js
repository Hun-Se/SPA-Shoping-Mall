import Component from "../../core/Component.js";

class ProductLikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.checkLikeList(),
    };
  }

  checkLikeList() {
    if (!localStorage.getItem("likeList")) {
      localStorage.setItem("likeList", JSON.stringify([]));
    }
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    return likeList.includes(this.props.id);
  }

  changeLiked() {
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    if (this.checkLikeList()) {
      const newLikeList = likeList.filter((id) => id != this.props.id);
      localStorage.setItem("likeList", JSON.stringify(newLikeList));
    } else {
      likeList.push(this.props.id);
      localStorage.setItem("likeList", JSON.stringify(likeList));
    }
    this.setState({ liked: this.checkLikeList() });
  }

  // state가 바뀌면 리렌더링이 일어나야한다.
  setState(newState) {
    this.state = newState;
    this.updater();
  }
  updater() {
    const rendered = this.render();
    this.lastRendered.replaceWith(rendered);
    this.lastRendered = rendered;
  }

  // 클릭을 하면 좋아요 목록에 추가한다.
  // 문제점 -> Component에서는 render에서 요소를 만들고 컴포넌트를 생성한다.
  // 해당부분에서 요소를 직접 조작하는것은 우리가 만든 컴포넌트 규칙에 맞지 않아보인다.
  // 그럼 직접 요소를 조작하지 않고 하려면??

  // render 밖에서 요소에 접근하여 조작 하는걸 reder안에서 조작하도록 수정해주었다.
  // 하지만 해당 컴포넌트가 새로 렌더링이 되지 않아 화면의 변화가 없다.
  // 그러면 render에서 this.liked에 맞춰 렌더링 해주도록 변경하자 -> 클릭 했을 때 this.liked만 바꿔주기
  render() {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    this.state.liked && likeButton.classList.add("on");

    const likeButtonIr = document.createElement("span");
    likeButtonIr.setAttribute("class", "ir");
    likeButtonIr.innerText = "좋아요 버튼";

    likeButton.appendChild(likeButtonIr);
    likeButton.addEventListener("click", (e) => {
      e.preventDefault(); // html의 기본동작(새로고침,submit 등)을 막는다.
      e.stopPropagation(); // 버블링 중단하기(이벤트 캡처링과 버블링), 이벤트 전파를 막는다.
      this.changeLiked();
      console.log(this.state.liked);
    });
    return likeButton;
  }
  initailze() {
    const rendered = this.render();
    this.lastRendered = rendered;
    return rendered;
  }
}

export default ProductLikeButton;
