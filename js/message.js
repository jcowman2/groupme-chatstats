class Message {
  constructor(json) {
    this.id = json.id;
    this.dateCreated = json.created_at;
    this.userId = json.user_id;
    this.groupId = json.group_id;
    this.posterName = json.name;
    this.posterAvatar = json.avatar_url;
    this.text = json.text;
    this.system = json.system;

    this.favoritedBy = json.favorited_by;
    this.attachements = json.attachements;
  }
}