import { ref } from 'vue';
import { usePromise } from '@/composables/usePromise';
import { isObject } from '@/composables/isObject';

export const vueFetch = function vueFetch() {
  // Initializing state management references
  const isSuccess = ref(false);
  const isLoading = ref(false);
  const isError = ref(false);
  const error = ref(null);
  const errors = ref(null);
  const goDirectToError = ref(false);
  const fetchedData = ref(null);
  const streamAlreadyRead = ref(null);
  const response = ref(null);

  const additionalTime = ref(null);
  const abortTimeout = ref(null);

  // Function to handle data fetching and state updates
  const handleData = async function (
    url,
    fetchOptions = {},
    customFetchOptions = {}
  ) {
    isSuccess.value = false;
    isLoading.value = false;
    isError.value = false;
    error.value = null;
    errors.value = null;
    goDirectToError.value = false;
    fetchedData.value = null;
    streamAlreadyRead.value = null;
    response.value = null;

    // Initialize or set timeout and additional time values
    abortTimeout.value = customFetchOptions.abortTimeoutTime;
    additionalTime.value = customFetchOptions.additionalCallTime;

    // Provide default values for abortTimeout and additionalTime
    if (additionalTime.value === undefined) additionalTime.value = 0;
    if (abortTimeout.value === undefined) abortTimeout.value = 4000;

    // Initializing fetch operation control parameters
    const controller = new AbortController();

    // Abort fetch operation after the specified timeout
    const timer = setTimeout(() => {
      controller.abort();
    }, abortTimeout.value);

    try {
      // Begin fetch operation
      isLoading.value = true;
      const promise = usePromise(additionalTime.value);
      await promise;

      // Check for abort signal and handle accordingly
      if (controller.signal.aborted) {
        clearTimeout(timer);
        isLoading.value = false;
        isError.value = false;
        goDirectToError.value = true;

        throw new Error('Error 500. Loading time exceeded.');
      }

      // Fetch and handle response
      response.value = await fetch(url, fetchOptions);

      // Check if the fetch request was successful. If not, throw an error
      if (response.value.status !== 200 && response.value.status !== 201) {
        throw new Error(
          `${response.value.status}. ${response.value.statusText}`
        );
      }

      // Parse JSON response when content-type is 'application/json'
      const contentType = response.value.headers.get('content-type') || '';

      // Content-Type 'application/json'
      if (contentType !== null && contentType.includes('application/json')) {
        streamAlreadyRead.value = true;
        clearTimeout(timer);
        isSuccess.value = true;
        isLoading.value = false;
        isError.value = false;

        fetchedData.value = await response.value.json();
        return fetchedData.value;
      }

      // Content-Type 'text/plain' or 'text/html'
      if (
        (contentType !== null && contentType.includes('text/plain')) ||
        contentType.includes('text/html')
      ) {
        streamAlreadyRead.value = true;
        clearTimeout(timer);
        isSuccess.value = true;
        isLoading.value = false;
        isError.value = false;

        fetchedData.value = await response.value.text();
        return fetchedData.value;
      }

      // Handle non-GET requests without 'application/json', 'text/plain' or 'text/html'
      if (
        fetchOptions?.method !== 'GET' &&
        fetchOptions?.method !== 'get' &&
        fetchOptions?.method !== undefined
      ) {
        clearTimeout(timer);
        isSuccess.value = true;
        isLoading.value = false;
        isError.value = false;
        fetchedData.value = 'Your request was processed successfully.';
        return 'Your request was processed successfully.';
      }

      // Handle GET requests without 'application/json' content-type
      clearTimeout(timer);
      isSuccess.value = true;
      isLoading.value = false;
      isError.value = false;
      goDirectToError.value = true;
      throw new Error(
        "'Error 500. The request header must contain 'application/json', 'text/plain' or 'text/html'"
      );
    } catch (err) {
      clearTimeout(timer);
      isSuccess.value = false;
      isLoading.value = false;

      // Set default error message
      isError.value = true;
      error.value = `Not able to fetch data. Error status: ${err}.`;

      if (response.value) {
        // Get content type of the response
        const contentType = response.value.headers.get('content-type') || '';

        if (
          contentType.includes('application/json') &&
          !streamAlreadyRead.value
        ) {
          // Handle errors when content type is 'application/json'
          if (goDirectToError.value !== true) {
            // Parse the response body as JSON
            const collectingErrorsJson = await response.value.json();

            // Collect backend form validation errors
            errors.value = collectingErrorsJson;

            // Handle different types of error messages

            // If the error message is a string, handle it accordingly
            if (typeof collectingErrorsJson === 'string') {
              // Set error message when error body is a string
              isError.value = true;
              error.value = `Not able to fetch data. Error status: ${err.message}. ${collectingErrorsJson}`;
            }
            // If the error message is an array, handle it accordingly
            if (Array.isArray(collectingErrorsJson)) {
              // Set error message when error body is an array
              isError.value = true;
              error.value = `Not able to fetch data. Error status: ${
                err.message
              }. ${collectingErrorsJson.join(' ')}`;
            }
            // If the error message is an object, handle it accordingly
            if (isObject(collectingErrorsJson)) {
              const errorsKeys = Object.keys(collectingErrorsJson);
              const errorsValues = Object.values(collectingErrorsJson);

              // If there are no errors, handle it accordingly
              if (errorsKeys.length === 0) {
                // Set error message when error body is an empty object
                isError.value = true;
                error.value = `Not able to fetch data. Error status: ${response.value.status}.`;
              }

              // If there are errors, handle them accordingly
              if (errorsKeys.length > 0) {
                for (let i = 0; i < errorsKeys.length; i++) {
                  if (
                    Array.isArray(errorsValues[i]) ||
                    isObject(errorsValues[i])
                  ) {
                    // Set error message when encountering a nested object or array
                    isError.value = true;
                    error.value = `Not able to fetch data. Error status: ${err.message}`;
                    break;
                  }

                  // If the error is neither an array nor an object, handle it accordingly
                  if (
                    !Array.isArray(errorsValues[i]) &&
                    !isObject(errorsValues[i])
                  ) {
                    const errorObjToString =
                      Object.values(collectingErrorsJson).join(' ');
                    // Set error message when error body is a flat object
                    isError.value = true;
                    error.value = `Not able to fetch data. Error status: ${err.message}. ${errorObjToString}`;
                  }
                }
              }
            }
          }
        }

        // If the response's Content-Type text/plain, handle it accordingly
        if (contentType.includes('text/plain') && !streamAlreadyRead.value) {
          const plainText = await response.value.text();
          // Remove HTML tags using a regular expression
          const cleanedText = plainText.replace(/<\/?[^>]+(>|$)/g, '');
          error.value = `Error: ${cleanedText}`;
        }

        // If the response's Content-Type text/html, handle it accordingly
        if (contentType.includes('text/html') && !streamAlreadyRead.value) {
          const htmlContent = await response.value.text();

          // Remove HTML tags using a regular expression
          const cleanedText = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');
          error.value = `Error: ${cleanedText}`;
        }

        if (
          (!contentType.includes('application/json') &&
            !contentType.includes('text/plain') &&
            !contentType.includes('text/html')) ||
          goDirectToError.value
        ) {
          isError.value = true;
          error.value = `Not able to fetch data. Error status: ${err.message}`;
        }

        // Rethrow the error for further handling
        throw err;
      }
    }
  };

  // Return the state variables and the fetch function
  return {
    isSuccess,
    isLoading,
    isError,
    error,
    errors,
    handleData,
    fetchedData,
  };
};
