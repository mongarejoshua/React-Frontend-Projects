import { useEffect, useState } from 'react';
import { questions as questionBank } from '../data/questions.js';
import { getQuizQuestions, scoreQuiz } from '../utils/quizUtils.js';
import { getHistory, saveHistory } from '../utils/storageUtils.js';

export function useQuiz() {
  const [history, setHistory] = useState(getHistory);
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!session || result) return undefined;
    const timerId = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timerId);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [session, result]);

  useEffect(() => {
    if (session && !result && remainingSeconds === 0) finishQuiz(true);
  }, [remainingSeconds, session, result]);

  function startQuiz(settings) {
    const selectedQuestions = getQuizQuestions(questionBank, settings);
    if (!selectedQuestions.length) return false;
    setSession({ ...settings, questions: selectedQuestions, startedAt: Date.now() });
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setRemainingSeconds(selectedQuestions.length * 30);
    return true;
  }

  function finishQuiz(isTimedOut = false) {
    if (!session || result) return;
    const score = scoreQuiz(session.questions, answers);
    const elapsedSeconds = Math.max(0, session.questions.length * 30 - remainingSeconds);
    const completed = {
      id: `${Date.now()}`,
      category: session.category,
      difficulty: session.difficulty,
      total: session.questions.length,
      ...score,
      elapsedSeconds,
      completedAt: new Date().toISOString(),
      timedOut: isTimedOut,
    };
    const nextHistory = [completed, ...history].slice(0, 100);
    setHistory(nextHistory);
    saveHistory(nextHistory);
    setResult({ ...completed, questions: session.questions, answers });
    setSession(null);
  }

  return {
    history,
    session,
    currentIndex,
    setCurrentIndex,
    answers,
    setAnswers,
    remainingSeconds,
    result,
    setResult,
    startQuiz,
    finishQuiz,
  };
}
