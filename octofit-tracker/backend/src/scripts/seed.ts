import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/resources.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        avatar: 'MC',
        totalPoints: 1280,
      },
      {
        username: 'jon-bell',
        email: 'jon.bell@example.com',
        displayName: 'Jon Bell',
        avatar: 'JB',
        totalPoints: 1040,
      },
      {
        username: 'priya-shah',
        email: 'priya.shah@example.com',
        displayName: 'Priya Shah',
        avatar: 'PS',
        totalPoints: 920,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Crew',
        motto: 'Small steps, strong finish.',
        color: '#0f766e',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Charge',
        motto: 'Own the first hour.',
        color: '#ea580c',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Strength',
        durationMinutes: 42,
        calories: 360,
        completedAt: new Date('2026-09-22T07:15:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Run',
        durationMinutes: 30,
        calories: 410,
        completedAt: new Date('2026-09-23T06:45:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'Yoga',
        durationMinutes: 28,
        calories: 150,
        completedAt: new Date('2026-09-23T07:30:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, rank: 1, points: 1280, week: '2026-W39' },
      { user: users[1]._id, team: teams[0]._id, rank: 2, points: 1040, week: '2026-W39' },
      { user: users[2]._id, team: teams[1]._id, rank: 3, points: 920, week: '2026-W39' },
    ]);

    await Workout.insertMany([
      {
        title: 'Desk Break Reset',
        description: 'A focused mobility session for shoulders, hips, and spine.',
        difficulty: 'Beginner',
        durationMinutes: 15,
        focus: ['Mobility', 'Core'],
        equipment: ['Mat'],
      },
      {
        title: 'Full Body Builder',
        description: 'A balanced strength circuit built around controlled compound movements.',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        focus: ['Strength', 'Full body'],
        equipment: ['Dumbbells', 'Mat'],
      },
      {
        title: 'Weekend Endurance Run',
        description: 'A steady aerobic workout to build comfortable running volume.',
        difficulty: 'Advanced',
        durationMinutes: 45,
        focus: ['Cardio', 'Endurance'],
        equipment: [],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
