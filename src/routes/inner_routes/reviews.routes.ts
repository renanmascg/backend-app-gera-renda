import { Router } from 'express';

import UpdateReviewService from '../../service/ReviewsServices/updateReviewService';
import AddReviewService from '../../service/ReviewsServices/addReviewService';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import GetReviewsService from '../../service/ReviewsServices/getReviewsService';

const reviewsRouter = Router();

reviewsRouter.post('/service', async (req, res) => {
	try {
		const { serviceId } = req.body;

		const getReviews = new GetReviewsService();

		const reviews = await getReviews.fromService(serviceId);

		return res.json({ reviews });
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
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
