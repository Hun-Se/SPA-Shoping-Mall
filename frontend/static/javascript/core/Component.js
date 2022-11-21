class Component {
  constructor(props) {
    this.props = props;
  }

  render() {
    throw new Error("render가 비어 있습니다.");
  }
}

export default Component;
