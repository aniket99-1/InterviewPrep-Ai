import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import SummaryCard from "../../components/Cards/SummaryCard";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteALert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const data = response.data;
      setSessions(Array.isArray(data) ? data : (data?.sessions || []));
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSessions = async (sessionData) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionData._id),
      );
      if (response.data) {
        toast.success("Session deleted successfully");
        fetchAllSessions();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <DashboardLayout>
      <div className="pt-6 pb-20">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Sessions</h1>
            <p className="text-sm text-slate-500 mt-1">{sessions.length} interview session{sessions.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>

        {sessions.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F39845]/20 to-[#F39845]/5 flex items-center justify-center mb-5 shadow-sm">
              <svg className="w-9 h-9 text-[#F39845]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No sessions yet</h2>
            <p className="text-slate-500 text-sm max-w-xs mb-7">Create your first AI-powered interview session and start practising today.</p>
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F39845] to-[#e07c20] hover:from-[#e07c20] hover:to-[#c96a14] transition-all duration-200 shadow-md shadow-orange-200/60 hover:shadow-lg hover:-translate-y-0.5"
              onClick={() => setOpenCreateModal(true)}
            >
              + Create your first session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sessions?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || "-"}
                lastUpdated={data?.updatedAt ? moment(data?.updatedAt).format("Do MMM YYYY") : ""}
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteALert({ open: true, data })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 h-14 flex items-center gap-2.5 bg-gradient-to-r from-[#F39845] to-[#e07c20] text-white text-sm font-semibold px-6 rounded-full shadow-xl shadow-orange-300/50 hover:shadow-2xl hover:shadow-orange-400/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-pulse-ring"
        onClick={() => setOpenCreateModal(true)}
      >
        <LuPlus className="text-xl" />
        New Session
      </button>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteALert({ open: false, data: null })}
        title="Delete Session"
      >
        <div className="">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSessions(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteALert({ open: false, data: null })}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
