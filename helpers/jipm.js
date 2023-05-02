const Jimp = require("jimp")

(async function () {
    // const {size} = req.file;
    const imageUser = await Jimp.read("./public/avatars/user_-_644ade39d83018d00be685c4_43071f00b102ac2926e83038bfb8aeac.jpg");
    imageUser.resize(250, 250);
    imageUser.write('"./public/avatars/user_-_644ade39d83018d00be685c4_avatar-250-250.jpg"');     

  })();