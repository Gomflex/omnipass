import apiClient from './client';

export interface Review {
  id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  entity_type: 'medical_facility' | 'sdm_package' | 'store';
  entity_id: string;
  rating: number;
  comment: string;
  helpful_count: number;
  user_has_marked_helpful: boolean;
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface Reply {
  id: string;
  review_id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  parent_reply_id: string | null;
  comment: string;
  created_at: string;
  updated_at: string;
  child_replies: Reply[];
}

export interface ReviewWithReplies extends Review {
  replies: Reply[];
}

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
  page: number;
  page_size: number;
  average_rating: number;
  rating_distribution: { [key: string]: number };
}

export interface CreateReviewData {
  entity_type: 'medical_facility' | 'sdm_package' | 'store';
  entity_id: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export interface CreateReplyData {
  comment: string;
  parent_reply_id?: string;
}

export const reviewsApi = {
  // Get reviews for an entity
  getReviews: async (
    entityType: string,
    entityId: string,
    page = 1,
    pageSize = 10,
    sortBy = 'recent'
  ): Promise<ReviewListResponse> => {
    const response = await apiClient.get('/reviews', {
      params: { entity_type: entityType, entity_id: entityId, page, page_size: pageSize, sort_by: sortBy },
    });
    return response.data;
  },

  // Get single review with replies
  getReviewWithReplies: async (reviewId: string): Promise<ReviewWithReplies> => {
    const response = await apiClient.get(`/reviews/${reviewId}`);
    return response.data;
  },

  // Create review
  createReview: async (data: CreateReviewData): Promise<Review> => {
    const response = await apiClient.post('/reviews/', data);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId: string, data: UpdateReviewData): Promise<Review> => {
    const response = await apiClient.put(`/reviews/${reviewId}`, data);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId: string): Promise<void> => {
    await apiClient.delete(`/reviews/${reviewId}`);
  },

  // Mark helpful
  markHelpful: async (reviewId: string): Promise<void> => {
    await apiClient.post(`/reviews/${reviewId}/helpful`);
  },

  // Unmark helpful
  unmarkHelpful: async (reviewId: string): Promise<void> => {
    await apiClient.delete(`/reviews/${reviewId}/helpful`);
  },

  // Create reply
  createReply: async (reviewId: string, data: CreateReplyData): Promise<Reply> => {
    const response = await apiClient.post(`/reviews/${reviewId}/replies`, data);
    return response.data;
  },

  // Get replies
  getReplies: async (reviewId: string): Promise<Reply[]> => {
    const response = await apiClient.get(`/reviews/${reviewId}/replies`);
    return response.data;
  },

  // Update reply
  updateReply: async (replyId: string, comment: string): Promise<Reply> => {
    const response = await apiClient.put(`/reviews/replies/${replyId}`, { comment });
    return response.data;
  },

  // Delete reply
  deleteReply: async (replyId: string): Promise<void> => {
    await apiClient.delete(`/reviews/replies/${replyId}`);
  },
};
