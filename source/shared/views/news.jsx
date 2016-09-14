'use strict';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts,fetchPostsIfNeeded } from '../actions'
import Posts from './posts';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props.receivePosts
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            </span>
          }
        </p>
        {posts && isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {posts && !isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts && posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  receivePosts: React.PropTypes.shape({
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
  }),
  actions: React.PropTypes.shape({
    fetchPostsIfNeeded: PropTypes.func.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    receivePosts: {
      posts: ('posts' in state) ?  state.posts : [],
      isFetching: ('isFetching' in state) ? state.isFetching : true,
      lastUpdated: ('lastUpdated' in state) ? state.lastUpdated : null
    }
  }

}

export default connect(mapStateToProps)(App)

