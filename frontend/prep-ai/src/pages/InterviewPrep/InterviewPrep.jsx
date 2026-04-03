import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuListCollapse, LuCircleAlert } from "react-icons/lu";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import axios from "axios";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import axiosInstance from "../../utils/axiosinstance";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.success) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      setExplanation(null);
      setOpenLearnMoreDrawer(true);

      const response = await axios.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate concept explanation");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axios.post(API_PATHS.TOGGLE_PIN(questionId));
      console.log(response);

      if (response.data && response.data.question) {
        // toast.success("question pinned successfully")
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Add more question to session
  const uploadMoreQuestion = async () => {
    try {
      setIsUpdateLoader(true);

      // Call AI API to generate question
      const aiResponse = await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        topicsToFocus: sessionData?.topicsToFocus,
        experience: sessionData?.experience,
        numberOfQuestions: 10,
      });

      //  Should be array like [{question, answer},..............]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      );

      if (response.data) {
        toast.success("Added More Q&A");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again later");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <div className="flex items-center justify-between pt-6 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Interview Q &amp; A</h2>
            <p className="text-sm text-slate-500 mt-0.5">{sessionData?.questions?.length || 0} questions in this session</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout // this is the key prp that animates changes
                    layoutId={`question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data.id)}
                      />

                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="mt-4">
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#F39845] to-[#e07c20] text-white hover:from-[#e07c20] hover:to-[#c96a14] transition-all duration-200 shadow-md shadow-orange-200/50 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestion}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="w-4 h-4" />
                              )}
                              {""}
                              Load more questions
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className=" flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" />
              {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
