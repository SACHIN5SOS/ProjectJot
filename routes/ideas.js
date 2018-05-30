const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Idea Model
require('../models/Ideas');
const Idea = mongoose.model('ideas');


//Index Idea Route
router.get('/',(req,res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas=>{
        res.render('ideas/index',{
            ideas: ideas
        });
    });
});


//Add route
router.get('/add', (req,res)=>{
    res.render('ideas/add');
});

//Edit Form 
router.get('/edit/:id',(req,res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('ideas/edit',{
            idea:idea
        });
    });
});

//Edit Form and set it in idea
router.put('/:id',(req,res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea =>{
        //new ideas
        idea.title = req.body.title;
        idea.details= req.body.details;
        idea.save()
        .then(idea=>{
            req.flash('success_msg', 'Project Idea updated');
            res.redirect('/ideas');
        });
    });
});

//Process Form
router.post('/',(req,res)=>{
    let errors = [];
    if(!req.body.title)
    {
        errors.push({text:'Please enter the Title'});
    }
    if(!req.body.details)
    {
        errors.push({text:'Please enter details about your project'});
    }
    if(errors.length > 0 )
    {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details 
        });
    }
    else
    {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }

        new Idea(newUser)
        .save()
        .then(idea => {
            req.flash('success_msg', 'New Idea added');
            res.redirect('/ideas');
        });  
    }
});

//Deltee Idea
router.delete('/:id', (req,res)=>{
    Idea.remove({
        _id: req.params.id
    })
    .then(()=>{
        req.flash('success_msg','Project Idea Removed');
        res.redirect('/ideas');
    })
});


module.exports = router;