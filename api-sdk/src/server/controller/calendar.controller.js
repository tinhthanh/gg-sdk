
export default class CalendarController {
  setColorCalendar(calendarName = '', color = '') {
    const calendar = this.getCalendar(calendarName);
    calendar.setColor(color);
  }
  createEventCustom(calendarName = '', data = {
    title: '',
    start: new Date(),
    end: new Date(),
    colorId: '',
    options: {
      description: '',
      location: ''
    }
    }) {
       const calendar = this.getCalendar(calendarName);
    const rs =  calendar.createEvent( data.title, new Date(data.start), new Date(data.end),
        data.options);
      if(data.colorId) {
           rs.setColor(data.colorId);
      }
    }
  // neu khong tim thay thi tao moi
  // return calendar
  getCalendar(calendarName = '') {
   const list = CalendarApp.getCalendarsByName(calendarName);
   if (list.length > 0) {
     return list[0];
   } else {
     const newCalendar = CalendarApp.createCalendar(calendarName);
     return newCalendar;
   }
  }
  getRangeEvents(calendarName = '', data = {
        startTime : "",
        endTime :  "",
        }) {
          const calendar =  this.getCalendar(calendarName);
         return calendar.getEvents(new Date(data.startTime) , new Date(data.endTime))
            .map( it => {
              return {
                id:  it.getId(),
                title: it.getTitle(),
                start: it.getStartTime(),
                end: it.getEndTime(),
                colorId: it.getColor(),
                location: it.getLocation(),
                description: it.getDescription(),
                originalCalendarId: it.getOriginalCalendarId(),
                lastUpdated: it.getLastUpdated(),
                createdAt: it.getDateCreated()
              }
            });
        }
}
