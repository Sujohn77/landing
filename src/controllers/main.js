const mainController = {};

mainController.mainPage = async (req, res) => {
    res.sendFile(__dirname + "/index.html");
};

module.exports = mainController;