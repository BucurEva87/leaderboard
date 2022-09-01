import utils from './utils.js';
import Score from './Score.js';

const leaderboardContainer = utils.qs('#leaderboard');

class LeaderBoard {
  list = [];

  constructor(scores) {
    scores?.forEach((s) => this.addScore(s));
  }

  addScore(scores) {
    [...scores].forEach((s) => this.list.push(new Score(s.name, s.score)));
    this.display();
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
