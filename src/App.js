import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: "",
      movieList: [],
      submitButtonClicked: false
    };
  }

  handleChange = (e) => {
    this.setState({ movieName: e.target.value });
  };

  handleSubmit = async () => {
    try {
      let response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.state.movieName}&ts=1&apikey=6871af630ca51742153d2db8dbf10dcb&hash=609bb5211dbf0e54c53e927bb92f5ee7`
      ).then((res) => res.json());
      this.setState({ movieList: response.data.results, submitButtonClicked: true });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="App">
        <input value={this.state.movieName} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
        <div className="parentCard">
          {this.state.movieList.length > 0 ? this.state.movieList.map((movie) => {
            return (
              <div key={movie.id} className="card">
                <img alt="image" src={movie.thumbnail.path} />
                <div className='descriptionParentView'>
                  <div>{movie.name}</div>
                  <div className="descriptionView">{movie.description? movie.description : <a href={movie.urls[0].url}>Click Here</a>}</div>
                </div>
              </div>
            );
          }) : this.state.submitButtonClicked && <div>Data not found</div>}
        </div>
      </div>
    );
  }
}

export default App;
