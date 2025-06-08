import SubscriptionModel from "../models/subscription.model.js";
import subscriptionModel from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await SubscriptionModel.create({...req.body, user: req.user._id});

        res.status(201).json({success: true, message: 'Subscription successfully created', data: subscription});
    }
    catch (error) {
        next(error);
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try {

        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this currently logged in account');
            error.status = 404;
            throw error;
        }

        const userSubscriptions = await subscriptionModel.find({user: req.params.id});

        res.status(200).json({success: true, data: userSubscriptions});

    }
    catch (error) {
        next(error);
    }
}


export const getAllSubscriptions = async (req, res, next) => {
    try{
        const subscriptions = await subscriptionModel.find();
        res.status(200).json({success: true, data: subscriptions});

    }
    catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {

    try {

        const subscription = await subscriptionModel.findById(req.params.id)

        res.status(200).json({success: true, data: subscription});
    }
    catch (error) {
        next(error);
    }
}