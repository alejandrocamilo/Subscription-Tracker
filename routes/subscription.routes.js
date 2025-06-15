import {Router} from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {
    createSubscription, deleteAllSubscriptions, deleteSubscription,
    getAllSubscriptions, getSubscription,
    getUserSubscriptions, updateSubscription
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions)

subscriptionRouter.get('/:id',authorize, getSubscription)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', authorize, updateSubscription)

subscriptionRouter.delete('/:id',authorize, deleteSubscription)

subscriptionRouter.delete('/', authorize, deleteAllSubscriptions)

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscription'}))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals'}))


export default subscriptionRouter;