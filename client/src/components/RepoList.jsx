import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo Name</h4>
    {props.repos.userName}: <a href={`${props.repos.html_url}`}>{props.repos.name}</a>
    <br/>Size: {props.repos.size}
  </div>
)

export default RepoList;