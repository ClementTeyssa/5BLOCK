class App extends React.Component {
  render() {
    return <Home />;
  }
}

class Home extends React.Component {
  render() {
    return (
      <div class="callout large primary">
        <div class="text-center">
          <h1>Our Blog</h1>
          <h2 class="subheader">Such a Simple Blog Layout</h2>
          <br />
          <button class="enableEthereumButton">Log on</button>
          <br />
          <button class="showEthereumButton">Show account</button>
          <h2>
            Account: <span class="showAccount"></span>
          </h2>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
