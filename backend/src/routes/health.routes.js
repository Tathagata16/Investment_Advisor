const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        success: true,
        backend: "Running",
        database: "Connected"
    });

});

module.exports = router;