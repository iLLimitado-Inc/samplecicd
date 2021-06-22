import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  sampleEvents = []
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: this.sampleEvents, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    customButtons: {
      prev: {
      text: '<',
      click: this.getEventsByMonthBefore.bind(this)
      },
      next: {
      text: '>',
      click: this.getEventsByMonthAfter.bind(this, this)
      }
      },
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(INITIAL_EVENTS)
    // For external-events dragging
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor')
        };
      }
    });

  }
  
  ngAfterViewInit(){
    this.sampleEvents = INITIAL_EVENTS
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.addEventSource(this.sampleEvents)
  }

 

  getEventsByMonthBefore(e){
    console.log(e)
  }

  getEventsByMonthAfter(e, events: EventApi[]){
    debugger
    this.sampleEvents = [
      {
        id: createEventId(),
        start: '2021-04-25T09:00:00',
        end: '2021-04-25T17:00:00',
        title: 'Sample',
        description: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...',
        backgroundColor: 'rgba(1,104,250, .15)',
        borderColor: '#0168fa'
      }
    ];
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.addEventSource(this.sampleEvents)
    // const sel = calendarApi.view.calendar;
    // sel.addEvent(exampleEvents);

    //  let calendarApi = this.calendarComponent.getApi();
    // // console.log(calendarApi.view)
    // // calendarApi.addEvent(exampleEvents)
    // // console.log(exampleEvents)
    // calendarApi.refetchEvents()
    

    // alert("The current date of the calendar is " + calendarApi.view.activeStart);
    // alert("The current date of the calendar is " + calendarApi.view.activeEnd);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    console.log(this.currentEvents)
    this.currentEvents = events;
  }

}
