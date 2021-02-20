const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

const HttpError = require("../models/httpError")
const Friend = require("../models/friend")

const getFriends = async (req, res, next) => {
  let friends
	try {
		friends = await Friend.find({})
	} catch (err) {
		const error = new HttpError(
			"Fetching users failed, please try again later",
			500
		)
		next(error)
	}
	res.json({ friends: friends.map((friend) => friend.toObject({ getters: true })) })
}

const getFriendById = async (req, res, next) => {
	const friendId = req.params.fid
	let friend
	try {
		friend = await Friend.findById(friendId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find user",
			500
		)
		return next(error)
	}

	if (!friend) {
		const error = new HttpError(
			"Could not find a friend with the provided id",
			404
		)
		return next(error)
	}
	res.json({ friend: friend.toObject({ getters: true }) })
}

const createFriend = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		)
	}
	const { name, lastName, gender, marital, phone1, phone2, phone3 } = req.body
	
	const createdFriend = new Friend({
		name,
		lastName,
		gender,
		marital,
    phone1,
    phone2,
    phone3
	})

  Friend.create(createdFriend, (err, newlyCreated) => {
    if(err){
        console.log(err);
    } else {
        console.log(newlyCreated);
	      res.status(201).json({ friend: createdFriend })
    }
  });

}

const updateFriend = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		)
	}
	const { name, lastName, gender, marital, phone1, phone2, phone3 } = req.body
	const friendId = req.params.fid
	let friend
	try {
		friend = await Friend.findByIdAndUpdate(friendId)
	
		friend.name = name
		friend.lastName = lastName
    friend.gender = gender
    friend.marital = marital
    friend.phone1 = phone1
    friend.phone2 = phone2
    friend.phone3 = phone3
		friend.save()
	} catch (err) {
		const error = new HttpError(
			"Updating friend failed, please try again",
			500
		)
		return next(error)
	}
	res.status(200).json({ friend: friend.toObject({ getters: true }) })
}

const deleteFriend = async (req, res, next) => {
	const friendId = req.params.fid

  try {
    let friend = await Friend.findByIdAndDelete(friendId)
  } catch(err){
    const error = new HttpError(
			"Deleting friend failed, please try again",
			500
		)
		return next(error)
  }
  res.status(200).json({ message: "Deleted Friend!" })   
}

exports.getFriends = getFriends
exports.getFriendById = getFriendById
exports.createFriend = createFriend
exports.updateFriend = updateFriend
exports.deleteFriend = deleteFriend