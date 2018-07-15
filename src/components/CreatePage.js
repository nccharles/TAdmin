import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

class CreatePage extends React.Component {

  state = {
    city:'',
  color:'#00b894',
  logo:'',
  logosmall:'',
  name:'',
  tdescription:'',
    im1:'',
    im2:'',
    phone:'',
  category:'',
  loadtxt: ''
  }

  render() {
    console.log(this.state.name)
    console.log(this.state.city)
    console.log(this.state.logo)
    console.log(this.state.logosmall)
    console.log(this.state.tdescription)
    console.log(this.state.title)
    console.log(this.state.im1)
    console.log(this.state.im2)
    console.log(this.state.category)
    console.log(this.state.tdescription)
    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div style={{ backgroundColor: '#113F53' }} className='pa4 flex justify-center bg-white'>
          <div style={{ maxWidth: 400 }} className=''>
            {/* {this.state.logo &&
              <img
                src={this.state.logo}
                alt=''
                className='w-100 mv3'
              />} */}
               <input
              className='w-100 pa3 mv2'
              value={this.state.name}
              placeholder='Destination Name'
              onChange={e => this.setState({ name: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.city}
              placeholder='Destination city'
              onChange={e => this.setState({ city: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.logo}
              placeholder='Profile Picture Url'
              onChange={e => this.setState({ logo: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.logosmall}
              placeholder='Background Url'
              onChange={e => this.setState({ logosmall: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.phone}
              placeholder='Phone number'
              onChange={e => this.setState({ phone: e.target.value })}
              autoFocus
            />
            <select className='w-100 pa3 mv2'
            value={this.state.category}
            onChange={e => this.setState({ category: e.target.value })}
            >
            {this.props.allCategoriesQuery.allNeeds && this.props.allCategoriesQuery.allNeeds.map(cat => (
        
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
            </select>
            <input
              className='w-100 pa3 mv2'
              value={this.state.im1}
              placeholder='First Image Url'
              onChange={e => this.setState({ im1: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.im2}
              placeholder='Second Image Url'
              onChange={e => this.setState({ im2: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.tdescription}
              placeholder='Description'
              onChange={e => this.setState({ tdescription: e.target.value })}
            />
            {this.state.tdescription &&
              this.state.logo && this.state.logosmall &&
              <button
                className='w-100 pa3 bg-primary-10 bn dim ttu pointer'
                onClick={this.handlePost}
              >
                {this.state.loadtxt?this.state.loadtxt:<div>CREATE DESTINATION</div>} 
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

  handlePost = async () => {
    this.setState({
      loadtxt:'Loading...'
  })
    const { city,
    color,
    logo,
    logosmall,
    name,
    tdescription,
      im1,
      im2,
      phone,
    category} = this.state
    await this.props.createLocationMutation({ variables: { city,
      color,
      logo,
      logosmall,
      name,
      tdescription,
        im1,
        im2,
        phone,
      category } })
    this.props.history.replace('/home')
  }

}

const CREATE_POST_MUTATION = gql`
  mutation CreateLocationMutation(
    $city: String!,
    $color: String!,
    $logo: String!,
    $logosmall: String!,
    $name: String!,
    $tdescription: String!,
    $im1: String!,
    $im2: String!,
    $phone: String!,
    $category: ID!,
  ) {
    createLocation(
      city: $city,
      name: $name,
      color:$color,
      tdescription: $tdescription,
      logo: $logo,
      logosmall: $logosmall,
      title: $name,
      images:[$im1,$im2],
      phone: $phone,
      needId: $category
    ){
      id
    name
    color
    city
    tdescription
    logo
    logosmall
    phone
    title
    images
    }
  }
`
const ALL_CATEGORIES_QUERY = gql`
  query AllCategoriesQuery {
    allNeeds{
      id
      name
      }
  }
`
const CreatePageWithMutation = compose(
  graphql(ALL_CATEGORIES_QUERY, {
    name: 'allCategoriesQuery',
  }),
  graphql(CREATE_POST_MUTATION, { 
    name: 'createLocationMutation' })
  )(CreatePage)

export default withRouter(CreatePageWithMutation)
