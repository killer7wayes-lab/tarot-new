import React, { useState, useEffect } from 'react';
import './TarotApp.css';

const TarotApp = () => {
  const [theme, setTheme] = useState('classic');
  const [spread, setSpread] = useState('celtic');
  const [showMeditation, setShowMeditation] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeck, setShowDeck] = useState(false);

  // Complete Tarot Deck (78 cards)
  const tarotDeck = [
    // Major Arcana (22 cards)
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
    'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
    'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World',
    
    // Cups (14 cards)
    'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
    'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
    'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
    
    // Pentacles (14 cards)
    'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles',
    'Five of Pentacles', 'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles',
    'Nine of Pentacles', 'Ten of Pentacles', 'Page of Pentacles', 'Knight of Pentacles',
    'Queen of Pentacles', 'King of Pentacles',
    
    // Swords (14 cards)
    'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords',
    'Five of Swords', 'Six of Swords', 'Seven of Swords', 'Eight of Swords',
    'Nine of Swords', 'Ten of Swords', 'Page of Swords', 'Knight of Swords',
    'Queen of Swords', 'King of Swords',
    
    // Wands (14 cards)
    'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands',
    'Five of Wands', 'Six of Wands', 'Seven of Wands', 'Eight of Wands',
    'Nine of Wands', 'Ten of Wands', 'Page of Wands', 'Knight of Wands',
    'Queen of Wands', 'King of Wands'
  ];

  // Start reading function
  const startReading = () => {
    setShowMeditation(false);
  };

  // Generate interpretation function
  const generateInterpretation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/interpret/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cards: selectedCards,
          spread: spread,
          theme: theme
        })
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const data = await response.json();
      setInterpretation(data.interpretation || data.message);
    } catch (error) {
      console.error('Error:', error);
      setInterpretation('Error generating interpretation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Select a random card from the deck
  const selectRandomCard = () => {
    if (selectedCards.length < 10) {
      const availableCards = tarotDeck.filter(card => !selectedCards.includes(card));
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setSelectedCards([...selectedCards, randomCard]);
    }
  };

  // Select specific card (for when user chooses from full deck)
  const selectSpecificCard = (cardName) => {
    if (selectedCards.length < 10 && !selectedCards.includes(cardName)) {
      setSelectedCards([...selectedCards, cardName]);
      setShowDeck(false);
    }
  };

  // Reset reading
  const resetReading = () => {
    setSelectedCards([]);
    setInterpretation('');
    setShowMeditation(true);
    setShowDeck(false);
  };

  return (
    <div className={`tarot-app theme-${theme}`}>
      <div className="container">
        {/* Header */}
        <header>
          <h1>Tarot - Expert AI Reader</h1>
          <div className="theme-selector">
            <button 
              className={`theme-btn ${theme === 'classic' ? 'active' : ''}`}
              onClick={() => setTheme('classic')}
            >
              Classic
            </button>
            <button 
              className={`theme-btn ${theme === 'goth' ? 'active' : ''}`}
              onClick={() => setTheme('goth')}
            >
              Goth
            </button>
            <button 
              className={`theme-btn ${theme === 'anime' ? 'active' : ''}`}
              onClick={() => setTheme('anime')}
            >
              Anime
            </button>
          </div>
        </header>

        {/* Meditation Section */}
        {showMeditation && (
          <section className="meditation-section">
            <div className="meditation-container">
              <h2>Prepare for Your Reading</h2>
              <div className="meditation-content">
                <div className="breathing-animation">
                  <div className="breath-circle"></div>
                  <p>Breathe in... Breathe out...</p>
                </div>
                <div className="meditation-instructions">
                  <h3>Close your eyes</h3>
                  <p>Take three deep breaths and focus on your question</p>
                  <p>When you're ready, open your eyes and choose your cards</p>
                </div>
                <button className="begin-reading-btn" onClick={startReading}>
                  I'm Ready - Show Me the Cards
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        {!showMeditation && (
          <main>
            {/* Spread Selection */}
            <div className="spread-selection">
              <h2>Choose Your Spread</h2>
              <select value={spread} onChange={(e) => setSpread(e.target.value)}>
                <option value="celtic">Celtic Cross</option>
                <option value="three">Three Card Spread</option>
                <option value="single">Single Card</option>
              </select>
            </div>

            {/* Celtic Cross Spread */}
            {spread === 'celtic' && (
              <div className="celtic-cross-container">
                <h2>Celtic Cross Spread</h2>
                <div className="celtic-cross-layout">
                  {/* Center Cross */}
                  <div className="cross-center">
                    <div className="card-position position-1">
                      {selectedCards[0] || '1. Present'}
                    </div>
                    <div className="card-position position-2">
                      {selectedCards[1] || '2. Challenge'}
                    </div>
                    <div className="card-position position-3">
                      {selectedCards[2] || '3. Foundation'}
                    </div>
                    <div className="card-position position-4">
                      {selectedCards[3] || '4. Past'}
                    </div>
                    <div className="card-position position-5">
                      {selectedCards[4] || '5. Crown'}
                    </div>
                    <div className="card-position position-6">
                      {selectedCards[5] || '6. Future'}
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="cross-right">
                    <div className="card-position position-7">
                      {selectedCards[6] || '7. Self'}
                    </div>
                    <div className="card-position position-8">
                      {selectedCards[7] || '8. Environment'}
                    </div>
                    <div className="card-position position-9">
                      {selectedCards[8] || '9. Hopes/Fears'}
                    </div>
                    <div className="card-position position-10">
                      {selectedCards[9] || '10. Outcome'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card Selection Area */}
            <div className="card-selection">
              <h2>Select Your Cards ({selectedCards.length}/10)</h2>
              
              <div className="card-buttons">
                <button className="card-action-btn" onClick={selectRandomCard}>
                  Draw Random Card
                </button>
                <button className="card-action-btn" onClick={() => setShowDeck(!showDeck)}>
                  {showDeck ? 'Hide Full Deck' : 'Choose from Full Deck'}
                </button>
              </div>

              {/* Full Deck Display */}
              {showDeck && (
                <div className="full-deck">
                  <h3>Select a Card from the Full Deck</h3>
                  <div className="deck-grid">
                    {tarotDeck.map((card, index) => (
                      <div
                        key={index}
                        className={`deck-card ${selectedCards.includes(card) ? 'selected' : ''}`}
                        onClick={() => selectSpecificCard(card)}
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interpretation Section */}
            <div className="interpretation-section">
              <button 
                className="interpret-btn" 
                onClick={generateInterpretation}
                disabled={loading || selectedCards.length === 0}
              >
                {loading ? 'Generating...' : 'Get Interpretation'}
              </button>
              
              {interpretation && (
                <div className="interpretation-result">
                  <h3>Your Reading</h3>
                  <p>{interpretation}</p>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <button className="reset-btn" onClick={resetReading}>
              Start New Reading
            </button>
          </main>
        )}
      </div>
    </div>
  );
};

export default TarotApp;
