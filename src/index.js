import './index.css';
import utils from './modules/utils.js';
import leaderboard from './modules/Leaderboard.js';

const refreshBtn = utils.qs('#refresh');
const submitBtn = utils.qs('#submit');
const nameError = utils.qs('.player_name-error');
const scoreError = utils.qs('.player_score-error');

const checkInputs = (user, score) => {
  if (!user.length) {
    nameError.textContent = 'Player name must be at least one alphanumerical character long';
    nameError.classList.remove('hidden');
    return false;
  }

  nameError.textContent = '';
  nameError.classList.add('hidden');

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

  scoreError.textContent = '';
  scoreError.classList.add('hidden');

  return true;
};

refreshBtn.addEventListener('click', () => {
  'something';
});

submitBtn.addEventListener('click', () => {
  const user = utils.qs('#player_name').value.trim();
  const score = parseInt(utils.qs('#player_score').value.trim(), 10);

  // Some checks before sending
  if (!checkInputs(user, score)) return;

  utils.qs('#player_name').value = '';
  utils.qs('#player_score').value = '';

  leaderboard.sendScore(user, score);
});

refreshBtn.addEventListener('click', () => {
  leaderboard.getScores();
});
