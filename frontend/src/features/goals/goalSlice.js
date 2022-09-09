import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
//creating new goal
export const createGoal = createAsyncThunk(
    'goals/create',
    async (goalData, thunkAPI) => {
        try {
            //goalData is just text here and we want to pass in the token which is from the localStorage 
            // which can be received from thunkAPI object using getState method on our custom auth->user->token  
            const token = thunkAPI.getState().auth.user.token
            //pass in token so user can be authorized when making goal
            return await goalService.createGoal(goalData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    })

//get goals to be displayed
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => { //not passing anything in the function but we want thunkAPI so thats why the underscore is passed
    try {
        const token = thunkAPI.getState().auth.user.token
        //pass in token so user can be authorized when accessing goals
        return await goalService.getGoals(token)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)
// Delete user goal
export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        //function takes in state that is set to initialState so when reset is dispatched then itll change to everything in initialState
        // didnt set to userSlice because user and the state needs to persist to be logged in 
        reset: (state) => initialState, 
        //dont use this reset function as it freezes the page when logging out, using the authSlice reset function
    },
    //extraReducer takes ina  function builder not an object 
    extraReducers: (builder) => {
        builder
            // function name is createGoal.pending that passes a function that takes in a state
            .addCase(createGoal.pending, (state) => {
                //when its pending then set isLoading to true
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //redux can use push helper to just send back the new goal created from the API
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                //action is now a message when there is an error so dispaly message
                state.message = action.payload
            })

            // function name is getGoals.pending that passes a function that takes in a state
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload.id
                )
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})


//reset has to be exported from slice actions 
export const { reset } = goalSlice.actions
// exporting reducer itself
export default goalSlice.reducer