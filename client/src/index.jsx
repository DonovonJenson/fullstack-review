import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    //Send request to Server
    $.ajax({
      type: 'POST',
      url: "/repos",
      data: {term:term},
      success: (repoNumber) => {
        console.log(repoNumber)
        }
      })
    //Set state to additional term
    var current = this.state.repos
    current.push(term);
    this.setState({repos: current})
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));