exports.allAccess = (req, res) => res.respond('Public Content.', 200);

exports.userBoard = (req, res) => res.respond('User Content.', 200);

exports.adminBoard = (req, res) => res.respond('Admin Content.', 200);

exports.moderatorBoard = (req, res) => res.respond('Moderator Content.', 200);
