import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from './Spinner';

import { searchUsers } from './helpers/apiCaller';

export class GithubSearch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,

      query: '',
      usersFound: []
    };
  }

  /* const [text, setText] = useState(''); */

  searchGithub = async () => {
    try {
      const usersArray = await searchUsers(this.state.query);
      console.log('GithubSearch -> usersArray', usersArray);

      this.setState({ usersFound: usersArray });
    } catch (err) {
      if (err) console.log('error', err);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });

    if (this.state.query.length < 3) {
      console.log('too few!');
    } else {
      this.searchGithub();
      /*  setText(''); */
    }
    this.setState({ isLoading: false });
  };

  onChange = e => this.setState({ query: e.target.value });

  render() {
    return (
      <div>
        {/* seearch input */}
        <div>
          <form onSubmit={this.onSubmit} className='form'>
            <input
              type='text'
              name='text'
              placeholder='Search Users...'
              value={this.state.query}
              onChange={this.onChange}
            />
            <input
              type='submit'
              value='Search'
              className='btn btn-dark btn-block'
            />
          </form>
        </div>
        {/* results list */}
        {this.state.isLoading ? (
          <Spinner />
        ) : this.state.usersFound.length > 0 ? (
          this.state.usersFound.map(user => (
            <div className='card text-center'>
              <img
                src={user.avatar_url}
                alt=''
                className='round-img'
                style={{ width: '60px' }}
              />
              <h3>{user.login}</h3>
              <h4>{user.url}</h4>
              <div></div>
            </div>
          ))
        ) : (
          <div> 'search'</div>
        )}
      </div>
    );
  }
}
