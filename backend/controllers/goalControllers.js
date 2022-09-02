
const asyncHandler = require('express-async-handler')

//mongoose db for CRUD 
const Goal = require('../models/goalModel')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    //200 status = everything ok
    res.status(200).json( goals )

    //res.status(200).json({ message: 'Get goals' })
})

// @desc    set Goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        //400 status = error
        res.status(400)
        throw new Error(`please add text`)
    }

    const goal = await Goal.create({ 
        text: req.body.text
     })
    res.status(200).json(goal)
    // res.status(200).json({ message: 'Set goals' })
})


// @desc    Update Goals
// @route   PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        //create if not exist
        new: true,
    })
    
    res.status(200).json(updateGoals)
    // res.status(200).json({ message: `Update goals ${req.params.id}` })


})
// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    // const deleteGoals = await Goal.findByIdAndDelete(req.params.id, req.body)

    //just delete once u find instead of saving it to a new variable
    goal.remove()
    // res.status(200).json(deleteGoals)
    // res.status(200).json({ message: `Delete goals ${req.params.id}` })
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}