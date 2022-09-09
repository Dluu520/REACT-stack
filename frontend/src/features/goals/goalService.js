import axios from 'axios'

const API_URL = '/api/goals/'

//create new goal 
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            //authorization is our token
            Authorization: `Bearer ${token}`,
        },
    }

    //make a POST request to the URL, sending back goalData and passing our config which has our headers that contains our token
    // if config not sent then we cannot access that route
    const response = await axios.post(API_URL, goalData, config)

    return response.data
}


//display goals 
const getGoals = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    //make a GET request to the URL, dont need goalData but passing our config which has our headers that contains our token
    // if config not sent then we cannot access that route because the token is needed for authorization
    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + goalId, config)
  
    return response.data
  }

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
  }

export default goalService