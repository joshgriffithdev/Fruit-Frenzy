import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

export default function Leaderboard() {

  const [lbScores, setLbScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/data")
    .then((res) => {
        return res.json()
      })
      .then((data) => {
        setLbScores(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);



    return (
        <>
          <h1 id="title">LEADERBOARD</h1>
          <h1 id="retry">RETRY</h1>
            <ol className="lbList">
                {lbScores.map((score, index) => (
                    <li key={index}>
                        {score.name}: {score.highscore}
                    </li>
                ))}
            </ol>

          <link href="https://fonts.googleapis.com/css2?family=Convergence&family=Modak&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Modak&display=swap" rel="stylesheet"></link>

          <Link to={"/game"}>
            <button id="realButton">button</button>
          </Link>

          <img id="retryButton" src="yellowRectNormal.png" alt="button" />
          <img id="bg" src="Background.jpg" alt="background" width={2400} height={1000} />
        </>
    )
}