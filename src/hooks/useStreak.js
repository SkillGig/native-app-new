import {useState, useCallback} from 'react';
import {getWeeklyStreaks, getStreakBreakDown} from '../api/userOnboardingAPIs';
import useSnackbarStore from '../store/useSnackbarStore';

const useStreak = () => {
  const [weekStatus, setWeekStatus] = useState(null);
  const [streakBreakdown, setStreakBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const fetchWeeklyStreaks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWeeklyStreaks();
      if (response?.data) {
        setWeekStatus(response.data);
        return response.data;
      }
      throw new Error('No data received');
    } catch (err) {
      console.error('Failed to fetch weekly streaks:', err);
      setError(err.message || 'Failed to load streak data');
      showSnackbar({
        message: 'Failed to load streak data',
        type: 'error',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  const fetchStreakBreakdown = useCallback(
    async date => {
      if (!date) {
        setError('Date is required');
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await getStreakBreakDown(date);
        if (response?.data) {
          setStreakBreakdown(response.data);
          return response.data;
        }
        throw new Error('No breakdown data received');
      } catch (err) {
        console.error('Failed to fetch streak breakdown:', err);
        setError(err.message || 'Failed to load daily details');
        showSnackbar({
          message: 'Failed to load daily details',
          type: 'error',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar],
  );

  const clearStreakBreakdown = useCallback(() => {
    setStreakBreakdown(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weekStatus,
    streakBreakdown,
    loading,
    error,
    fetchWeeklyStreaks,
    fetchStreakBreakdown,
    clearStreakBreakdown,
    clearError,
  };
};

export default useStreak;
