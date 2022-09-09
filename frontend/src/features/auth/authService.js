import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  //save user into localStorage to have the user logged in 
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data

}

// Login user
const login = async (userData) => {
    //  concatenate login to the API_URL we declared earlier and 
  const response = await axios.post(API_URL + 'login', userData)
  // save the user like we did for register into localStorage 
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService