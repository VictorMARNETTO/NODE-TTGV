// DB COLLECTION CALENDAR EVENTS
const adminLayout = 'adminMain'

module.exports = (req, res) => {
    res.render('admin/calendar/adminCalendar', {layout: adminLayout})
}