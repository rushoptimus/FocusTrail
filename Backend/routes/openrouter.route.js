import express from 'express';
import { getGeminiAdvice } from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/mood-advice', getGeminiAdvice);

export default router;
