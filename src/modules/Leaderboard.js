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

    if (!scores.length) return;

    scores.forEach((s) => this.addScore(s));
  }

  display() {
    utils.qsa('li', leaderboardContainer).forEach((li) => li.remove());

    this.list.forEach((s) => {
      const li = utils.createElement({
        tagName: 'li',
        textContent: `${s.name}: ${s.score}`,
      });

      leaderboardContainer.appendChild(li);
    });
  }
}

export default new LeaderBoard();
