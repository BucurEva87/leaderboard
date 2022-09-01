import './index.css';
import utils from './modules/utils.js';
import leaderboard from './modules/Leaderboard.js';

const refreshBtn = utils.qs('#refresh');
const submitBtn = utils.qs('#submit');
const nameError = utils.qs('.player_name-error');
const scoreError = utils.qs('.player_score-error');

const checkInputs = (name, score) => {
  if (!name.value.trim().length) {
    nameError.textContent = 'Player name must be at least one alphanumerical character long';
    nameError.classList.remove('hidden');
    return false;
  }

  score = parseInt(score.trim(), 10);

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
  const name = utils.qs('#player_name').value;
  const score = utils.qs('#player_score').value;

  // Some checks before sending
  if (!checkInputs()) return;

  nameError.textContent = '';
  nameError.classList.add('hidden');
  scoreError.textContent = '';
  scoreError.classList.add('hidden');

  leaderboard.addScore({
    name: name.trim(),
    score: +score,
  });
});
