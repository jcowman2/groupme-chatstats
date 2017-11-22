/* Contains all operations to be run before messages are loaded.
 * -> group: the selected group
 */
function analyzeStart(group) {
  group.stats = new GroupStats(); //Reset all stats
}

/*
 * Contains all operations to be run on each batch of messages while loading.
 * -> messages: json for array of message data
 * -> group: the selected group
 * => returns total number of messages retrieved
 */
function analyzeMid(messages, group) {
  let messageObjects = messages.map(m => new Message(m));
  let stats = group.stats;
  Array.prototype.push.apply(stats.allMessages, messageObjects);

  // messageObjects.forEach(message => {
  //   stats.setUserName(message);
  //   stats.addMessageToUserMessageCount(message);
  // });

  return stats.allMessages.length;
}

/*
 * Contains all operations to be run when all messages have loaded.
 * -> group: the selected group
 */
function analyzeEnd(group) {
  group.stats.allMessages.reverse();
  group.stats.groupMessagesByDay();
  group.stats.calcNumberMessagesByDay();
}

/*
 * Object to contain all stats for a group.
 */
class GroupStats {
  constructor() {
    /* All messages sent in the chat */
    this.allMessages = []

    // /* The most recent username of all who have posted in the chat. [userId:userNames] */
    // this.userIdToName = new Map();
    //
    // /* The number of messages each user has posted. [userId:count] */
    // this.messagesByUser = new Map();

    this.messagesByDay = new Map();               //The messages posted every day since the group's creation. [date:[messages]]
    this.numberMessagesByDay = new Map();         //Number of messages sent each day. [date:count]
    this.cumulativeMessagesOverTime = new Map();  //Number of messages sent over time. [date:count]
  }

  /*
   * Adds the userName in the map if it's not already present
   * -> message: the message object
   */
  setUserName(message) {
    this.userIdToName.setIfPresent(message.userId, i => i, () => message.posterName);
  }

  /*
   * Increments the messagesByUser map at the given userId's entry
   * -> message: the message object
   */
  addMessageToUserMessageCount(message) {
    this.messagesByUser.setIfPresent(message.userId, i => i+1, () => 1);
  }

  /*
   * Groups the messages that were sent on each day since the group's creation
   */
  groupMessagesByDay() {
    this.messagesByDay = this.allMessages.groupBy(message => {
      let date = message.dateCreated;
      return '{0}-{1}-{2}'.format(date.getMonth(), date.getDate(), date.getFullYear());
    });
  }

  /*
   * Calculates this.numberMessagesByDay and this.cumulativeMessagesOverTime
   * Note: this.messagesByDay must be calculated first.
   */
  calcNumberMessagesByDay() {
    let total = 0;
    for (let key of this.messagesByDay.keys()) {
      let len = this.messagesByDay.get(key).length;
      this.numberMessagesByDay.set(key, len);
      total += len;
      this.cumulativeMessagesOverTime.set(key, total);
    }
  }
}