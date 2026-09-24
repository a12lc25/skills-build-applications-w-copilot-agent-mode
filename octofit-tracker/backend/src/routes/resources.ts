import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/resources.js';

function createResourceRouter(model: Model<Record<string, unknown>>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const userRoutes = createResourceRouter(User);
export const teamRoutes = createResourceRouter(Team);
export const activityRoutes = createResourceRouter(Activity);
export const leaderboardRoutes = createResourceRouter(Leaderboard);
export const workoutRoutes = createResourceRouter(Workout);