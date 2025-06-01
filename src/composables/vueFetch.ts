import { ref } from 'vue'
import type { Ref } from 'vue'
import { usePromise } from '@/composables/usePromise'
import { isObject } from '@/composables/isObject'

// Type definitions
interface CustomFetchOptions {
  abortTimeoutTime?: number
  additionalCallTime?: number
}

interface VueFetchReturn {
  isSuccess: Ref<boolean>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<string | null>
  errors: Ref<unknown>
  handleData: (
    url: string,
    fetchOptions?: RequestInit,
    customFetchOptions?: CustomFetchOptions,
  ) => Promise<unknown>
  fetchedData: Ref<unknown>
}

export const vueFetch = function vueFetch(): VueFetchReturn {
  // Initializing state management references
  const isSuccess: Ref<boolean> = ref(false)
  const isLoading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const errors: Ref<unknown> = ref(null)
  const goDirectToError: Ref<boolean> = ref(false)
  const fetchedData: Ref<unknown> = ref(null)
  const streamAlreadyRead: Ref<boolean | null> = ref(null)
  const response: Ref<Response | null> = ref(null)

  const additionalTime: Ref<number | null> = ref(null)
  const abortTimeout: Ref<number | null> = ref(null)

  // Function to handle data fetching and state updates
  const handleData = async function (
    url: string,
    fetchOptions: RequestInit = {},
    customFetchOptions: CustomFetchOptions = {},
  ): Promise<unknown> {
    isSuccess.value = false
    isLoading.value = false
    isError.value = false
    error.value = null
    errors.value = null
    goDirectToError.value = false
    fetchedData.value = null
    streamAlreadyRead.value = null
    response.value = null

    // Initialize or set timeout and additional time values
    abortTimeout.value = customFetchOptions.abortTimeoutTime ?? 4000
    additionalTime.value = customFetchOptions.additionalCallTime ?? 0

    // Initializing fetch operation control parameters
    const controller = new AbortController()

    // Abort fetch operation after the specified timeout
    const timer = setTimeout(() => {
      controller.abort()
    }, abortTimeout.value)

    try {
      // Begin fetch operation
      isLoading.value = true
      const promise = usePromise(additionalTime.value)
      await promise

      // Check for abort signal and handle accordingly
      if (controller.signal.aborted) {
        clearTimeout(timer)
        isLoading.value = false
        isError.value = false
        goDirectToError.value = true

        throw new Error('Error 500. Loading time exceeded.')
      }

      // Fetch and handle response
      response.value = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })

      // Check if the fetch request was successful. If not, throw an error
      if (response.value.status !== 200 && response.value.status !== 201) {
        throw new Error(`${response.value.status}. ${response.value.statusText}`)
      }

      // Parse JSON response when content-type is 'application/json'
      const contentType = response.value.headers.get('content-type') || ''

      // Content-Type 'application/json'
      if (contentType.includes('application/json')) {
        streamAlreadyRead.value = true
        clearTimeout(timer)
        isSuccess.value = true
        isLoading.value = false
        isError.value = false

        fetchedData.value = await response.value.json()
        return fetchedData.value
      }

      // Content-Type 'text/plain' or 'text/html'
      if (contentType.includes('text/plain') || contentType.includes('text/html')) {
        streamAlreadyRead.value = true
        clearTimeout(timer)
        isSuccess.value = true
        isLoading.value = false
        isError.value = false

        fetchedData.value = await response.value.text()
        return fetchedData.value
      }

      // Handle non-GET requests without 'application/json', 'text/plain' or 'text/html'
      if (
        fetchOptions?.method !== 'GET' &&
        fetchOptions?.method !== 'get' &&
        fetchOptions?.method !== undefined
      ) {
        clearTimeout(timer)
        isSuccess.value = true
        isLoading.value = false
        isError.value = false
        fetchedData.value = 'Your request was processed successfully.'
        return 'Your request was processed successfully.'
      }

      // Handle GET requests without 'application/json' content-type
      clearTimeout(timer)
      isSuccess.value = true
      isLoading.value = false
      isError.value = false
      goDirectToError.value = true
      throw new Error(
        "Error 500. The request header must contain 'application/json', 'text/plain' or 'text/html'",
      )
    } catch (err: unknown) {
      clearTimeout(timer)
      isSuccess.value = false
      isLoading.value = false

      // Set default error message
      isError.value = true
      const errorMessage = err instanceof Error ? err.message : String(err)
      error.value = `Not able to fetch data. Error status: ${errorMessage}.`

      if (response.value) {
        // Get content type of the response
        const contentType = response.value.headers.get('content-type') || ''

        if (contentType.includes('application/json') && !streamAlreadyRead.value) {
          // Handle errors when content type is 'application/json'
          if (goDirectToError.value !== true) {
            try {
              // Parse the response body as JSON
              const collectingErrorsJson = await response.value.json()

              // Collect backend form validation errors
              errors.value = collectingErrorsJson

              // Handle different types of error messages

              // If the error message is a string, handle it accordingly
              if (typeof collectingErrorsJson === 'string') {
                // Set error message when error body is a string
                isError.value = true
                error.value = `Not able to fetch data. Error status: ${errorMessage}. ${collectingErrorsJson}`
              }
              // If the error message is an array, handle it accordingly
              else if (Array.isArray(collectingErrorsJson)) {
                // Set error message when error body is an array
                isError.value = true
                error.value = `Not able to fetch data. Error status: ${errorMessage}. ${collectingErrorsJson.join(' ')}`
              }
              // If the error message is an object, handle it accordingly
              else if (isObject(collectingErrorsJson)) {
                const errorsKeys = Object.keys(collectingErrorsJson)
                const errorsValues = Object.values(collectingErrorsJson)

                // If there are no errors, handle it accordingly
                if (errorsKeys.length === 0) {
                  // Set error message when error body is an empty object
                  isError.value = true
                  error.value = `Not able to fetch data. Error status: ${response.value.status}.`
                }

                // If there are errors, handle them accordingly
                if (errorsKeys.length > 0) {
                  for (let i = 0; i < errorsKeys.length; i++) {
                    if (Array.isArray(errorsValues[i]) || isObject(errorsValues[i])) {
                      // Set error message when encountering a nested object or array
                      isError.value = true
                      error.value = `Not able to fetch data. Error status: ${errorMessage}`
                      break
                    }

                    // If the error is neither an array nor an object, handle it accordingly
                    if (!Array.isArray(errorsValues[i]) && !isObject(errorsValues[i])) {
                      const errorObjToString = Object.values(collectingErrorsJson).join(' ')
                      // Set error message when error body is a flat object
                      isError.value = true
                      error.value = `Not able to fetch data. Error status: ${errorMessage}. ${errorObjToString}`
                    }
                  }
                }
              }
            } catch {
              // Handle JSON parsing error
              error.value = `Not able to fetch data. Error status: ${errorMessage}`
            }
          }
        }

        // If the response's Content-Type text/plain, handle it accordingly
        if (contentType.includes('text/plain') && !streamAlreadyRead.value) {
          try {
            const plainText = await response.value.text()
            // Remove HTML tags using a regular expression
            const cleanedText = plainText.replace(/<\/?[^>]+(>|$)/g, '')
            error.value = `Error: ${cleanedText}`
          } catch {
            // Handle text parsing error
            error.value = `Not able to fetch data. Error status: ${errorMessage}`
          }
        }

        // If the response's Content-Type text/html, handle it accordingly
        if (contentType.includes('text/html') && !streamAlreadyRead.value) {
          try {
            const htmlContent = await response.value.text()
            // Remove HTML tags using a regular expression
            const cleanedText = htmlContent.replace(/<\/?[^>]+(>|$)/g, '')
            error.value = `Error: ${cleanedText}`
          } catch {
            // Handle HTML parsing error
            error.value = `Not able to fetch data. Error status: ${errorMessage}`
          }
        }

        if (
          (!contentType.includes('application/json') &&
            !contentType.includes('text/plain') &&
            !contentType.includes('text/html')) ||
          goDirectToError.value
        ) {
          isError.value = true
          error.value = `Not able to fetch data. Error status: ${errorMessage}`
        }

        // Rethrow the error for further handling
        throw err
      }

      // Rethrow the error if no response
      throw err
    }
  }

  // Return the state variables and the fetch function
  return {
    isSuccess,
    isLoading,
    isError,
    error,
    errors,
    handleData,
    fetchedData,
  }
}
