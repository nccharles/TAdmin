import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

class LoginPage extends React.Component {

  state = {
    email:'',
  password:'',
  login: ''
 
  }
  handleLogin = async () => {
    this.setState({
        login:'Loading...'
    })
    const {email,password} = this.state
    let response
    try{
        response =  await this.props.LoginUserMutation({variables: {email,password}})
        this.props.history.replace('/home')
        console.log(response)
    }catch(error){
        console.log(error)
    }

}
  render() {
    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div style={{ backgroundColor: '#113F53' }} className='pa4 flex justify-center bg-white'>
          <div className=''>
           <div className='w-100 pa3 mv2'><h1 style={{ color:'#fff'}}>ADMIN LOGIN</h1></div>
               <input
              className='w-100 pa3 mv2'
              value={this.state.email}
              placeholder='email'
              onChange={e => this.setState({ email: e.target.value })}
              autoFocus
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.password}
              placeholder='password'
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              autoFocus
            />
            {this.state.email &&
              this.state.password &&
              <button
                className='w-100 pa3 bg-primary-10 bn dim ttu pointer'
                onClick={this.handleLogin}
              >
               {this.state.login?this.state.login:<div>Login</div>} 
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

}

const loginMutation = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    signinUser(email: { email:$email, password: $password }){
      user{
        id
        email
      }
      token
    }
  }
`;
const LoginPageWithMutation = graphql(loginMutation, {name: 'LoginUserMutation'})(LoginPage)
export default withRouter(LoginPageWithMutation)
