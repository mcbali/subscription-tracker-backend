import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (e) {
        next(e);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription._id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            data: subscription,
            workflowRunId
        });

    } catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (!req.user._id.equals(req.params.id) && !req.user.isAdmin) {
            const error = new Error('You are not the owner of this account');
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({
            user: req.params.id
        });

        res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (e) {
        next(e);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        if (
            !subscription.user.equals(req.user._id) &&
            !req.user.isAdmin
        ) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            throw error;
        }

        subscription.set(req.body);
        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (e) {
        next(e);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        if (
            !subscription.user.equals(req.user._id) &&
            !req.user.isAdmin
        ) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            throw error;
        }

        await subscription.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully'
        });

    } catch (e) {
        next(e);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        if (
            !subscription.user.equals(req.user._id) &&
            !req.user.isAdmin
        ) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            throw error;
        }

        subscription.status = 'cancelled';
        subscription.cancelledAt = new Date();

        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (e) {
        next(e);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const now = new Date();
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);

        const subscriptions = await Subscription.find({
            status: 'active',
            renewalDate: { $gte: now, $lte: next7Days }
        });

        res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (e) {
        next(e);
    }
};