import apiClient from './client';

export interface ChatRequest {
  message: string;
  language?: string;
  conversation_history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface ChatResponse {
  response: string;
  conversation_history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface TourismRequest {
  query: string;
  language?: string;
}

export const chatbotApi = {
  /**
   * 일반 채팅 메시지 전송
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>('/chatbot/chat', request);
    return response.data;
  },

  /**
   * 관광 정보 조회
   */
  async getTourismInfo(request: TourismRequest): Promise<{ response: string }> {
    const response = await apiClient.post<{ response: string }>('/chatbot/tourism-info', request);
    return response.data;
  },

  /**
   * 포인트 시스템 정보 조회
   */
  async getPointsInfo(language: string = 'en'): Promise<{ response: string }> {
    const response = await apiClient.get<{ response: string }>('/chatbot/points-info', {
      params: { language },
    });
    return response.data;
  },

  /**
   * 도움말 조회
   */
  async getHelp(topic?: string, language: string = 'en'): Promise<{ response: string }> {
    const response = await apiClient.get<{ response: string }>('/chatbot/help', {
      params: { topic, language },
    });
    return response.data;
  },
};

