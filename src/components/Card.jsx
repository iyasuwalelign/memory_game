const Card = ({ card, onClick }) => {
  return (
    <div className={`card ${card.isFlipped ? "flipped" : ""}`}>
      <div className="card-front" onClick={() => onClick(card)}>?</div>
      <div className="card-back">{card.value}</div>
    </div>
  );
}

export default Card;