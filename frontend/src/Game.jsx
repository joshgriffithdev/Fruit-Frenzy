import { useState, useEffect, useRef } from 'react';
import './App.css';
import eventListeners from './functions/eventListeners';
import { useNavigate } from 'react-router-dom';

export default function Game() {
    
    let [count, setCount] = useState(0);
    const [rightDown, setRightDown] = useState(false);
    const [leftDown, setLeftDown] = useState(false);
    let [lastRight, setLastRight] = useState(true);
    let pos = count.toString() + "rem";
    const [score, setScore] = useState(0);
    const [appleImage, setAppleImage] = useState([]);
    const [poisonApple, setPoisonApple] = useState([]);
    const playerRef = useRef(null);
    const imageRefs = useRef([]);
    const pImageRefs = useRef([]);
    const [gameOver, setGameOver] = useState(false);
    let [difficulty, setDifficulty] = useState(2000);
    const [highscores, setHighscores] = useState([]);
    const navigate = useNavigate();
  

    const fetchHighscores = async () => {
      try {
        const response = await fetch("http://localhost:5555/data");
        const data = await response.json();
        setHighscores(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch highscores:", error);
      }
    };
    

      useEffect(() => {
        fetchHighscores();
    }, []);
  
    const rightKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setRightDown(true);
      }
    };
  
    const rightKeyUp = (event) => {
      if (event.key === "ArrowRight") {
        setRightDown(false);
      }
    };
  
    const leftKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setLeftDown(true);
      }
    };
    
    const leftKeyUp = (event) => {
      if (event.key === "ArrowLeft") {
        setLeftDown(false);
      }
    };
  
  
    //Prevents player from going off right side of screen
    useEffect(() => {
      if (count > 119) {
        setRightDown(false);
        setCount(count = 119);
      }
    });
  
  
    //Player go right
    useEffect(() => {
      let rightIntervalTime;
      if (rightDown === true) {
        rightIntervalTime = setInterval(() => {
          setCount((count) => count + 1); // <-- Increases player padding(position)
          setLastRight(true);
        }, 18); // <-- Update screen in milliseconds
      }
      else {
        clearInterval(rightIntervalTime);
      }
    
      return () => clearInterval(rightIntervalTime);
    }, [rightDown]);
    
    
    
    
    //Player go left
    useEffect(() => {
      if (count < 0) {
        setCount(count = 0);
      }
      let leftIntervalTime;
      if (leftDown === true) {
        leftIntervalTime = setInterval(() => {
          setCount((count) => count - 1); // <-- Decreases player padding(position)
          setLastRight(false);
        }, 18); // <-- Update screen in milliseconds
      }
      else {
        clearInterval(leftIntervalTime);
      }
      
      return () => clearInterval(leftIntervalTime);
    }, [leftDown]);
  
  
    //All event listeners. @eventListeners.js
    useEffect(() => {
      eventListeners(rightKeyDown, rightKeyUp, leftKeyDown, leftKeyUp);
    },[]);
  
  
    //Apple generation
    useEffect(() => {
      const posInterval = setInterval(() => {
        const newPosition = { x: getRandomPosition(), y: 0 };
        setAppleImage(prevAppleImage => [...prevAppleImage, newPosition]);
      }, difficulty); // <-- Apple generation interval
  
      return () => clearInterval(posInterval);
    }, [difficulty]);

        //Poison apple generation
        useEffect(() => {
          const posInterval = setInterval(() => {
            const newPosition = { x: getRandomPosition(), y: 0 };
            setPoisonApple(prevPoisonApple => [...prevPoisonApple, newPosition]);
          }, 6550); // <-- Apple generation interval
      
          return () => clearInterval(posInterval);
        }, []);
      
  
  
    //Apple gravity
    useEffect(() => {
      const fallInterval = setInterval(() => {
        setAppleImage(prevAppleImage =>
          prevAppleImage.map((appleImage, index) => ({
            ...appleImage,
            y: appleImage.y + 2 // <-- Speed
          }))
        );
      }, 10); // <-- Apple update interval
  
      return () => clearInterval(fallInterval);
    }, []);

        //Poison Apple gravity
        useEffect(() => {
          const fallInterval = setInterval(() => {
            setPoisonApple(prevPoisonApple =>
              prevPoisonApple.map((poisonApple, index) => ({
                ...poisonApple,
                y: poisonApple.y + 2 // <-- Speed
              }))
            );
          }, 10); // <-- Apple update interval
      
          return () => clearInterval(fallInterval);
        }, []);
  
  
    //Get Coordinates of player and apple
    useEffect(() => {
  
      const getImageCoordinates = () => {
  
        let playerX = 0;
        let appleX = 0;
        let appleY = 0;

        let pAppleX = 0;
        let pAppleY = 0;
  
        if (playerRef.current) {
          const playerRect = playerRef.current.getBoundingClientRect();
          const playerXPosition = playerRect.left;
          playerX = playerXPosition;
        }
  
        imageRefs.current.forEach((appleRef, index) => {
          if (appleRef) {
  
            const appleRect = appleRef.getBoundingClientRect();
            const appleXPosition = appleRect.left;
            const appleYPosition = appleRect.top;
            appleX = appleXPosition;
            appleY = appleYPosition;
  
            //Deletes apple and adds 1 to score if collided with player
            if (playerX < (appleX + 70) && playerX > (appleX - 70)) {
              if (appleY > 650 && appleY < 749) {
                setScore((score) => score + 1);
                setAppleImage(prevAppleImage => prevAppleImage.filter((_, i) => i !== index));
              }
            }

  
            //Deletes apple if it hits the ground
            if (appleY >= 750) {
              setAppleImage(prevAppleImage => prevAppleImage.filter((_, i) => i !== index));
              setGameOver((gameOver) => gameOver = true);
            }
          }
        });

        //PA
        pImageRefs.current.forEach((pAppleRef, index) => {
          if (pAppleRef) {
  
            const pAppleRect = pAppleRef.getBoundingClientRect();
            const pAppleXPosition = pAppleRect.left;
            const pAppleYPosition = pAppleRect.top;
            pAppleX = pAppleXPosition;
            pAppleY = pAppleYPosition;
  
            //Deletes apple and adds 1 to score if collided with player
            if (playerX < (pAppleX + 70) && playerX > (pAppleX - 70)) {
              if (pAppleY > 650 && pAppleY < 749) {
                setGameOver((gameOver) => gameOver = true);
                setAppleImage(prevPoisonApple => prevPoisonApple.filter((_, i) => i !== index));
              }
            }
  
            //Deletes apple if it hits the ground
            if (pAppleY >= 750) {
              setPoisonApple(prevPoisonApple => prevPoisonApple.filter((_, i) => i !== index));
            }
          }
        });
        
      };
  
      getImageCoordinates();
    });
  
  
    //Get random position for apple generation
    const getRandomPosition = () => {
      const maxWidth = window.innerWidth - 100; 
      return Math.floor(Math.random() * maxWidth);
    };



// Check if the game has ended
useEffect(() => {
  if (gameOver) {
    let newName;
    let gotHighscore = false;
    for (let i = 0; i < highscores.length; i++) {
      if (score > highscores[i].highscore) {
        gotHighscore = true;
        break;
      }
    }
    if (gotHighscore) {
      newName = prompt("YOU GOT A HIGHSCORE! Enter your initals.");
      if (newName) {
        newName = newName.substring(0, 3);
      } else {
        newName = "AAA";
      }
      sendScore(score, newName);
    }
    navigate(`/leaderboard`);
  }
}, [gameOver, score, highscores, navigate]);


    //Increases difficulty
    useEffect(() => {
      if (score >= 3) {
        setDifficulty(prevDifficulty => prevDifficulty = 1300);
      }
    }, [score]);


    function sendScore(theScore, theName) {
      //make sure the url matches the server endpoint
      console.log(theScore);
      fetch("http://localhost:5555/data/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify
        ({ 
          score: theScore,
          name: theName
        })
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      });
    }

    //get players name and send it to backend
    function getName() {
      //Get current list of highscores and loop through them
      let newName = prompt("YOU GOT A HIGHSCORE! Enter your initals.");
      
      if (newName) {
        newName = newName.substring(0, 3);
      } 
      else {
        newName = "ABC";
      }
      

      const payload = { name: newName };

      // Send the name to the backend
      fetch("http://localhost:5555/updateHighscore", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
          console.log("Success:", data);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
    }



  
    return (
      <>
        {/* Player Animations */}
        <div className='imgContainer'>
          <div style={{paddingLeft: pos}} id='player'>
            {rightDown ? (
              <img ref={playerRef} src="PlayerRunningRight.gif" alt="sprite" width={130} height={150}/>
            ) : leftDown ? (
              <img ref={playerRef} src="PlayerRunningLeft.gif" alt="sprite" width={130} height={150}/>
            ) : (
              lastRight ? (
                <img ref={playerRef} src="PlayerIdleRight.png" alt="sprite" width={130} height={150}/>
              ) : (
                <img ref={playerRef} src="PlayerIdleLeft.png" alt="sprite" width={130} height={150}/>
              )
            )}
          </div>
  
          {appleImage.map((position, index) => (
            <div key={index} className="apple" style={{ position: 'absolute', left: position.x, top: position.y }}>
              <img ref={ref => imageRefs.current[index] = ref} src="Apple.png" alt="apple" width={100} height={100}/>
            </div>
          ))}

          {poisonApple.map((position, index) => (
            <div key={index} className="pApple" style={{ position: 'absolute', left: position.x, top: position.y }}>
              <img ref={ref => pImageRefs.current[index] = ref} src="PoisonApple.png" alt="pApple" width={100} height={100}/>
            </div>
          ))}
  
          <h1 id='score'>Score: {score}</h1>

          <img id="bg" src="Background.jpg" alt="background" width={2400} height={1000} />

          <link href="https://fonts.googleapis.com/css2?family=Convergence&family=Modak&display=swap" rel="stylesheet"></link>

        </div>
      </>
    );
};