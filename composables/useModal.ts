interface ModalData {
  isOpen: boolean
  type: 'teachers' | 'companies' | ''
  title: string
  data: any[]
  loading: boolean
  error: string | null
  processing: string | null
}

export const useModal = () => {
  // Global modal state
  const modalData = useState<ModalData>('modal-data', () => ({
    isOpen: false,
    type: '', // 'teachers' or 'companies'
    title: '',
    data: [],
    loading: false,
    error: null,
    processing: null
  }))

  // Open modal with data
  const openModal = (config: {
    type: 'teachers' | 'companies'
    title: string
    data: any[]
    loading?: boolean
    error?: string | null
  }) => {
    modalData.value = {
      isOpen: true,
      type: config.type,
      title: config.title,
      data: config.data || [],
      loading: config.loading || false,
      error: config.error || null,
      processing: null
    }
  }

  // Close modal
  const closeModal = () => {
    modalData.value = {
      isOpen: false,
      type: '',
      title: '',
      data: [],
      loading: false,
      error: null,
      processing: null
    }
  }

  // Set loading state
  const setLoading = (loading: boolean) => {
    modalData.value.loading = loading
  }

  // Set error state
  const setError = (error: string | null) => {
    modalData.value.error = error
  }

  // Set processing state
  const setProcessing = (processing: string | null) => {
    modalData.value.processing = processing
  }

  // Update data
  const updateData = (data: any[]) => {
    modalData.value.data = data
  }

  return {
    modalData: readonly(modalData),
    openModal,
    closeModal,
    setLoading,
    setError,
    setProcessing,
    updateData
  }
}
