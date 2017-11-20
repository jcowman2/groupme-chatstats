/* Contains all operations to be run before messages are loaded.
 * -> group: the selected group
 */
function analyzeStart(group) {
  group.stats = new GroupStats(); //Reset all stats
}

/*
 * Contains all analyzing functions to be run on each batch of messages while loading.
 * -> messages: json for array of message data
 * -> group: the selected group
 * => returns total number of messages retrieved
 */
function analyzeMid(messages, group) {
  let messageObjects = messages.map(m => new Message(m));
  let stats = group.stats;
  Array.prototype.push.apply(stats.allMessages, messageObjects);

  messageObjects.forEach(message => {
    stats.setUserName(message);
    stats.addMessageToUserMessageCount(message);
  });

  return stats.allMessages.length;
}

/*
 * Contains all operations to be run when all messages have loaded.
 * -> group: the selected group
 */
function analyzeEnd(group) {

}

/*
 * Object to contain all stats for a group.
 */
class GroupStats {
  constructor() {
    /* All messages sent in the chat */
    this.allMessages = []

    /* The most recent username of all who have posted in the chat. [userId:userNames] */
    this.userIdToName = new Map();

    /* The number of messages each user has posted. [userId:count] */
    this.messagesByUser = new Map();
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
}