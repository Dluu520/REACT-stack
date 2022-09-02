
const asyncHandler = require('express-async-handler')
// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res ) => {

    //200 status = everything ok
    res.status(200).json({ message: 'Get goals' })
})

// @desc    set Goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async(req, res ) =>{
    if(!req.body.text){
        //400 status = error
        res.status(400)
        throw new Error(`please add text`)
    }

   // res.status(200).json({ message: 'Set goals' })
})
// @desc    Update Goals
// @route   PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async(req, res ) =>{
    res.status(200).json({ message: `Update goals ${req.params.id}` })

})
// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoals = asyncHandler(async(req, res ) =>{
    res.status(200).json({ message: `Delete goals ${req.params.id}` })
})

module.exports = {
    getGoals, 
    setGoals, 
    updateGoals,
    deleteGoals,
}