import AbstractView from './abstract-view.js';

const reaction = {
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png',
};

const getEmoji = (comment) => {
  switch (comment.reaction) {
    case 'sleeping':
      return reaction.sleeping;
    case 'puke':
      return reaction.puke;
    case 'angry':
      return reaction.angry;
    default:
      return reaction.smile;

  }
};

const createComment = (comment) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${getEmoji(comment)} width="55" height="55" alt="emoji-${comment.reaction}">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.commentText}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;

export default class CommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createComment(this.#comment);
  }
}
