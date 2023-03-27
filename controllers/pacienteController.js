import Paciente from "../models/pacienteModel.js"

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario)

    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    //Verificar que el que intenta eliminar el registro sea el que lo creo
    const {id} = req.params
    const paciente = await Paciente.findById(id)

    if(!paciente){
        return res.status(404).json({ message: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({message: "Accion no valida"})
    }
    
    res.json(paciente)
}
const actualizarPaciente = async (req, res) => {
    const {id} = req.params
    const paciente = await Paciente.findById(id)

    if(!paciente){
        return res.status(404).json({ message: "No encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({message: "Accion no valida"})
    }

    //Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre                  //Si no esta presente
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas
    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente = async (req, res) => {
    const {id} = req.params
    const paciente = await Paciente.findById(id)

    if(!paciente){
        return res.status(404).json({ message: "No encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({message: "Accion no valida"})
    }

    //Eliminar paciente
    try {
        await paciente.deleteOne()
        res.json({message: "Paciente eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}