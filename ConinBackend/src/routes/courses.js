const express = require('express')
const router = express.Router()

const pool = require('../database')
const {isLoggedIn} = require('../lib/auth')

router.get('/add',(req,res)=>{

    res.render('courses/add')


})

router.post('/add',isLoggedIn, async(req,res)=>{
    const {nombre_curso,decripcion,maestro,duracion} =req.body
    const newCourse = {
        nombre_curso,
        decripcion,
        maestro,
        duracion
    }


    await pool.query('INSERT INTO courses set ?',[newCourse])
    req.flash('success','Curso Añadido satisfactoriamente')
    res.redirect('/courses')

})

router.get('/',isLoggedIn, async (req,res)=>{
    const courses = await pool.query('SELECT * FROM courses')
    console.log(courses)
    res.render('courses/list',{ courses })


})

router.get('/delete/:id',isLoggedIn, async (req,res)=>{

    const {id} = req.params
   await pool.query('DELETE FROM courses WHERE id = ?', [id])

    req.flash('success','Curso eliminado satisfactoriamente')
   res.redirect('/courses')
})

router.get('/edit/:id',isLoggedIn, async (req,res)=>{
    const {id} = req.params
    const courses = await pool.query('SELECT * FROM courses WHERE id = ?', [id])

    res.render('courses/edit', {courses: courses[0]})
})

router.post('/edit/:id',isLoggedIn, async (req,res)=>{
    const {id} = req.params
    const {nombre_curso,decripcion,maestro,duracion} = req.body

    const newCourse ={
        nombre_curso,
        decripcion,
        maestro,
        duracion
    }
    await pool.query('UPDATE courses SET ? WHERE id = ?',[newCourse,id])

    req.flash('success','Curso actualizado satisfactoriamente')
    res.redirect('/courses')
})


module.exports = router