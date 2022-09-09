import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/goalForm'
import Spinner from '../components/spinner'
import { getGoals } from '../features/goals/goalSlice'
import {reset} from '../features/auth/authSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //gets user 
  const { user } = useSelector((state) => state.auth) //useSelector takes in a state function which gets the user from state.auth
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
    
    return () =>{ dispatch(reset())}

  }, [user, navigate, isError, message, dispatch]);

  // useEffect(() => {
  //   return () => dispatch(reset());
  // }, [dispatch]);


  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      {/* welcome user's name if there is a user*/}
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    {/* cannot be goalForm, case sensitive when importing */}
    <GoalForm />

    <section className='content'>
      {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3>You have not set any goals</h3>
      )}
    </section>
  </>

}

export default Dashboard