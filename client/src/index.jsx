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

    this.get()

  }

  search (term) {
    console.log(`${term} was searched`);
    //Send request to Server
    $.ajax({
      type: 'POST',
      url: "/repos",
      data: {term:term},
      success: (repoList) => {
        this.get()
         },
      })
  }

  get () {
    $.ajax({
      type: 'GET',
      url: "/repos",
      success: (repoList) =>{
        this.setState({repos: []});
        repoList = JSON.parse(repoList)
        repoList.sort((a,b) => {
          return (a.size - b.size)
        })
        console.log(repoList)
        this.setState({repos: repoList})
      }
  })
}

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      {this.state.repos.map((repo) =>{
          return <RepoList repos={repo} key={repo.id}/>
      })}
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));