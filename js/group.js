class Group {
  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.imageUrl = json.image_url;
    this.creatorId = json.creator_user_id;
    this.dateCreated = json.created_at;
    this.lastUpdated = json.updated_at;
    this.messageCount = json.messages.count;
    this.memberCount = json.members.length;

    //Unformatted json for now
    this._members = json.members;

    this.stats = new GroupStats();
  }
}

function jsonToGroups(json) {
  var groups = [];
  json.response.forEach(function(groupData) {
    var group = new Group(groupData);
    groups.push(group);
  });
  return groups;
}