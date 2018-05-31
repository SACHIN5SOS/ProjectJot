if(process.env.NODE_ENV === 'production'){
    module.exports={ mongoURI:
        'mongodb://sachin:sachin123@ds139920.mlab.com:39920/projectjot-prod'}
    
}
else{
    module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}
}