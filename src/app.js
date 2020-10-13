const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// const router = express.Router()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'แบบรายงานการให้คำปรึกษา - แก้ไขปัญหา นักศึกษา',
        name: 'Sukawat Dokkum',
        q1: { title: 'สถานะอยู่ในเกณฑ์',
              name: 'q1',
              datas: ['บานกลาง', 'อันตราย']},
        q2: { title: 'ครั้งที่ (ในการให้คำปรึกษา)', 
              name: 'q2',
              data: 'Your answer'},
        q3: { title: 'ช่องทางการติดต่อนักศึกษา',
              name: 'q3',
              datas: ['Walk in', 'Facebook', 'Line', 'โทรศัพท์']},
        q4: { title: 'ชื่อ - สกุล', 
              name: 'q4',
              data: 'Your answer'},
        q5: { title: 'รหัสนักศึกษา', 
              name: 'q5',
              data: 'Your answer'},
        q6: { title: 'เบอร์โทรผู้ปกครอง', 
              name: 'q6',
              data: 'Your answer'},
        q7: { title: 'ชื่อร้านสาขา', 
              name: 'q7',
              data: 'Your answer'},
        q8: { title: 'กลุ่มเรียน',
              name: 'q8',
              datas: ['A ทวิภาคี', 'A Walk in', 'B ทวิภาคี', 'B Walk in', 'AEC', 'พนักงาน']},
        q9: { title: 'ปัญหาที่พบ',
              name: 'q9',
              datas: ['ด้านการเรียน','ด้านการเงิน','ด้านทุจริต(วินัย:กระบวนการทำงานในร้าน)','ด้านทุจริต(วินัย:ทานหรือใช้สินค้าในร้าน)',
                      'ด้านทุจริต(วินัย:ทานสินค้าตัดจ่าย)','ด้านทุจริต(วินัย:ชู้สาว)','ด้านทุจริต(การเงิน:ขโมยเงินในร้าน/คูปอง/สแตมป์)',
                      'ด้านการฝึกงาน(FC/ผจก./ผช.)','ด้านการฝึกงาน(เพื่อนร่วมงาน)','ด้านการฝึกงาน(วินัยในการทำงาน เช่น ขาดงาน มาสาย)',
                      'ด้านการฝึกงาน(การเดินทาง)','ด้านการฝึกงาน(ไม่ชอบสายอาชีพนี้)','ด้านการฝึกงาน(บังคับซื้อสินค้าในร้าน/ทำยอด)',
                      'ด้านการฝึกงาน(เบี้ยเลี้ยง)','ด้านปัญหาส่วนตัว(ตั้งครรภ์)','ด้านปัญหาส่วนตัว(สุขภาพ)','ด้านปัญหาส่วนตัว(ย้ายสถานศึกษา)',
                      'ด้านปัญหาส่วนตัว(ครอบครัว)','ด้านปัญหาส่วนตัว(ไม่จบการศึกษาจากสถาบันเดิม)','ด้านปัญหาส่วนตัว(ความรัก)','ด้านอื่นๆ(กรุณาระบุสาเหตุในรายละเอียดการให้คำปรึกษา)']},
        q10: { title: 'รายละเอียดของปัญหา', 
                      name: 'q10',
                      data: 'Your answer'},
        q11: { title: 'การให้คำปรึกษาและแนวทางการแก้ไขปัญหา', 
                      name: 'q11',
                      data: 'Your answer'},
        q12: { title: 'วัน-เดือน-ปี ที่ให้คำปรึกษา', 
                      name: 'q12',
                      data: 'Your answer'},
        q13: { title: 'หลักฐานการให้คำปรึกษา', 
                      name: 'q13',
                      data: 'Your answer'},
        q14: { title: 'ผู้กรอกข้อมูลการให้คำปรึกษา',
                      name: 'q14',
                      datas: ['อาจารย์ที่ปรึกษา', 'ผู้จัดการฝ่าย', 'เจ้าหน้าที่อาวุโส', 'เจ้าหน้าที่ SC อาวุโส', 'เจ้าหน้าที่', 'พนักงาน','เจ้าหน้าที่ SC']},
        q15: { title: 'ลายเซ็นผู้ให้คำปรึกษา', 
                      name: 'q15',
                      data: 'Your answer'},
        q16: { title: 'สถานการให้คำปรึกษา',
                      name: 'q16',
                      datas: ['สิ้นสุดการให้คำปรึกษาเนื่องจากนักศึกษายืนยันลาออก', 'สิ้นสุดการให้คำปรึกณาเนื่องจากสถานการณ์ดีขึ้น(กลับมาเป็นปรกติ)', 'รอติดตามเพื่อให้คำปรึกษาในครั้งต่อไป']},
        q17: { title: 'E-Mail address',
                      name: 'q17',
                      data: 'Your answer'},
                             
            })
})

// router.post('/form', (req, res) => {
//     console.log('Post data form')
// })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/form', (req, res) => {
    // console.log(req)
    console.log(req.body)
    // console.log('Got body: ', req.body)
    res.sendStatus(200)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sukawat Dokkum'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sukawat Dokkum'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        const latitude = data.latitude
        const longitude = data.longitude
        const location = data.location

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sukawat Dokkum',
        errorMessage: 'Help article not found.'
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Sukawat Dokkum',
//         errorMessage: 'Page not found.'
//     })
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port + ' .')
})