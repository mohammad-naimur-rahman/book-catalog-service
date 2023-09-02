import { Router } from 'express';
import { BookController } from './book.controller';

const router = Router();

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
