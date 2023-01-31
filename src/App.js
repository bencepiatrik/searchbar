import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [githubData, setGithubData] = useState([""])
  const fetchData = () => {
    return fetch(`https://api.github.com/users/bencepiatrik/repos`)
      .then((response) => response.json())
      .then((response) => setGithubData(response))
  }

  useEffect(() => { fetchData() }, [])

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  };

  let searchedStories;
  if (githubData.length > 1) {
    searchedStories = githubData.filter(data =>
      data.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      data.updated_at.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  } else searchedStories = githubData;

  const List = props =>
    props.list.map((item, i) => (
      <div key={i} className="repo-item">
        <h5>{item.name}</h5>
        <span>{item.description}</span>
        <span>{item.language}</span>
        <hr></hr>
        <span>{item.updated_at}</span>
      </div>
    ))

  return (
    <div className="App" >
      < Search onSearch={handleSearch} />
      <div className='repo-container' >
        < List list={searchedStories} />
      </div>
    </div>
  );
}


const Search = props => (
  <div className='searchbar'>
    <input id="search" type="text" placeholder='Search...' onChange={props.onSearch}></input>
  </div>
)

export default App;