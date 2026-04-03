export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/auth/login", //Login
    REGISTER: "/api/auth/register", //SignUP
    GET_PROFILE: "/api/auth/profile", //Get Profile
  },
  IMAGE: {
    UPLOAD: "/api/auth/upload-image", //Upload Image
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", //Generate Questions
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", //Generate Explanation
    REVIEW_RESUME: "/api/ai/review-resume", //Review Resume
  },
  SESSION: {
    CREATE: "/api/session/create", //Create Session
    GET_ALL: "/api/session/my-sessions", //Get All Sessions
    GET_ONE: (id) => `/api/session/${id}`, //Get session details with questions
    DELETE: (id) => `/api/session/${id}`, //Delete Session
  },
  QUESTIONS: {
    ADD_TO_SESSION: "/api/questions/add", //Add question to session
    PIN: (id) => `/api/questions/${id}/pin`, //Pin or Unpin question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, //Update note
  },
};
