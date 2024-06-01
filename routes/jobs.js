const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    getAJob,
    createAJob,
    deleteJob,
    updateJob
}=require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createAJob)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getAJob)

module.exports = router