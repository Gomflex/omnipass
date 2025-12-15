'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: t.faq.gettingStarted,
      questions: [
        { question: t.faq.q1, answer: t.faq.a1 },
        { question: t.faq.q2, answer: t.faq.a2 },
        { question: t.faq.q3, answer: t.faq.a3 },
      ]
    },
    {
      category: t.faq.earningPoints,
      questions: [
        { question: t.faq.q4, answer: t.faq.a4 },
        { question: t.faq.q5, answer: t.faq.a5 },
        { question: t.faq.q6, answer: t.faq.a6 },
      ]
    },
    {
      category: t.faq.usingPoints,
      questions: [
        { question: t.faq.q7, answer: t.faq.a7 },
        { question: t.faq.q8, answer: t.faq.a8 },
        { question: t.faq.q9, answer: t.faq.a9 },
      ]
    },
    {
      category: t.faq.partnerStores,
      questions: [
        { question: t.faq.q10, answer: t.faq.a10 },
        { question: t.faq.q11, answer: t.faq.a11 },
        { question: t.faq.q12, answer: t.faq.a12 },
      ]
    },
    {
      category: t.faq.accountSecurity,
      questions: [
        { question: t.faq.q13, answer: t.faq.a13 },
        { question: t.faq.q14, answer: t.faq.a14 },
        { question: t.faq.q15, answer: t.faq.a15 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50 dark:from-gray-900 dark:via-gray-900/20 dark:to-gray-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {t.faq.title}
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          {t.faq.subtitle}
        </p>

        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full flex justify-between items-start text-left py-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 flex-shrink-0 transform transition-all text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed pl-0 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 shadow-xl shadow-primary-500/30 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">{t.faq.stillHaveQuestions}</h3>
          </div>
          <p className="text-primary-50 mb-6 leading-relaxed">
            {t.faq.supportText}
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform">
            {t.faq.contactSupport}
          </button>
        </div>
      </div>
    </div>
  );
}
