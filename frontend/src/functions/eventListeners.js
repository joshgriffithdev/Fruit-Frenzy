export default function eventListeners(rkd, rku, lkd, lku) {
    
    //Add right key event listeners
    window.addEventListener("keydown", rkd);
    window.addEventListener("keyup", rku);
        
    //Add left key event listeners
    window.addEventListener("keydown", lkd);
    window.addEventListener("keyup", lku);
    
    return () => {
    
    //Remove right key event listeners
    window.removeEventListener("keydown", rkd);
    window.removeEventListener("keyup", rku);
      
    //Remove left key event listeners
    window.removeEventListener("keydown", lkd);
    window.removeEventListener("keyup", lku);
      
    };
}
