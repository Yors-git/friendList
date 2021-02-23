const express = require('express')
const { check } = require('express-validator')

const friendControllers = require('../controllers/friendControllers')

const router = express.Router()

router.get('/', friendControllers.getFriends)

router.get('/:fid', friendControllers.getFriendById)

router.post('/',
    [
      check('name').not().isEmpty(), 
      check('lastName').not().isEmpty(),
      check('favorite').not().isEmpty(),
      check('gender').not().isEmpty(),
      check('marital').not().isEmpty(),
      check('phoneType1').not().isEmpty(),
      check('phone1').not().isEmpty().isNumeric(),
      check('phoneType2').optional(),
      check('phone2').optional().isNumeric(),
      check('phoneType3').optional(),
      check('phone3').optional().isNumeric()
    ], 
friendControllers.createFriend)

router.patch('/:fid',
    [
      check('name').not().isEmpty(), 
      check('lastName').not().isEmpty(),
      check('favorite').not().isEmpty(),
      check('gender').not().isEmpty(),
      check('marital').not().isEmpty(),
      check('phoneType1').not().isEmpty(),
      check('phone1').not().isEmpty().isNumeric(),
      check('phoneType2').optional(),
      check('phone2').optional().isNumeric(),
      check('phoneType3').optional(),
      check('phone3').optional().isNumeric()
    ],
friendControllers.updateFriend)

router.delete('/:fid', friendControllers.deleteFriend)

module.exports = router