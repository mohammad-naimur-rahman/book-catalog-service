import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const getAllBooks = catchAsync(async (req, res) => {
  // const filters = pick(req.query, bookFilterableFields);
  // const options = pick(req.query, paginationFields);
  //const books = await BookService.getAllBooks(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books retrieved successfully!',
  });
});

export const BookController = {
  getAllBooks,
};
