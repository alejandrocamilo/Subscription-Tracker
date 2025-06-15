import SubscriptionModel from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";
import subscriptionModel from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await SubscriptionModel.create({
            ... req.body,
            user: req.user._id,});

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })
        res.status(201).json({success: true, message: 'Subscription successfully created',data: { subscription, workflowRunId }});
    }
    catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {

        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this currently logged in account');
            error.statusCode = 404;
            throw error;
        }

        const userSubscriptions = await SubscriptionModel.find({user: req.params.id});

        res.status(200).json({success: true, data: userSubscriptions});

    }
    catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try{
        const subscriptions = await SubscriptionModel.find();

        if(!subscriptions){
            const error = new Error('Subscriptions not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true,message: "All subscriptions has been found", data: subscriptions});

    }
    catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {

    try {

        const subscription = await SubscriptionModel.findById(req.params.id)

        if(!subscription) {
            const error =  new Error(`Subscription not found`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message:"subscription has been found", data: subscription});


    }
    catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
         const deletedSubscription = await subscriptionModel.findByIdAndDelete(req.params.id)

        if(!deletedSubscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({success: true, message: "subscription deleted successfully", data: deletedSubscription});

    }catch (error) {
        next(error);
    }
}

export const deleteAllSubscriptions = async (req, res, next) => {
    try {
        const deletionResult = await SubscriptionModel.deleteMany({});

        if(!deletionResult){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message: 'All subscriptions deleted', data: deletionResult });
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {}