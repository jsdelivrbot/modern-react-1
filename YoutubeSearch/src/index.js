import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import appConfig from '../app.config';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import _ from 'lodash';

const apikey = appConfig.youtubeAPI;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key: apikey, term}, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));