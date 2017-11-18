/*
 * Contains all analyzing functions to be run
 * on each batch of messages while loading.
 * -> messages: json for array of message data
 */
function analyze(messages, group) {
  let messageObjects = messages.map(m => new Message(m));
  let stats = group.stats;
  stats.allMessages.push(messageObjects);
}

/*
 * Object to contain all stats for a group.
 */
class GroupStats {
  constructor() {
    this.allMessages = []
  }
}