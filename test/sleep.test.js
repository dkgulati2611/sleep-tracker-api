import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';

import bodyParser from 'body-parser';
import Sleep from '../models/Sleep.js';
import sleepRoutes from '../routes/sleep.js';

// Middleware
const app = express();
app.use(bodyParser.json());
app.use('/sleep', sleepRoutes);

describe('Sleep API', function () {
    this.timeout(5000); // Set timeout to 5 seconds for the entire test suite

    before(async function () {
        await mongoose.connect(process.env.MONGO_URI);
        await Sleep.deleteMany({});
    });

    after(async function () {
        await mongoose.connection.close();
    });

    it('should create a new sleep record', async function () {
        const res = await request(app)
            .post('/sleep')
            .send({ userId: 'user1', hours: 8, timestamp: '2024-05-19T10:00:00Z' });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.userId).to.equal('user1');
        expect(res.body.hours).to.equal(8);
        expect(new Date(res.body.timestamp).toISOString()).to.equal('2024-05-19T10:00:00.000Z');
    });

    it('should retrieve sleep records for a user', async function () {
        const res = await request(app).get('/sleep/user1');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
        expect(res.body[0].userId).to.equal('user1');
    });

    it('should delete a sleep record by ID', async function () {
        const sleep = await Sleep.findOne({ userId: 'user1' });
        const res = await request(app).delete(`/sleep/${sleep._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Record deleted');
    });

    it('should return 404 for a non-existing record', async function () {
        const res = await request(app).delete('/sleep/60c72b2f9b1e8a0015cbd123');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Record not found');
    });
});
