const express = require("express")
const router = express.Router()
const controller = require("../controllers/vaccineController")

router.post("/", controller.createVaccine)
router.get("/", controller.getAllVaccines)
router.get("/:id", controller.getVaccine)
router.patch("/:id/vaccinated", controller.updateVaccinated)

module.exports = router;