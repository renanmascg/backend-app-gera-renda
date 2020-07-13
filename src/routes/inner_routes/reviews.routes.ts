import { Router } from 'express';

import UpdateReviewService from '../../service/ReviewsServices/updateReviewService';
import AddReviewService from '../../service/ReviewsServices/addReviewService';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const reviewsRouter = Router();

reviewsRouter.get('/', async (req, res) => {
	return res.json({ hello: 'ok!' });
});

reviewsRouter.post('/', ensureAuthenticated, async (req, res) => {
	try {
		const {
			user,
			body: { serviceId },
		} = req;

		const addReview = new AddReviewService();

		const review = await addReview.exec({
			serviceId,
			userId: user.id,
		});

		return res.json(review);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

reviewsRouter.put('/', ensureAuthenticated, async (req, res) => {
	try {
		const { rate, text, id } = req.body;

		const updateReview = new UpdateReviewService();

		const review = await updateReview.exec({
			rate,
			text,
			takenServiceId: id,
		});

		return res.json(review);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

export default reviewsRouter;
