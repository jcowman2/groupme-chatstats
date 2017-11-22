class Message {
  constructor(json) {
    this.id = json.id;
    this.dateCreated = new Date(json.created_at * 1000);
    this.userId = json.user_id;
    this.groupId = json.group_id;
    this.posterName = json.name;
    this.posterAvatar = json.avatar_url;
    this.text = json.text;
    this.system = json.system;

    this.favoritedBy = json.favorited_by;
    this.attachments = json.attachments;
  }
}