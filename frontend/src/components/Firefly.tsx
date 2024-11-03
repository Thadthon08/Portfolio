function Firefly() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className="firefly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 7}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Firefly;
