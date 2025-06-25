const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// Reviews - POST route

router.post("/" ,isLoggedIn, validateReview , wrapAsync(reviewController.createReview));

// Reviews - DELETE route

router.delete("/:reviewID",isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;