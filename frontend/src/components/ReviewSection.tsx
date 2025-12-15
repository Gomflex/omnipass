'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { reviewsApi, Review, Reply } from '@/lib/api/reviews';

interface ReviewSectionProps {
  entityType: 'medical_facility' | 'sdm_package' | 'store';
  entityId: string;
}

export default function ReviewSection({ entityType, entityId }: ReviewSectionProps) {
  const { isAuthenticated, user } = useAuthStore();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, [entityType, entityId, page, sortBy]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewsApi.getReviews(entityType, entityId, page, pageSize, sortBy);
      setReviews(data.reviews);
      setTotal(data.total);
      setAverageRating(data.average_rating);
      setRatingDistribution(data.rating_distribution);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      alert('Please login to write a review');
      return;
    }

    if (!newReview.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    try {
      if (editingReview) {
        await reviewsApi.updateReview(editingReview.id, {
          rating: newReview.rating,
          comment: newReview.comment
        });
      } else {
        await reviewsApi.createReview({
          entity_type: entityType,
          entity_id: entityId,
          rating: newReview.rating,
          comment: newReview.comment
        });
      }

      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      setEditingReview(null);
      fetchReviews();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await reviewsApi.deleteReview(reviewId);
      fetchReviews();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete review');
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment });
    setShowReviewForm(true);
  };

  const handleToggleHelpful = async (reviewId: string, isMarked: boolean) => {
    if (!isAuthenticated) {
      alert('Please login to mark reviews as helpful');
      return;
    }

    try {
      if (isMarked) {
        await reviewsApi.unmarkHelpful(reviewId);
      } else {
        await reviewsApi.markHelpful(reviewId);
      }
      fetchReviews();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to update helpful status');
    }
  };

  const handleSubmitReply = async (reviewId: string, parentReplyId?: string) => {
    if (!isAuthenticated) {
      alert('Please login to reply');
      return;
    }

    if (!replyText.trim()) {
      alert('Please write a reply');
      return;
    }

    try {
      await reviewsApi.createReply(reviewId, {
        comment: replyText,
        parent_reply_id: parentReplyId
      });
      setReplyText('');
      setReplyingTo(null);
      fetchReviews();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to submit reply');
    }
  };

  const toggleReplies = async (reviewId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReplies(newExpanded);
  };

  const StarRating = ({
    rating,
    onRatingChange,
    readonly = false
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <svg
              className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  if (error && reviews.length === 0) {
    return (
      <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Rating Summary */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Reviews & Ratings
        </h3>

        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-1">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={averageRating} readonly />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {total} reviews
            </div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star.toString()] || 0;
              const percentage = total > 0 ? (count / total) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-3">{star}</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {['recent', 'helpful', 'rating_high', 'rating_low'].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === option
                  ? 'bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {option === 'recent' && 'Most Recent'}
              {option === 'helpful' && 'Most Helpful'}
              {option === 'rating_high' && 'Highest Rating'}
              {option === 'rating_low' && 'Lowest Rating'}
            </button>
          ))}
        </div>

        {/* Write Review Button */}
        {!showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full bg-gray-600 dark:bg-gray-400 hover:bg-gray-700 dark:hover:bg-gray-500 text-white dark:text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Write a Review
          </button>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
              {editingReview ? 'Edit Your Review' : 'Write Your Review'}
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={newReview.rating}
                onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmitReview}
                className="flex-1 bg-gray-600 dark:bg-gray-400 hover:bg-gray-700 dark:hover:bg-gray-500 text-white dark:text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                {editingReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setNewReview({ rating: 5, comment: '' });
                  setEditingReview(null);
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-50 mx-auto"></div>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-50 mb-1">
                    {review.user.name}
                    {user?.id === review.user_id && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(You)</span>
                    )}
                  </div>
                  <StarRating rating={review.rating} readonly />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                  {user?.id === review.user_id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {review.comment}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleToggleHelpful(review.id, review.user_has_marked_helpful)}
                  className={`flex items-center gap-1 transition-colors ${
                    review.user_has_marked_helpful
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Helpful ({review.helpful_count})</span>
                </button>

                {review.reply_count > 0 && (
                  <button
                    onClick={() => toggleReplies(review.id)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                  >
                    {expandedReplies.has(review.id) ? 'Hide' : 'View'} Replies ({review.reply_count})
                  </button>
                )}

                <button
                  onClick={() => setReplyingTo(review.id)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Reply
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === review.id && (
                <div className="mt-4 pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitReply(review.id)}
                      className="px-4 py-2 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Pagination */}
        {total > pageSize && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Page {page} of {Math.ceil(total / pageSize)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / pageSize)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
