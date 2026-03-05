import React from 'react'

export const lojic = (cardValues) => {
   const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [locked, setLocked] = useState(false);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
  
    const shuffleArray = (array) => {
      const shuffled = [...array];
  
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
  
      return shuffled;
    };
  
    const initializeGame = () => {
  
      const shuffled = shuffleArray(cardValues);
  
      const finalCards = shuffled.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false,
      }));
  
      setCards(finalCards);
    };
  
    useEffect(() => {
      initializeGame();
    }, []);
  
    function handleClick(card) {
  
      if (card.isFlipped || card.isMatched || locked) {
        return;
      }
  
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
  
      setCards(updatedCards);
  
      const newFlipped = [...flippedCards, card.id];
      setFlippedCards(newFlipped);
  
      if (newFlipped.length === 2) {
  
        setLocked(true);
        setMoves(moves + 1);
  
        const firstCard = updatedCards[newFlipped[0]];
        const secondCard = updatedCards[newFlipped[1]];
  
        if (firstCard.value === secondCard.value) {
  
          setScore(score + 1);
  
          setTimeout(() => {
  
            const matchedCards = updatedCards.map((c) => {
              if (c.id === firstCard.id || c.id === secondCard.id) {
                return { ...c, isMatched: true };
              }
              return c;
            });
  
            setCards(matchedCards);
            setFlippedCards([]);
            setLocked(false);
  
          }, 800);
  
        } else {
  
          setTimeout(() => {
  
            const resetCards = updatedCards.map((c) => {
              if (c.id === firstCard.id || c.id === secondCard.id) {
                return { ...c, isFlipped: false };
              }
              return c;
            });
  
            setCards(resetCards);
            setFlippedCards([]);
            setLocked(false);
  
          }, 800);
        }
      }
    }
  
    const isGameComplete = score === cardValues.length / 2;
    return {
        cards,score,moves,isGameComplete,initializeGame,handleClick
    }
}
