import React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761,
  },
}

class DetailPage extends React.Component {

  render() {
    if (this.props.placeQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading...
          </div>
        </div>
      )
    }

    const {Location} = this.props.placeQuery
    return (
      <Modal
        isOpen
        contentLabel='Create Location'
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className='close fixed right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div
          className='delete ttu white pointer fw8 absolute left-0 top-0 br2'
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div
          className='bg-white detail flex flex-column no-underline br2 h-100'
        >
          <div
            className='image'
            style={{
              backgroundImage: `url(${Location.logo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              paddingBottom: '100%',
            }}
          />
          <div className='flex items-center black-80 fw3 description'>
            {Location.name}
          </div>
          <button
                style={{ backgroundColor: '#fdcb6e' }}
                className='w-100 pa3 bg-primary-10 bn dim ttu pointer'
                onClick={this.handleUpdate}
              >
               UPDATE
              </button>
        </div>
      </Modal>
    )
  }

  handleDelete = async () => {
    await this.props.deletePlaceMutation({variables: {id: this.props.placeQuery.Location.id}})
    this.props.history.replace('/home')
  }
  handleUpdate = async () => {
    this.props.history.replace(`/edit/${this.props.placeQuery.Location.id}`)
  }
}

const DELETE_PLACE_MUTATION = gql`
  mutation DeletePlaceMutation($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`
const PLACE_QUERY = gql`
  query PlaceQuery($id: ID!) {
    Location(id: $id) {
      id
      logo
      name
    }
  }
`

const DetailPageWithGraphQL = compose(
  graphql(PLACE_QUERY, {
    name: 'placeQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_PLACE_MUTATION, {
    name: 'deletePlaceMutation'
  })
)(DetailPage)



const DetailPageWithDelete = graphql(DELETE_PLACE_MUTATION)(DetailPageWithGraphQL)

export default withRouter(DetailPageWithDelete)
