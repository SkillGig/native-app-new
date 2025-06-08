import {create} from 'zustand';

const SNACKBAR_DEFAULT = {
  message: '',
  type: 'info', // 'info' | 'success' | 'error'
  isVisible: false,
};

const useSnackbarStore = create(set => ({
  ...SNACKBAR_DEFAULT,
  showSnackbar: ({message, type}) => set({message, type, isVisible: true}),
  hideSnackbar: () => set({isVisible: false}),
}));

export default useSnackbarStore;
