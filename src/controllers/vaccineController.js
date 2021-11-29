const Vaccine = require("../models/Vaccine")

const createVaccine = async (req, res) => {
    const { name, expected_date, vaccinated } = req.body
    try {
        const vaccine = await Vaccine.create({ 
            name, 
            expected_date, 
            vaccinated 
        });
        res.status(201).send(vaccine)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllVaccines = async (req, res) => {
    const vaccinated = req.query.vaccinated
    try {
        const where = vaccinated ? { where: { vaccinated } } : {}
        const vaccines = await Vaccine.findAll(where)
        if (vaccines && vaccines.length > 0) {
            res.status(200).send(vaccines)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getVaccine = async (req, res) => {
    const vaccineId = req.params.id
    try {
        const vaccine = await Vaccine.findOne({
            where: { id: vaccineId }
        });
        if (vaccine) {
            res.status(200).send(vaccine)
        } else {
            res.status(404).send({ message: `Vacina não encontrada com o id ${vaccineId}` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateVaccinated = async (req, res) => {
    const vaccineId = req.params.id
    const vaccinated = req.body.vaccinated
    try {
        const rowsUpdated = await Vaccine.update({ vaccinated }, { where: { id: vaccineId } });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} vacina com informação de tomada atualizada com sucesso` })
        } else {
            res.status(404).send({ message: `Vacina com ID ${vaccineId} não foi encontrada para atualizar informação` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createVaccine,
    getAllVaccines,
    getVaccine,
    updateVaccinated
}