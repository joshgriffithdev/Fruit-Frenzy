import './Home.css';
import { Link } from "react-router-dom";

function Home() {


    return (
        <>
            <h1 id="title">FRUIT FRENZY</h1>
            <p id="credits">Created by Josh Griffith</p>
            <h2 id="play">PLAY</h2>
            <h2 id="scores">SCORES</h2>

            <link href="https://fonts.googleapis.com/css2?family=Convergence&family=Modak&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Modak&display=swap" rel="stylesheet"></link>

            <div className='buttonContainer'>
                <Link to={"/game"}>
                    <button className="realButton">button</button>
                </Link>

                <Link to={"/leaderboard"}>
                    <button className="realButton">button2</button>
                </Link>
            </div>

            
            <img id="playButton" src="yellowRectNormal.png" alt="button" />
            <img id="leaderboardButton" src="yellowRectNormal.png" alt="button2" />
            <img id="bg" src="Background.jpg" alt="background" width={2400} height={1000} />
      

        </>
    )
}

export default Home;