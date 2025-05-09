import { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

function App() {
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("feedbackStats");
    if (savedStats !== null) {
      return JSON.parse(savedStats);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const totalFeedback = stats.good + stats.neutral + stats.bad;
  const positiveFeedback = Math.round((stats.good / totalFeedback) * 100) || 0;

  function updateFeedback(stat) {
    setStats({ ...stats, [stat]: stats[stat] + 1 });
  }

  function resetFeedback() {
    setStats({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  useEffect(() => {
    localStorage.setItem("feedbackStats", JSON.stringify(stats));
  }, [stats]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          stats={stats}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
