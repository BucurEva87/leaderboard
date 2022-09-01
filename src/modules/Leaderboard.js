import utils from './utils.js';
import Score from './Score.js';

const leaderboardContainer = utils.qs('#leaderboard');

class LeaderBoard {
  list = [];

  gameID = 'Y5moUnjSSbKIPcm9jZXj';

  constructor() {
    this.getScores();
  }

  addScore(scores) {
    [...scores].forEach((s) => this.list.push(new Score(s.name, s.score)));
    this.display();
  }

  async getScores() {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameID}/scores`,
    );
    const scores = await response.json();

    this.addScore(scores.result);
  }

  display() {
    if (!this.list.length) {
      utils.qs('li', leaderboardContainer).textContent = 'No scores available at this moment';
      return;
    }

    utils.qsa('li', leaderboardContainer).forEach((li) => li.remove());

    this.list.forEach((s) => {
      const li = utils.createElement({
        tagName: 'li',
        textContent: `${s.name}: ${s.score}`,
      });

      leaderboardContainer.appendChild(li);
    });
  }

  async sendScore(name, score) {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameID}/scores`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      },
    );
    const result = await response.json();

    if (result.result !== 'Leaderboard score created correctly.') return;

    this.addScore({ name, score });
  }
}

export default new LeaderBoard();
