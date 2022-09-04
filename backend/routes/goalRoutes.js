const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalControllers')
const {protect} = require('../middleware/authMiddleware')
/* //standard way to route
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `get goals ${req.params.id}` })
}) */

/* //Simplify the router from above using goalController.js
router.get('/', getGoals)
router.post('/', setGoals)
router.put('/:id', updateGoals)
router.delete('/:id',deleteGoals)
 */


//Simplify above router who has the same route 
router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)


module.exports = router