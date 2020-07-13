import { Router } from 'express';

import AddNewReviewService from '../../service/ReviewsServices/addNewReviewService';

const reviewsRouter = Router();

reviewsRouter.get('/', async (req, res) => {
	return res.json({ hello: 'ok!' });
});

reviewsRouter.post('/', async (req, res) => {
	try {
		const { rate, text, serviceId } = req.body;

		const addNewReview = new AddNewReviewService();

		const review = await addNewReview.exec({
			rate,
			text,
			serviceId,
		});

		return res.json(review);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

export default reviewsRouter;
