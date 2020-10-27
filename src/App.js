import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      searchQuery: '',
      error: ''
    }
    this.apiKey = 'crVOwUQBO7BRdnKWyO3F1jCeNxZWjshH';
  }

  updateSearch = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  searchForGifs = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${this.state.searchQuery}&rating=g`);
      const gifData = await response.json();
      console.log(gifData);
      this.setState({gifs: gifData.data, searchQuery: ''})
    } catch (error) {
      this.setState({error: error});
    }
      
  }
  render() {
    const allGifs = this.state.gifs
      .map(gif => <img key={gif.id} src={gif.url} alt={gif.title} />)

    return (
      <div className="App">
        <h1>Hey search something</h1>
        <input type="text" value={this.state.searchQuery} onChange={this.updateSearch} />
        <button onClick={this.searchForGifs}>Search</button>
        {this.state.error}
        <section>{allGifs}</section>
      </div>
    );
  }
}

export default App;
