import express from 'express'
const router = express.Router();
import Sleep from '../models/Sleep.js'

// GET /sleep/: Retrieve all sleep records
// router.get('/', async (req, res) => {
//     try {
//         const sleeps = await Sleep.find().sort({ timestamp: -1 });
//         res.json(sleeps);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// POST /sleep: Create a new sleep record
router.post('/', async (req, res) => {
    try {
        const { userId, hours, timestamp } = req.body;
        const sleep = new Sleep({ userId, hours, timestamp });
        await sleep.save();
        res.status(201).json(sleep);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /sleep/:userId: Retrieve all sleep records for a user
router.get('/:userId', async (req, res) => {
    try {
        const sleeps = await Sleep.find({ userId: req.params.userId }).sort({ timestamp: -1 });
        res.json(sleeps);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /sleep/:recordId: Delete a specific sleep record by ID
router.delete('/:recordId', async (req, res) => {
    try {
        const sleep = await Sleep.findById(req.params.recordId);
        if (!sleep) {
            return res.status(404).json({ message: 'Record not found' });
        }
        await Sleep.deleteOne({ _id: req.params.recordId });
        res.json({ message: 'Record deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const sleepRoutes = router;
export default sleepRoutes;
