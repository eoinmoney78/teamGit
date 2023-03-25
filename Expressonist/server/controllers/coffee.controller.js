const router = require('express').Router();
const { Coffee } = require('../models');
const { validateSession } = require('../middleware');

// Create a coffee entry
router.post('/', validateSession, async (req, res) => {
    try {
        const newCoffee = await Coffee.create({
            userId: req.user.id,
            roaster: req.body.roaster,
            coffee: req.body.coffee,
            process: req.body.process,
            variety: req.body.variety,
            elevation: req.body.elevation,
            roast: req.body.roast,
            in: req.body.in,
            out: req.body.out,
            time: req.body.time,
            grind: req.body.grind,
            temp: req.body.temp,
            wedge: req.body.wedge,
            wdt: req.body.wdt,
            rdt: req.body.rdt,
            notes: req.body.notes,
            img: req.body.img
        });

        res.status(201).json({
            message: 'Coffee entry created successfully',
            newCoffee
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Get all coffee entries for a specific user
router.get('/getall/:user_id', validateSession, async (req, res) => {
    try {
        const coffeeEntries = await Coffee.find({ userId: req.params.user_id });

        res.status(200).json({
            coffeeEntries
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Get a specific coffee entry
router.get('/:id', validateSession, async (req, res) => {
    try {
        const coffeeEntry = await Coffee.findById(req.params.id);

        if (!coffeeEntry) {
            res.status(404).json({
                message: 'Coffee entry not found'
            });
        } else {
            res.status(200).json({
                coffeeEntry
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Update a coffee entry
router.put('/:id', validateSession, async (req, res) => {
    try {
        const updatedCoffeeEntry = await Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCoffeeEntry) {
            res.status(404).json({
                message: 'Coffee entry not found'
            });
        } else {
            res.status(200).json({
                message: 'Coffee entry updated successfully',
                updatedCoffeeEntry
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Delete a coffee entry
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const deletedCoffeeEntry = await Coffee.findByIdAndDelete(req.params.id);

        if (!deletedCoffeeEntry) {
            res.status(404).json({
                message: 'Coffee entry not found'
            });
        } else {
            res.status(200).json({
                message: 'Coffee entry deleted successfully',
                deletedCoffeeEntry
            });
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});





module.exports = router;

