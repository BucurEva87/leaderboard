import './index.css';
import utils from './modules/utils.js';
import leaderboard from './modules/Leaderboard.js';

const refreshBtn = utils.qs('#refresh');
const submitBtn = utils.qs('#submit');
const nameError = utils.qs('.player_name-error');
const scoreError = utils.qs('.player_score-error');

const checkInputs = (name, score) => {
  if (!name.length) {
    nameError.textContent = 'Player name must be at least one alphanumerical character long';
    nameError.classList.remove('hidden');
    return false;
  }
  if (Number.isNaN(score)) {
    scoreError.textContent = 'Player score must be a number';
    scoreError.classList.remove('hidden');
    return false;
  }
  if (score < 0) {
    scoreError.textContent = 'Player score must be zero or greater';
    scoreError.classList.remove('hidden');
    return false;
  }

  return true;
};

refreshBtn.addEventListener('click', () => {
  'something';
});

submitBtn.addEventListener('click', () => {
  const name = utils.qs('#player_name').value.trim();
  const score = parseInt(utils.qs('#player_score').value.trim(), 10);

  // Some checks before sending
  if (!checkInputs(name, score)) return;

  nameError.textContent = '';
  nameError.classList.add('hidden');
  scoreError.textContent = '';
  scoreError.classList.add('hidden');

  leaderboard.addScore({ name, score });
});

refreshBtn.addEventListener('click', () => {
  leaderboard.getScores();
});
