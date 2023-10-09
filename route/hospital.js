const express = require('express');

const hospitalRoutes = express.Router();

const fs= require('fs');

const dataPath = './Data/hospital.json'

const saveHospitalData = (data)=>{
    const stringifyData = JSON.stringify(data,null,2);
    fs.writeFileSync(dataPath,stringifyData)
}

const getHospitalData = ()=>{
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

hospitalRoutes.get('/',(req,res)=>{
    const hospital = getHospitalData();
    res.send(hospital);
})

hospitalRoutes.post('/add', (req, res) => {
try {
    let existHospital = getHospitalData();

    existHospital.push(req.body); 
    saveHospitalData(existHospital);
    res.send(existHospital);
} catch (error) {
    console.log(error);
} 
});

hospitalRoutes.put('/update', (req, res) => {
    try {
        let existHospital = getHospitalData();
        
        fs.readFile(dataPath, 'utf-8', (err, data) => {
            if (err) {
                console.log('Error reading data from the file:', err);
                return res.status(500).send('Error reading data from the file');
            }

            try {
                
                const existHospital = JSON.parse(data); 
                existHospital[0] = req.body;     
                saveHospitalData(existHospital);
                res.send(existHospital);
            } catch (error) {
                console.log('Error updating hospital data:', error);
                res.status(500).send('Error updating hospital data');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error handling PUT request');
    }
});

 hospitalRoutes.delete('/delete',(req,res)=>{
    try {
        
        fs.readFile(dataPath,'utf-8',(err,data)=>{
            if (err) {
                console.log('Error reading data from the file:', err);
                return res.status(500).send('Error reading data from the file');
            }
            try {
                var existHospital = getHospitalData();
                existHospital.splice(0, 1);
                saveHospitalData(existHospital)
                res.send(existHospital);
            } catch (error) {
                console.log('Error deleting hospital data:', error);
                res.status(500).send('Error deleting hospital data');
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error handling DELETE request'); 
    }
 
 })
  


module.exports = hospitalRoutes;
