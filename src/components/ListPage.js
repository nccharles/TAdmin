import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allPlacesQuery.refetch()
    }
  }

  render() {
    if (this.props.allPlacesQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading...
          </div>
        </div>
      )
    }

    let blurClass = ''
    if (this.props.location.pathname !== '/home') {
      blurClass = 'blur'
    }

    return (
      <div style={{ backgroundColor: '#00b894' }} className={'w-100 flex justify-center pa6' + blurClass}>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          <Link
            to='/create'
            className='ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'
          >
            <img
              src={require('../assets/plus.svg')}
              alt=''
              className='plus mb3'
            />
            <div>New Destination</div>
          </Link>
          {this.props.allPlacesQuery.allLocations && this.props.allPlacesQuery.allLocations.map(post => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.allPlacesQuery.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const ALL_PLACES_QUERY = gql`
  query AllPlacesQuery {
    allLocations{
      id
      logo
      name
      }
  }
`

const ListPageWithQuery = graphql(ALL_PLACES_QUERY, {
  name: 'allPlacesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ListPage)

export default ListPageWithQuery
