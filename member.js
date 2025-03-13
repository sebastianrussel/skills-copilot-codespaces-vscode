function skillsMember() {
  var member = Member.findOne({userId: Meteor.userId()});
  if (member) {
    if (member.skills) {
      return member.skills;
    }
  }
  return [];
}