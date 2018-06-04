import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import './App.css';
import list from './list';

function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    }

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
  }

  removeItem(id) {
    //const isNotId = item => item.objectID !== id;
    const updateList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updateList });
  }

  searchValue(event) {
    this.setState({ searchTerm: event.target.value });
  }



  render() {

    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <Grid>
          <Row className='jumbotron'>
            <Search
              onChange={this.searchValue}
              value={searchTerm}
            >Search:</Search>
            <Table
              list={list}
              searchTerm={searchTerm}
              removeItem={this.removeItem}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

const Search = ({ onChange, value, children }) => {
  return (
    <form>
      <h4>{children}</h4>
      <input
        type="text"
        onChange={onChange}
        value={value}
      />
    </form>
  )
}

const Table = ({ list, searchTerm, removeItem }) => {
  return (
    <div>
      {
        list.filter(isSearched(searchTerm)).map(item =>
          <div key={item.objectID}>
            <h1> <a href={item.url}>{item.title}</a> by {item.author}</h1>
            <h4>{item.num_comments} comments |  {item.points} points</h4>
            {/* Remove item function*/}
            <Button
              type="button"
              onClick={() => removeItem(item.objectID)}
            >
              Remove Me
          </Button>
          </div>
        )
      }
    </div>
  )
}

const Button = ({ type, onClick, children }) => 
<button type={type} onClick={onClick} > 
  {children} 
</button>

export default App;


