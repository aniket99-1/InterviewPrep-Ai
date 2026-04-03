const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc Create a new session and linked question
// @route POST /api/sessions/create
// @access Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const UserId = req.user.id;

    const session = await Session.create({
      user: UserId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    let questionsArray = [];
    if (Array.isArray(questions)) {
      questionsArray = questions;
    } else if (questions && Array.isArray(questions.questions)) {
      questionsArray = questions.questions;
    } else if (questions && typeof questions === 'object') {
      questionsArray = Object.values(questions).find(val => Array.isArray(val)) || [];
    }

    const questionDocs = await Promise.all(
      questionsArray.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,

          answer: q.answer,
        });
        return question._id;
      }),
    );
    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Create session error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create session", error: error.message });
  }
};

// @desc Get all sessions for the logged in user
// @route GET /api/sessions/my-sessions
// @access Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get sessions" });
  }
};

// @desc Get a session by id with populated questions
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: 1, createdAt: -1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get session" });
  }
};

// @desc Delete a session
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    //check if the logged in user qwned the session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    // First, delete all questions associated with the session
    await Question.deleteMany({ session: session._id });

    // Then, delete the session
    await session.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete session" });
  }
};
